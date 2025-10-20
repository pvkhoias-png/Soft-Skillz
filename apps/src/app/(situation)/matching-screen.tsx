import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { questionSets } from '@/data/mini-game/soft-skills-matching'
import { ERouteTable } from '@/constants/route-table'

function getRandomSet() {
  return questionSets[Math.floor(Math.random() * questionSets.length)]
}

export default function MatchingScreen() {
  const [question, setQuestion] = useState(() => getRandomSet())
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null)
  const [matches, setMatches] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleSelectTerm = (id: number) => {
    if (showResult) return
    setSelectedTerm(id)
  }
  const handleSelectDef = (defId: string) => {
    if (showResult || selectedTerm === null) return
    setMatches({ ...matches, [selectedTerm]: defId })
    setSelectedTerm(null)
  }
  const calculateScore = () => {
    let correctAnswers = 0
    question.terms.forEach((term) => {
      if (isCorrect(term.id)) {
        correctAnswers++
      }
    })
    const totalQuestions = question.terms.length
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100)
    setScore(calculatedScore)
    return calculatedScore
  }

  const handleContinue = () => {
    const finalScore = score || calculateScore()
    setQuestion(getRandomSet())
    setMatches({})
    setSelectedTerm(null)
    setShowResult(false)
    setScore(0)
    router.push({
      pathname: ERouteTable.RESULT_SITUATION,
      params: {
        type: finalScore >= 70 ? 'win' : 'lose',
      },
    })
  }
  const isCorrect = (termId: number) =>
    matches[termId] && matches[termId] === question.answer[termId as keyof typeof question.answer]
  const isWrong = (termId: number) =>
    matches[termId] && matches[termId] !== question.answer[termId as keyof typeof question.answer]
  const allMatched = Object.keys(matches).length === question.terms.length

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#64748B14] h-12 w-12 items-center justify-center rounded-full"
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold mr-10">Ghép nối kỹ năng mềm</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="flex-1">
          <Text className="text-center mb-10 mt-5">
            Ghép cột A (Kỹ năng) với cột B (Định nghĩa)
          </Text>
          <View className="flex-row justify-between mb-6">
            <View className="flex-1 mr-2">
              <Text className="font-bold mb-2">Cột A - Kỹ năng</Text>
              {question.terms.map((term) => (
                <TouchableOpacity
                  key={term.id}
                  className={`bg-[#F3F1FF] rounded-lg p-3 mb-3 border ${selectedTerm === term.id ? 'border-[#A084E8]' : 'border-transparent'} ${showResult && isCorrect(term.id) ? 'border-green-500' : ''} ${showResult && isWrong(term.id) ? 'border-red-500' : ''}`}
                  onPress={() => handleSelectTerm(term.id)}
                  disabled={!!matches[term.id] || showResult}
                >
                  <Text className="text-base">
                    {term.id}. {term.label}
                  </Text>
                  {matches[term.id] && (
                    <Text className="text-xs mt-1 text-gray-500">Đã ghép: {matches[term.id]}</Text>
                  )}
                  {showResult && isCorrect(term.id) && (
                    <Text className="text-green-600 text-xs mt-1">Đúng</Text>
                  )}
                  {showResult && isWrong(term.id) && (
                    <Text className="text-red-600 text-xs mt-1">Sai</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-1 ml-2">
              <Text className="font-bold mb-2">Cột B - Định nghĩa</Text>
              {question.definitions.map((def) => (
                <TouchableOpacity
                  key={def.id}
                  className={`bg-[#F3F1FF] rounded-lg p-3 mb-3 border ${selectedTerm !== null && !Object.values(matches).includes(def.id) ? 'border-[#A084E8]' : 'border-transparent'} ${Object.values(matches).includes(def.id) ? 'opacity-50' : ''}`}
                  onPress={() => handleSelectDef(def.id)}
                  disabled={
                    Object.values(matches).includes(def.id) || selectedTerm === null || showResult
                  }
                >
                  <Text className="text-base">
                    {def.id}. {def.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {showResult ? (
          <View>
            <View className="bg-[#F8F9FA] rounded-lg p-6 mb-6 border border-gray-200">
              <Text className="text-center text-lg font-bold mb-2">Kết quả của bạn</Text>
              <Text className="text-center text-3xl font-bold text-primary-main mb-2">{score}%</Text>
              <Text className="text-center text-gray-600">
                {Object.keys(matches).filter((termId) => isCorrect(Number(termId))).length}/
                {question.terms.length} câu đúng
              </Text>
              {score >= 70 ? (
                <Text className="text-center text-green-600 font-semibold mt-2">Xuất sắc! 🎉</Text>
              ) : score >= 50 ? (
                <Text className="text-center text-orange-600 font-semibold mt-2">Khá tốt! 👍</Text>
              ) : (
                <Text className="text-center text-red-600 font-semibold mt-2">
                  Cần cố gắng thêm! 💪
                </Text>
              )}
            </View>
            <TouchableOpacity
              className="bg-primary-main py-4 items-center rounded-full mb-8"
              onPress={handleContinue}
            >
              <Text className="text-white font-bold text-lg">Kết thúc</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="bg-primary-main rounded-full py-4 items-center mt-2 mb-8"
            disabled={!allMatched}
            onPress={() => {
              const calculatedScore = calculateScore()
              setShowResult(true)
            }}
          >
            <Text className="text-white font-bold text-lg">Kiểm tra kết quả</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
