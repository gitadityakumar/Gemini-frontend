'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/text-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type WordMeaning = {
  id: number
  word: string
  meaning: string
}

interface WordMeaningTableProps {
  initialWordMeanings: WordMeaning[]
}

export default function WordMeaningTable({ initialWordMeanings }: WordMeaningTableProps) {
  const [wordMeanings, setWordMeanings] = useState<WordMeaning[]>(initialWordMeanings)

  const handleEdit = (id: number, field: 'word' | 'meaning', value: string) => {
    setWordMeanings(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 font-bold">
            <div className="w-full sm:w-1/3">Word</div>
            <div className="w-full sm:w-2/3">Meaning</div>
          </div>
          {wordMeanings.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/3">
                <Input
                  id={`word-${item.id}`}
                  value={item.word}
                  onChange={(e) => handleEdit(item.id, 'word', e.target.value)}
                  placeholder="Enter word"
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <Textarea
                  id={`meaning-${item.id}`}
                  value={item.meaning}
                  onChange={(e) => handleEdit(item.id, 'meaning', e.target.value)}
                  placeholder="Enter meaning"
                  className="w-full"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}