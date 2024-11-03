"use client"
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import React from 'react'

const Page = () => {
  const string = ["Select processvideo in dropdown", "lets chat on something", "Hi There"];
  
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 h-full w-full overflow-x-hidden ">
      {/* Header Section */}
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold text-slate-800 animate-fade-in">
            Welcome to the Chat
          </h1>
          <p className="text-lg text-slate-600">
            Start a conversation or select from suggested topics below
          </p>
          <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-700 mb-3">
              Quick Tips
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Select from suggested prompts or type your own
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Press enter to send your message
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Use clear and specific questions for better responses
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Section - Fixed at Bottom */}
      <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <PlaceholdersAndVanishInput 
            placeholders={string} 
            onChange={() => console.log("Hi There")} 
            onSubmit={() => console.log("hi")}
          />
        </div>
      </div>
    </main>
  )
}

export default Page