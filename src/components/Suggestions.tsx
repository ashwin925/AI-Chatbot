import { motion } from "framer-motion"
import React from "react"

interface SuggestionsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export default function Suggestions({ suggestions, onSelect }: SuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 text-sm bg-white bg-opacity-30 rounded-full hover:bg-opacity-40 transition-all duration-200"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  )
}

