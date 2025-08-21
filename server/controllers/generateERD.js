const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require("../database/db");
const erdModel = require("../models/erdModel");

// Initialize with API key
const genAI = new GoogleGenerativeAI("AIzaSyBKHgoOpRV6-L8bfLwiwWfE_hHN21b8CGs");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Convert structured JSON into Mermaid ER diagram code.
 * Handles entities, attributes, and relations.
 * Cleans PK/FK markers and normalizes SQL datatypes.
 */
function jsonToMermaid(jsonData) {
  let mermaid = "erDiagram\n";

  try {
    // ----------- ENTITIES -----------
    if (jsonData.entities && typeof jsonData.entities === "object") {
      for (const [entityName, attributes] of Object.entries(
        jsonData.entities
      )) {
        if (!entityName || typeof attributes !== "object") continue;

        mermaid += `  ${sanitizeName(entityName)} {\n`;

        for (const [attr, type] of Object.entries(attributes)) {
          // ✅ Use formatAttribute here to handle PK/FK properly
          const line = formatAttribute(attr, type);
          if (line) mermaid += `    ${line}\n`;
        }

        mermaid += "  }\n\n";
      }
    }

    // ----------- RELATIONS -----------
    if (jsonData.relations && Array.isArray(jsonData.relations)) {
      for (const rel of jsonData.relations) {
        if (!rel.from || !rel.to || !rel.type) continue;

        let relationType = mapRelation(rel.type);
        mermaid += `  ${sanitizeName(rel.from)} ${relationType} ${sanitizeName(
          rel.to
        )} : "${rel.label || rel.type}"\n`;
      }
    }
  } catch (err) {
    console.error("Error in jsonToMermaid:", err);
    return "erDiagram\n  Error { string message }\n";
  }

  // ✅ Final cleanup in case any (PK)/(FK) or VARCHAR(255) slipped through
  return fixMermaidCode(mermaid.trim());
}

/**
 * Normalize SQL types into Mermaid-friendly types.
 * Example: VARCHAR(255) → string, DECIMAL → float, INT → int
 */
function sanitizeType(sqlType = "string") {
  const type = sqlType.toUpperCase();
  if (type.includes("INT")) return "int";
  if (type.includes("CHAR") || type.includes("TEXT")) return "string";
  if (type.includes("DATE") || type.includes("TIME")) return "date";
  if (
    type.includes("DECIMAL") ||
    type.includes("NUMERIC") ||
    type.includes("FLOAT") ||
    type.includes("DOUBLE")
  )
    return "float";
  return "string"; // default fallback
}

/**
 * Format a single attribute line for Mermaid.
 * Detects PK/FK and appends them correctly.
 */
function formatAttribute(rawName = "", rawType = "string") {
  if (!rawName.trim()) return "";

  // Detect PK/FK in either name or type
  const isPK = /\bPK\b/i.test(rawType) || /\bPK\b/i.test(rawName);
  const isFK = /\bFK\b/i.test(rawType) || /\bFK\b/i.test(rawName);

  // Clean column name
  const cleanName = rawName.replace(/\(.*?\)/g, "").trim();

  // Clean SQL type (remove PK/FK markers + length)
  let cleanType = rawType
    .replace(/\(.*?\)/g, "") // remove (PK), (FK), (255), etc.
    .trim()
    .toUpperCase();

  cleanType = sanitizeType(cleanType);

  // Build final line
  let line = `${cleanType} ${cleanName}`;
  if (isPK) line += " PK";
  if (isFK) line += " FK";

  return line;
}

/**
 * Final fixer for Mermaid syntax (safety net).
 * Converts `INT (PK) user_id` → `INT user_id PK`
 * Converts `VARCHAR(255) username` → `VARCHAR username`
 */
function fixMermaidCode(code) {
  let out = code;

  // Fix misplaced (PK)/(FK)
  out = out.replace(
    /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(\s*(PK|FK|UK)\s*\)\s+([A-Za-z_][A-Za-z0-9_]*)\s*$/gm,
    (m, typ, key, name) => `${typ.toUpperCase()} ${name} ${key.toUpperCase()}`
  );

  // Fix VARCHAR(255) → VARCHAR
  out = out.replace(
    /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(\s*[\d,\s]+\s*\)\s+([A-Za-z_][A-Za-z0-9_]*)\s*$/gm,
    (m, typ, name) => `${typ.toUpperCase()} ${name}`
  );

  return out;
}

/**
 * Utility to sanitize names so Mermaid accepts them.
 * Removes spaces/special characters → keeps only alphanum + underscore.
 */
function sanitizeName(name) {
  if (!name) return "";
  return name.replace(/[^a-zA-Z0-9_]/g, "_");
}

/**
 * Maps human-readable relation types into Mermaid syntax.
 */
function mapRelation(type) {
  switch (type.toLowerCase()) {
    case "one-to-many":
      return "||--o{";
    case "many-to-one":
      return "}o--||";
    case "many-to-many":
      return "}o--o{";
    case "one-to-one":
      return "||--||";
    default:
      return "||--||"; // safe fallback
  }
}

/**
 * Express Controller: Generate ERD from user prompt.
 * - Calls Gemini to generate structured JSON
 * - Converts JSON → Mermaid code
 * - Saves result in MongoDB
 */
exports.generateERD = async (req, res) => {
  try {
    await connectDB();
    const { originalUserPrompt } = req.body;

    const prompt = `You are a system architect. A user wants the following system: "${originalUserPrompt}".
Generate only valid JSON (no markdown, no explanations, no extra text).
The JSON must strictly follow this structure:

{
  "entities": {
    "ENTITY_NAME": {
      "attribute_name": "datatype (and PK/FK if applicable)"
    }
  },
  "relations": [
    { "from": "ENTITY_A", "to": "ENTITY_B", "type": "one-to-many | many-to-one | many-to-many | one-to-one" }
  ]
}

Rules:
- Always wrap the output in a single JSON object only.
- Do not include Mermaid code, markdown formatting, or natural language.
- Ensure primary keys are marked as "PK", foreign keys as "FK".`;

    // 🔹 Ask Gemini for JSON
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let cleanedText = responseText
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    if (cleanedText.toLowerCase() === "false") {
      return res.status(400).json({
        error:
          "Your input appears unrelated to system design. Kindly provide a valid prompt describing software requirements to continue...",
      });
    }

    // 🔹 Parse JSON
    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch {
      return res.status(400).json({
        error:
          "AI returned invalid JSON. Please try again with a clearer prompt.",
      });
    }

    // 🔹 Convert JSON → Mermaid
    let mermaidCode;
    try {
      mermaidCode = jsonToMermaid(jsonData);
    } catch (e) {
      console.error("❌ Error converting JSON to Mermaid:", e.message);
      return res
        .status(500)
        .json({ error: "Failed to convert ERD to Mermaid" });
    }

    // 🔹 Save to DB
    const saved = await erdModel.create({
      designName: jsonData.name || "Untitled System",
      mermaidCode: mermaidCode,
      userId: req.user._id, // ✅ FIXED
    });

    res.json({ raw: mermaidCode });
  } catch (error) {
    console.error("❌ Error generating ERD:", error.message);
    res.status(500).json({ error: "Failed to generate ERD" });
  }
};
