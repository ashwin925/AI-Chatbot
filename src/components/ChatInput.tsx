import type { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import React from "react"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ChatInput({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-end">
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-l-lg bg-white bg-opacity-50 backdrop-blur-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={1}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        Send
      </motion.button>
    </form>
  )
}

