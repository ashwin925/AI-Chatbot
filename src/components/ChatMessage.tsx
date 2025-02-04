interface ChatMessageProps {
  content: string
  role: 'user' | 'assistant'
}

export default function ChatMessage({ content, role }: ChatMessageProps) {
  return (
    <div 
      className={`
        flex 
        ${role === 'user' ? 'justify-end' : 'justify-start'}
        animate-in slide-in-from-bottom-2
      `}
    >
      <div
        className={`
          max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-lg
          ${role === 'user' 
            ? 'bg-blue-600 text-white ml-4' 
            : 'bg-gray-700 text-gray-100 mr-4'}
        `}
      >
        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
          {content}
        </p>
      </div>
    </div>
  )
}

