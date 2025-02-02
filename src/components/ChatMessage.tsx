import { motion } from "framer-motion"
import type { Message } from "ai"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] p-4 rounded-2xl ${
          isUser ? "bg-indigo-600 text-white" : "bg-white bg-opacity-50 backdrop-blur-md"
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </motion.div>
  )
}

