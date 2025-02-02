import { useState } from "react"
import { motion } from "framer-motion"
import { useChat } from "ai/react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import Suggestions from "./Suggestions"
import React from "react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [suggestions] = useState(["Tell me a joke", "What's the weather like?", "How does AI work?"])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl h-[80vh] bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="p-4 bg-white bg-opacity-30 backdrop-blur-md">
      <Suggestions suggestions={suggestions} onSelect={(suggestion) => handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>)} />
        <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      </div>
    </motion.div>
  )
}

