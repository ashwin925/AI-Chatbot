import { ReactNode } from 'react'

interface ScrollAreaProps {
  children: ReactNode
  className?: string
}

export default function ScrollArea({ children, className = '' }: ScrollAreaProps) {
  return (
    <div 
      className={`
        relative flex-1
        scrollbar-thin 
        scrollbar-thumb-gray-600 
        scrollbar-track-transparent 
        overflow-y-auto
        ${className}
      `}
    >
      <div className="absolute inset-0 p-4">
        <div className="h-full">
          {children}
        </div>
      </div>
    </div>
  )
} 