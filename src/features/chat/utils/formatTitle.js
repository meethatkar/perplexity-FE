/**
 * Formats and sanitizes AI-generated titles by stripping raw markdown asterisks,
 * quotation marks, prefixes, and hashtags.
 * Example: '**"Perplexity Project: First Thread"**' -> 'Perplexity Project: First Thread'
 */
export const formatChatTitle = (title) => {
  if (!title || typeof title !== "string") return "New Conversation";
  const cleaned = title
    .replace(/^Title:\s*/i, "")
    .replace(/^[\s#*_"“'«`]+|[\s*_"”'»`]+$/g, "")
    .replace(/[*_#`]/g, "")
    .trim();

  return cleaned || "New Conversation";
};
