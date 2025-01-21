"use client"

import { useState, useEffect } from "react"
import { getVotes, submitVote } from "./actions"
import { Hammer } from "lucide-react"

interface VoteCount {
  "Bruno do Java": number
  "Bruno do C#": number
}

export default function VotingApp() {
  const [votes, setVotes] = useState<VoteCount>({ "Bruno do Java": 0, "Bruno do C#": 0 })
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const initialVotes = await getVotes()
        const cleanedVotes: VoteCount = {
          "Bruno do Java": initialVotes["Bruno do Java"] || 0,
          "Bruno do C#": initialVotes["Bruno do C#"] || 0,
        }
        setVotes(cleanedVotes)
      } catch (error) {
        console.error("Erro ao buscar os votos:", error)
        setVotes({ "Bruno do Java": 0, "Bruno do C#": 0 })
      }
    }

    // Verificar se o usuário já votou
    const hasVotedBefore = localStorage.getItem("hasVoted") === "true"
    setHasVoted(hasVotedBefore)

    fetchVotes()
  }, [])

  const handleVote = async (candidate: keyof VoteCount) => {
    if (isVoting || hasVoted) return
    setIsVoting(true)
    try {
      const newVotes = await submitVote(candidate)
      const cleanedVotes: VoteCount = {
        "Bruno do Java": newVotes["Bruno do Java"] || 0,
        "Bruno do C#": newVotes["Bruno do C#"] || 0,
      }
      setVotes(cleanedVotes)

      // Marcar como votado no localStorage
      localStorage.setItem("hasVoted", "true")
      setHasVoted(true)
    } catch (error) {
      console.error("Erro ao enviar o voto:", error)
    } finally {
      setIsVoting(false)
    }
  }

  const totalVotes = votes["Bruno do Java"] + votes["Bruno do C#"]

  return (
    <div className="min-h-screen bg-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Hammer className="w-12 h-12 text-yellow-500 mr-4" />
          <h1 className="text-4xl font-bold text-yellow-500 text-center">Eleição do Líder Comunista</h1>
          <Hammer className="w-12 h-12 text-yellow-500 ml-4" />
        </div>

        <div className="bg-red-800 p-6 rounded-lg shadow-lg mb-8">
          <p className="text-yellow-500 text-xl text-center mb-6">
            Quem será o novo líder comunista da bolha dev do Bluesky?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Bruno do Java", "Bruno do C#"].map((candidate) => (
              <button
                key={candidate}
                onClick={() => handleVote(candidate as keyof VoteCount)}
                disabled={isVoting || hasVoted}
                className="bg-red-700 hover:bg-red-600 text-yellow-500 font-bold py-4 px-6 rounded-lg border-2 border-yellow-500 transition-colors disabled:opacity-50"
              >
                {candidate}
              </button>
            ))}
          </div>

          {hasVoted && (
            <p className="text-yellow-500 text-center mt-4">Você já votou! Obrigado por participar.</p>
          )}
        </div>

        <div className="bg-red-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Resultados da Revolução</h2>

          {Object.entries(votes).map(([candidate, count]) => (
            <div key={candidate} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-yellow-500">{candidate}</span>
                <span className="text-yellow-500">
                  {count} votos ({totalVotes ? Math.round(((count as number) / totalVotes) * 100) : 0}%)
                </span>
              </div>
              <div className="bg-red-950 h-6 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full transition-all duration-500"
                  style={{
                    width: `${totalVotes ? ((count as number) / totalVotes) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}

          <p className="text-yellow-500 text-center mt-4">Total de camaradas que votaram: {totalVotes} </p>
          <p className="text-yellow-500 text-center mt-4">Vote só uma vez plis</p>
        </div>
      </div>
    </div>
  )
}
