'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProjectsClientProps {
  allTags: string[]
}

export function ProjectsClient({ allTags }: ProjectsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // This is a placeholder - actual filtering would need to be done
  // via URL params or state management if you want client-side filtering
  // For now, we'll just show the tags UI

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      <button
        onClick={() => setSelectedTag(null)}
        className={`px-4 py-2 rounded-lg border transition-colors ${
          selectedTag === null
            ? 'bg-primary text-white border-primary'
            : 'bg-muted border-border hover:bg-muted/80'
        }`}
      >
        All
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            selectedTag === tag
              ? 'bg-primary text-white border-primary'
              : 'bg-muted border-border hover:bg-muted/80'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
