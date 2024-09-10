'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data to simulate JSON from database
const initialData = [
  { id: 1, word: "Ephemeral", meaning: "Lasting for a very short time" },
  { id: 2, word: "Ubiquitous", meaning: "Present, appearing, or found everywhere" },
]

type WordMeaning = {
  id: number
  word: string
  meaning: string
}

export default function WordMeaningTable() {
  const [wordMeanings, setWordMeanings] = useState<WordMeaning[]>(initialData)

  const handleEdit = (id: number, field: 'word' | 'meaning', value: string) => {
    setWordMeanings(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        {/* <CardTitle>Word and Meaning Table</CardTitle> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Entry 1</TableHead>
              <TableHead className="text-center">Entry 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {wordMeanings.map((item) => (
                <TableCell key={item.id} className="p-2">
                  <Input
                    value={item.word}
                    onChange={(e) => handleEdit(item.id, 'word', e.target.value)}
                    placeholder="Enter word"
                    className="w-full"
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {wordMeanings.map((item) => (
                <TableCell key={item.id} className="p-2">
                  <Input
                    value={item.meaning}
                    onChange={(e) => handleEdit(item.id, 'meaning', e.target.value)}
                    placeholder="Enter meaning"
                    className="w-full"
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}