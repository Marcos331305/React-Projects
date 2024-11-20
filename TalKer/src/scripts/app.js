import { createTheme } from "@mui/material/styles";

// Mui Theme
const theme = createTheme({
  palette: {
    background: {
      default: "#212121", // Sets background color for the entire app
    },
    primary: {
      main: "#B4B4B4", // Customize your primary color
    },
    secondary: {
      main: "#2F2F2F", // Customize your secondary color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Set the font for the entire app
    h6: {
      fontWeight: 600, // Customize specific variant like your navbar title
    },
    // Customize more typography variants if needed
  },
});

export default theme;

// function for generating uniqueId's
export function generateUniqueId() {
  const timestamp = Date.now(); // Current timestamp
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Random integer between 1000 and 9999
  const stringId = `${timestamp}${randomSuffix}`; // Combine timestamp and random number
  return Number(stringId);
}

// function for arranging the fetchedMessage in the desired manner
export function arrangeFetchedMessages(messages) {
 // First, sort the messages by the `created_at` timestamp
 const sortedByTimestamp = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

 // Then, reorder the messages to alternate between user and TalKer
 let sortedBySender = [];
 let userMessages = sortedByTimestamp.filter(msg => msg.sender === 'user');
 let talkerMessages = sortedByTimestamp.filter(msg => msg.sender === 'TalKer');

 // Interleave the user and TalKer messages while keeping the order
 while (userMessages.length > 0 || talkerMessages.length > 0) {
   if (userMessages.length > 0) {
     sortedBySender.push(userMessages.shift()); // Add a user message
   }
   if (talkerMessages.length > 0) {
     sortedBySender.push(talkerMessages.shift()); // Add a TalKer message
   }
 }

 return sortedBySender;
}

// function for parsingCodeandText seperately
export const parseTalKerResponse = (message) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g; // Regex to match code blocks
  const content = []; // Array to hold both text and code
  let lastIndex = 0; // Tracks the end of the last match
  let match;

  while ((match = codeBlockRegex.exec(message)) !== null) {
    // Push text between code blocks
    if (lastIndex < match.index) {
      const text = message.slice(lastIndex, match.index).trim();
      if (text) {
        content.push({ type: 'text', value: text });
      }
    }

    // Push the code block
    content.push({
      type: 'code',
      language: match[1] || "plaintext", // Extract language, default to plaintext
      value: match[2], // Extract code
    });

    lastIndex = codeBlockRegex.lastIndex; // Update lastIndex
  }

  // Add any remaining text after the last code block
  if (lastIndex < message.length) {
    const remainingText = message.slice(lastIndex).trim();
    if (remainingText) {
      content.push({ type: 'text', value: remainingText });
    }
  }
  return content;
};
