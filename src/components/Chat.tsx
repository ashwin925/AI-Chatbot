import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useChat } from "ai/react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import ScrollArea from "./ScrollArea"

interface Message {
  content: string
  role: 'user' | 'assistant'
}

interface ChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading?: boolean
}

export default function Chat({ messages, isLoading }: ChatProps) {
  const { input, handleInputChange, handleSubmit } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.parentElement
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth'
        })
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="fixed inset-0 flex flex-col max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg"
      >
        <ScrollArea>
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-white/10 bg-black/20 p-4">
          <ChatInput 
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            className="max-w-3xl mx-auto"
          />
        </div>
      </motion.div>
    </div>
  )
}

