// controllers/pdfController.js

const puppeteer = require("puppeteer");

/**
 * Generates a PDF of the latest system design diagram.
 * This is a server-side process using Puppeteer.
 */
exports.generatePdf = async (req, res) => {
  let browser; // Declare browser variable in a scope accessible to the finally block
  try {
    // 1. Launch a headless browser with Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Recommended for production environments
    });
    const page = await browser.newPage();

    // Set a larger viewport to prevent scaling issues with large diagrams
    await page.setViewport({ width: 1920, height: 1080 });

    // 2. Navigate to the URL of the page you want to print
    // IMPORTANT: Replace this placeholder URL with the actual URL of your page.
    const pageToPrintUrl = "http://localhost:5173/system-docs";

    // Navigate to the URL and wait for the page to be fully loaded
    await page.goto(pageToPrintUrl, {
      waitUntil: "networkidle0", // Waits until all network connections are idle
    });

    // 3. Generate the PDF from the rendered page
    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
    });

    // 4. Send the PDF file back to the client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=system_design.pdf"
    );
    res.send(pdf);
  } catch (error) {
    console.error("❌ Error generating PDF on the server:", error.message);
    res.status(500).json({ error: "Failed to generate PDF." });
  } finally {
    // 5. Close the browser instance to free up resources
    if (browser) {
      await browser.close();
    }
  }
};
