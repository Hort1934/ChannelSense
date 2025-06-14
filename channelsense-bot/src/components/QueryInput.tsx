'use client'
import { useState } from 'react'
import { getMockResponse } from '@/lib/mockData'
import ResultBlock from './ResultBlock'

export default function QueryInput() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<string | null>(null)

  const handleAction = (action: string) => {
    const result = getMockResponse(action, query)
    setResponse(result)
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-4 border rounded-xl"
        placeholder="Напиши запит, напр. Хто топ-учасники каналу?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex space-x-2">
        <button onClick={() => handleAction('analytics')} className="btn">
          Аналітика
        </button>
        <button onClick={() => handleAction('manage')} className="btn">
          Управління
        </button>
        <button onClick={() => handleAction('report')} className="btn">
          Звіт
        </button>
      </div>
      {response && <ResultBlock text={response} />}
    </div>
  )
}
