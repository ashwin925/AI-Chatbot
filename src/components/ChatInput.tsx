import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  className?: string
}

export default function ChatInput({ input, handleInputChange, handleSubmit, isLoading, className }: ChatInputProps) {
  const [message, setMessage] = useState(input)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      handleSubmit(e)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [message])

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          handleInputChange(e)
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg pr-20
          resize-none max-h-[150px] min-h-[50px]
          focus:outline-none focus:ring-2 focus:ring-blue-500
          placeholder-gray-400"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="absolute right-2 bottom-2 px-4 py-1.5 bg-blue-600 text-white rounded-md
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}

