'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { Card, CardContent } from "@/components/ui/card";

type WordMeaning = {
  id: number;
  word: string;
  meaning: string;
};

interface WordMeaningTableProps {
  wordMeanings: WordMeaning[];
  onWordMeaningsChange: (updatedWordMeanings: WordMeaning[]) => void;
}

export default function WordMeaningTable({ wordMeanings, onWordMeaningsChange }: WordMeaningTableProps) {
  const handleEdit = (id: number, field: 'word' | 'meaning', value: string) => {
    const updatedWordMeanings = wordMeanings.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onWordMeaningsChange(updatedWordMeanings);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3 font-bold text-zinc-800 dark:text-zinc-200">
              Word
            </div>
            <div className="w-full sm:w-2/3 font-bold text-zinc-800 dark:text-zinc-200">
              Meaning
            </div>
          </div>
          {wordMeanings.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row gap-4 animate-in fade-in-50 duration-300"
            >
              <div className="w-full sm:w-1/3">
                <Input
                  id={`word-${item.id}`}
                  value={item.word}
                  onChange={(e) => handleEdit(item.id, 'word', e.target.value)}
                  placeholder="Enter word"
                  className="w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    text-zinc-900 dark:text-zinc-100
                    focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20
                    hover:bg-white/90 dark:hover:bg-zinc-800/90
                    transition-colors"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <Textarea
                  id={`meaning-${item.id}`}
                  value={item.meaning}
                  onChange={(e) => handleEdit(item.id, 'meaning', e.target.value)}
                  placeholder="Enter meaning"
                  className="w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    text-zinc-900 dark:text-zinc-100
                    focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20
                    hover:bg-white/90 dark:hover:bg-zinc-800/90
                    resize-none transition-colors"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
