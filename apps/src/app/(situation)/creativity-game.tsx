import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface CreativityChallenge {
  id: string
  title: string
  description: string
  category: string
  timeLimit: number // seconds
  minIdeas: number
  evaluationCriteria: {
    creativity: string
    feasibility: string
    originality: string
  }
  inspirationHints: string[]
}

const creativityChallenges: CreativityChallenge[] = [
  {
    id: '1',
    title: 'Giải pháp cho tắc đường',
    description: 'Hãy nghĩ ra các giải pháp sáng tạo để giảm tắc đường trong thành phố. Không giới hạn về công nghệ hay chi phí.',
    category: 'Giao thông',
    timeLimit: 300, // 5 phút
    minIdeas: 5,
    evaluationCriteria: {
      creativity: 'Ý tưởng độc đáo, không theo lối mòn',
      feasibility: 'Có thể thực hiện được trong thực tế',
      originality: 'Mới lạ, chưa từng được áp dụng'
    },
    inspirationHints: [
      'Nghĩ về công nghệ AI và IoT',
      'Xem xét từ góc độ hành vi con người',
      'Tận dụng không gian ngầm hoặc trên cao',
      'Kết hợp với các hoạt động khác'
    ]
  },
  {
    id: '2',
    title: 'Ứng dụng học tập thú vị',
    description: 'Tạo ra ý tưởng cho một ứng dụng học tập mới, giúp học sinh cảm thấy hứng thú và học hiệu quả hơn.',
    category: 'Giáo dục',
    timeLimit: 300,
    minIdeas: 6,
    evaluationCriteria: {
      creativity: 'Cách tiếp cận học tập mới mẻ',
      feasibility: 'Có thể phát triển với công nghệ hiện tại',
      originality: 'Khác biệt với các app hiện có'
    },
    inspirationHints: [
      'Kết hợp game và học tập',
      'Sử dụng AR/VR',
      'Tạo cộng đồng học tập',
      'Cá nhân hóa trải nghiệm'
    ]
  },
  {
    id: '3',
    title: 'Sản phẩm thân thiện môi trường',
    description: 'Nghĩ ra các sản phẩm hàng ngày có thể thay thế đồ nhựa, giúp bảo vệ môi trường mà vẫn tiện lợi.',
    category: 'Môi trường',
    timeLimit: 300,
    minIdeas: 7,
    evaluationCriteria: {
      creativity: 'Vật liệu và thiết kế sáng tạo',
      feasibility: 'Có thể sản xuất và sử dụng rộng rãi',
      originality: 'Chưa có trên thị trường'
    },
    inspirationHints: [
      'Sử dụng vật liệu tự nhiên',
      'Thiết kế đa năng',
      'Tái sử dụng và tái chế',
      'Giảm thiểu chất thải'
    ]
  }
]

interface Idea {
  id: string
  text: string
  category: 'creative' | 'feasible' | 'original'
}

export default function CreativityGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [currentIdea, setCurrentIdea] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const challenge = creativityChallenges[currentChallenge]

  useEffect(() => {
    let interval: number
    if (gameStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, timeLeft])

  const startChallenge = () => {
    setGameStarted(true)
    setTimeLeft(challenge.timeLimit)
    setIdeas([])
    setCurrentIdea('')
  }

  const addIdea = () => {
    if (currentIdea.trim().length < 10) {
      Alert.alert('Gợi ý', 'Ý tưởng của bạn cần ít nhất 10 ký tự để được chấp nhận!')
      return
    }

    const newIdea: Idea = {
      id: Date.now().toString(),
      text: currentIdea.trim(),
      category: 'creative' // Mặc định, sẽ được đánh giá sau
    }

    setIdeas(prev => [...prev, newIdea])
    setCurrentIdea('')
  }

  const handleTimeUp = () => {
    setGameStarted(false)
    if (ideas.length >= challenge.minIdeas) {
      setShowEvaluation(true)
    } else {
      Alert.alert(
        'Hết thời gian!',
        `Bạn cần ít nhất ${challenge.minIdeas} ý tưởng. Bạn chỉ có ${ideas.length} ý tưởng. Hãy thử lại!`,
        [{ text: 'OK', onPress: () => setGameStarted(false) }]
      )
    }
  }

  const evaluateIdeas = () => {
    // Tính điểm dựa trên số lượng và chất lượng ý tưởng
    let score = 0
    
    // Điểm cho số lượng
    const quantityBonus = Math.min(ideas.length - challenge.minIdeas, 5) * 5
    score += quantityBonus

    // Điểm cho từng ý tưởng (giả lập đánh giá)
    ideas.forEach(() => {
      score += Math.floor(Math.random() * 15) + 5 // 5-20 điểm mỗi ý tưởng
    })

    setTotalScore(prev => prev + score)
    
    if (currentChallenge < creativityChallenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
      setGameStarted(false)
      setShowEvaluation(false)
      setIdeas([])
      setCurrentIdea('')
    } else {
      setGameCompleted(true)
    }
  }

  const handleContinue = () => {
    const finalScore = Math.round((totalScore / 300) * 100) // 300 là điểm tối đa có thể
    router.push({
      pathname: ERouteTable.RESULT_SITUATION,
      params: {
        type: finalScore >= 70 ? 'win' : 'lose',
        totalScore: totalScore,
        maxScore: 300,
      },
    })
  }

  const resetGame = () => {
    setCurrentChallenge(0)
    setGameStarted(false)
    setGameCompleted(false)
    setShowEvaluation(false)
    setIdeas([])
    setCurrentIdea('')
    setTimeLeft(0)
    setTotalScore(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (gameCompleted) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-purple-50">
        <View className="flex-1 p-6">
          <View className="items-center mb-8">
            <Text className="text-4xl mb-4">🎨</Text>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Sáng tạo hoàn thành!</Text>
            <Text className="text-lg text-gray-600">Tổng điểm: {totalScore}/300</Text>
          </View>

          <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Thống kê sáng tạo:</Text>
            <View style={{ gap: 12 }}>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Số thử thách hoàn thành:</Text>
                <Text className="font-semibold">{creativityChallenges.length}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Tổng số ý tưởng:</Text>
                <Text className="font-semibold">{ideas.length}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Điểm trung bình:</Text>
                <Text className="font-semibold">{Math.round(totalScore / creativityChallenges.length)}</Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleContinue}
              className="bg-pink-600 py-4 rounded-full"
            >
              <Text className="text-white text-center font-bold text-lg">Xem kết quả</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={resetGame}
              className="border-2 border-pink-600 py-4 rounded-full"
            >
              <Text className="text-pink-600 text-center font-bold text-lg">Chơi lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  if (showEvaluation) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-purple-50">
        <View className="flex-1 p-6">
          <View className="items-center mb-6">
            <Text className="text-4xl mb-4">✨</Text>
            <Text className="text-xl font-bold text-gray-800 mb-2">Đánh giá ý tưởng</Text>
            <Text className="text-gray-600">Bạn đã tạo ra {ideas.length} ý tưởng!</Text>
          </View>

          <ScrollView className="flex-1 mb-6">
            <View className="space-y-4">
              {ideas.map((idea, index) => (
                <View key={idea.id} className="bg-white rounded-xl p-4 shadow-md">
                  <View className="flex-row items-start">
                    <View className="bg-pink-100 rounded-full p-2 mr-3 mt-1">
                      <Text className="text-pink-600 font-bold text-sm">{index + 1}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 leading-5">{idea.text}</Text>
                      <View className="flex-row mt-2">
                        <View className="bg-green-100 rounded-full px-3 py-1 mr-2">
                          <Text className="text-green-600 text-xs">Sáng tạo</Text>
                        </View>
                        <View className="bg-blue-100 rounded-full px-3 py-1 mr-2">
                          <Text className="text-blue-600 text-xs">Khả thi</Text>
                        </View>
                        <View className="bg-purple-100 rounded-full px-3 py-1">
                          <Text className="text-purple-600 text-xs">Độc đáo</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={evaluateIdeas}
            className="bg-pink-600 py-4 rounded-full"
          >
            <Text className="text-white text-center font-bold text-lg">
              {currentChallenge < creativityChallenges.length - 1 ? 'Thử thách tiếp theo' : 'Hoàn thành'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white h-12 w-12 items-center justify-center rounded-full shadow-md"
        >
          <AntDesign name="left" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold mr-10 text-gray-800">
          Brainstorming sáng tạo
        </Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* Challenge Info */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <View className="flex-row items-center mb-4">
            <View className="bg-pink-100 rounded-full p-3 mr-3">
              <Text className="text-2xl">💡</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{challenge.title}</Text>
              <Text className="text-sm text-gray-500">{challenge.category}</Text>
            </View>
          </View>
          
          <Text className="text-gray-700 leading-6 mb-4">{challenge.description}</Text>
          
          <View className="bg-yellow-50 rounded-lg p-4 mb-4">
            <Text className="text-yellow-800 font-semibold mb-2">Mục tiêu:</Text>
            <Text className="text-yellow-700">Tạo ra ít nhất {challenge.minIdeas} ý tưởng trong {challenge.timeLimit / 60} phút</Text>
          </View>

          {/* Timer */}
          {gameStarted && (
            <View className="bg-red-50 rounded-lg p-4 mb-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-red-800 font-semibold">Thời gian còn lại:</Text>
                <Text className={`text-2xl font-bold ${timeLeft <= 60 ? 'text-red-600' : 'text-red-800'}`}>
                  {formatTime(timeLeft)}
                </Text>
              </View>
              <View className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <View 
                  className={`h-2 rounded-full ${timeLeft <= 60 ? 'bg-red-500' : 'bg-red-600'}`}
                  style={{ width: `${(timeLeft / challenge.timeLimit) * 100}%` }}
                />
              </View>
            </View>
          )}
        </View>

        {/* Inspiration Hints */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <Text className="text-lg font-semibold text-gray-800 mb-4">💭 Gợi ý sáng tạo:</Text>
          <View className="space-y-2">
            {challenge.inspirationHints.map((hint, index) => (
              <View key={index} className="flex-row items-start">
                <Text className="text-pink-500 mr-2">•</Text>
                <Text className="text-gray-700 flex-1">{hint}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ideas Input */}
        {gameStarted && (
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Ý tưởng của bạn ({ideas.length}):
            </Text>
            
            <View className="flex-row items-end mb-4">
              <View className="flex-1 mr-3">
                <TextInput
                  value={currentIdea}
                  onChangeText={setCurrentIdea}
                  placeholder="Nhập ý tưởng sáng tạo của bạn..."
                  multiline
                  className="border-2 border-gray-200 rounded-xl p-3 text-gray-800"
                  style={{ minHeight: 80 }}
                />
              </View>
              <TouchableOpacity
                onPress={addIdea}
                disabled={!currentIdea.trim()}
                className={`p-3 rounded-xl ${
                  currentIdea.trim() ? 'bg-pink-600' : 'bg-gray-300'
                }`}
              >
                <AntDesign 
                  name="plus" 
                  size={24} 
                  color={currentIdea.trim() ? 'white' : 'gray'} 
                />
              </TouchableOpacity>
            </View>

            {/* Ideas List */}
            {ideas.length > 0 && (
            <View style={{ gap: 12 }}>
              {ideas.map((idea, index) => (
                <View key={idea.id} className="bg-gray-50 rounded-lg p-3">
                  <View className="flex-row items-start">
                    <View className="bg-pink-100 rounded-full p-2 mr-3 mt-1">
                      <Text className="text-pink-600 font-bold text-sm">{index + 1}</Text>
                    </View>
                    <Text className="text-gray-800 flex-1">{idea.text}</Text>
                  </View>
                </View>
              ))}
            </View>
            )}
          </View>
        )}

        {/* Start Button */}
        {!gameStarted && (
          <TouchableOpacity
            onPress={startChallenge}
            className="bg-pink-600 py-4 rounded-full"
          >
            <Text className="text-white text-center font-bold text-lg">
              Bắt đầu thử thách sáng tạo
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
