import { useState, useEffect } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// Your API key (replace with your actual OpenAI API key)
const API_KEY = "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";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello there! Ask me anything!",
      sender: "ChatGPT",
    },
  ]);

  // Expose handleSend to the global window object for testing in console
  useEffect(() => {
    window.handleSend = handleSend;
  }, []);

  // Helper function to introduce a delay for retries
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to handle sending a message
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing", // Indicates user's message
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    setTyping(true);

    await processMessageToChatGPT(updatedMessages);
  };

  // Function to process the message and communicate with OpenAI API
  const processMessageToChatGPT = async (chatMessages, retries = 5, backoffFactor = 2) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts of ReactJS.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    let delayTime = 1000; // Start with a 1-second delay

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        });

        console.log("API Response Status:", response.status);
        const data = await response.json();
        console.log("API Response Data:", data);

        // Handle rate limiting (429 error)
        if (response.status === 429) {
          console.warn("Rate limit hit. Retrying...");
          await delay(delayTime); // Wait before retrying
          delayTime *= backoffFactor; // Exponentially increase delay time
          continue;
        }

        // Handle successful response
        if (data.choices && data.choices.length > 0) {
          const botMessage = {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          break;
        } else {
          throw new Error("Invalid response from OpenAI API");
        }
      } catch (error) {
        console.error("Error communicating with OpenAI API:", error);

        if (attempt === retries - 1) {
          const errorMessage = {
            message: "Oops! Something went wrong. Please try again later.",
            sender: "ChatGPT",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } finally {
        setTyping(false);
      }
    }
  };

  return (
    <div className="App">
      <div style={{ position: "relative", height: "500px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="SundarGPT is typing..." /> : null}
            >
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    message: message.message,
                    sentTime: "just now",
                    sender: message.sender,
                  }}
                />
              ))}
            </MessageList>
            <MessageInput placeholder="Type any message..." onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
