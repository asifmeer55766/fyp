// utils/formatDescription.js

/**
 * Formats a description string by converting bolded text (e.g., **Heading**)
 * into HTML bold tags and placing them on a new line.
 *
 * @param {string} rawString The raw string from the AI response.
 * @returns {string} The formatted HTML string.
 */
export const formatDescription = (rawString) => {
  if (!rawString) return "";

  // Use a regular expression to find text wrapped in double asterisks
  // g = global search, find all matches
  // i = case-insensitive
  const formattedString = rawString.replace(
    /\*\*(.*?)\*\*/g,
    (match, content) => {
      // Return a line break first, then the bolded HTML tag
      return `<br /><strong>${content}</strong>`;
    }
  );

  return formattedString;
};
