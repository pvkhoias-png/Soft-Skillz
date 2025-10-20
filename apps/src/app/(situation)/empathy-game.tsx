import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface EmotionScenario {
  id: string
  character: string
  emoji: string
  situation: string
  facialExpression: string
  bodyLanguage: string
  correctEmotion: string
  explanation: string
  options: string[]
}

const emotionScenarios: EmotionScenario[] = [
  {
    id: '1',
    character: 'Minh',
    emoji: '😔',
    situation: 'Minh vừa nhận điểm kém trong bài kiểm tra Toán mà bạn ấy đã học rất chăm chỉ. Bạn ấy ngồi một mình ở góc lớp, đầu cúi xuống, tay ôm đầu.',
    facialExpression: 'Mặt buồn, mắt nhìn xuống, miệng hơi nhếch xuống',
    bodyLanguage: 'Tư thế co lại, tay ôm đầu, ngồi một mình',
    correctEmotion: 'Thất vọng',
    explanation: 'Minh đang cảm thấy thất vọng vì kết quả không như mong đợi dù đã cố gắng. Đây là cảm xúc bình thường khi không đạt được mục tiêu.',
    options: ['Thất vọng', 'Tức giận', 'Vui vẻ', 'Lo lắng']
  },
  {
    id: '2',
    character: 'Lan',
    emoji: '😤',
    situation: 'Lan phát hiện bạn thân của mình đang nói xấu mình sau lưng. Lan đứng thẳng, nắm chặt tay, mặt đỏ lên.',
    facialExpression: 'Mặt đỏ, mắt mở to, miệng mím chặt',
    bodyLanguage: 'Đứng thẳng, tay nắm chặt, vai căng thẳng',
    correctEmotion: 'Tức giận',
    explanation: 'Lan đang tức giận vì cảm thấy bị phản bội bởi bạn thân. Cảm xúc này rất mạnh mẽ và cần được xử lý một cách bình tĩnh.',
    options: ['Tức giận', 'Buồn bã', 'Sợ hãi', 'Bình tĩnh']
  },
  {
    id: '3',
    character: 'Hùng',
    emoji: '😰',
    situation: 'Hùng sắp phải thuyết trình trước lớp lần đầu tiên. Bạn ấy run rẩy, đổ mồ hôi, liên tục nhìn đồng hồ.',
    facialExpression: 'Mặt căng thẳng, mắt mở to, miệng khô',
    bodyLanguage: 'Run rẩy, tay lạnh, liên tục di chuyển',
    correctEmotion: 'Lo lắng',
    explanation: 'Hùng đang lo lắng và căng thẳng trước một thử thách mới. Đây là phản ứng tự nhiên khi đối mặt với điều chưa biết.',
    options: ['Lo lắng', 'Tự tin', 'Buồn bã', 'Thờ ơ']
  },
  {
    id: '4',
    character: 'Mai',
    emoji: '😊',
    situation: 'Mai vừa được chọn làm lớp trưởng. Bạn ấy cười tươi, mắt sáng lên, đi lại nhanh nhẹn và chào hỏi mọi người.',
    facialExpression: 'Mặt tươi cười, mắt sáng, miệng cười rộng',
    bodyLanguage: 'Đi lại nhanh nhẹn, tư thế mở, giao tiếp tích cực',
    correctEmotion: 'Vui vẻ',
    explanation: 'Mai đang vui vẻ và tự hào vì được tin tưởng làm lớp trưởng. Cảm xúc tích cực này thể hiện qua năng lượng và thái độ.',
    options: ['Vui vẻ', 'Lo lắng', 'Tức giận', 'Thờ ơ']
  },
  {
    id: '5',
    character: 'Đức',
    emoji: '😢',
    situation: 'Đức vừa chia tay với bạn gái. Bạn ấy ngồi một mình, khóc lặng lẽ, tay che mặt.',
    facialExpression: 'Mặt ướt nước mắt, mắt đỏ, miệng run rẩy',
    bodyLanguage: 'Ngồi co lại, tay che mặt, vai rung lên',
    correctEmotion: 'Buồn bã',
    explanation: 'Đức đang trải qua nỗi buồn sâu sắc do mất mát tình cảm. Đây là phản ứng tự nhiên khi mất đi người quan trọng.',
    options: ['Buồn bã', 'Tức giận', 'Vui vẻ', 'Bình tĩnh']
  },
  {
    id: '6',
    character: 'Thảo',
    emoji: '😨',
    situation: 'Thảo đi lạc trong rừng một mình khi trời tối. Bạn ấy sợ hãi, run rẩy, liên tục nhìn xung quanh.',
    facialExpression: 'Mặt sợ hãi, mắt mở to, miệng mím chặt',
    bodyLanguage: 'Run rẩy, co lại, liên tục nhìn xung quanh',
    correctEmotion: 'Sợ hãi',
    explanation: 'Thảo đang sợ hãi vì ở trong tình huống nguy hiểm và không quen thuộc. Cảm xúc này giúp cơ thể chuẩn bị cho phản ứng chiến đấu hoặc chạy trốn.',
    options: ['Sợ hãi', 'Tự tin', 'Tức giận', 'Vui vẻ']
  }
]

export default function EmpathyGame() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [pulseAnim] = useState(new Animated.Value(1))

  const scenario = emotionScenarios[currentScenario]

  useEffect(() => {
    if (showResult) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start()
    } else {
      pulseAnim.setValue(1)
    }
  }, [showResult])

  const handleEmotionSelect = (emotion: string) => {
    if (showResult) return
    setSelectedEmotion(emotion)
    
    setTimeout(() => {
      setShowResult(true)
      if (emotion === scenario.correctEmotion) {
        setScore(prev => prev + 1)
      }
    }, 500)
  }

  const handleNext = () => {
    if (currentScenario < emotionScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setSelectedEmotion(null)
      setShowResult(false)
    } else {
      setGameCompleted(true)
    }
  }

  const handleContinue = () => {
    const finalScore = Math.round((score / emotionScenarios.length) * 100)
    router.push({
      pathname: ERouteTable.RESULT_SITUATION,
      params: {
        type: finalScore >= 70 ? 'win' : 'lose',
        totalScore: score,
        maxScore: emotionScenarios.length,
      },
    })
  }

  const isCorrect = selectedEmotion === scenario.correctEmotion

  if (gameCompleted) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-3xl font-bold text-center text-purple-800 mb-4">
            🎉 Hoàn thành!
          </Text>
          <Text className="text-xl text-center text-gray-700 mb-6">
            Bạn đã đọc đúng {score}/{emotionScenarios.length} cảm xúc
          </Text>
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-purple-600 px-8 py-4 rounded-full"
          >
            <Text className="text-white font-bold text-lg">Xem kết quả</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white h-12 w-12 items-center justify-center rounded-full shadow-md"
        >
          <AntDesign name="left" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold mr-10 text-gray-800">
          Đọc cảm xúc ({currentScenario + 1}/{emotionScenarios.length})
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Character Display */}
          <Animated.View 
            style={{ transform: [{ scale: pulseAnim }] }}
            className="items-center mb-8"
          >
            <View className="bg-white rounded-full p-8 shadow-lg mb-4">
              <Text className="text-8xl">{scenario.emoji}</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">{scenario.character}</Text>
          </Animated.View>

          {/* Situation */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Tình huống:</Text>
            <Text className="text-gray-700 leading-6 mb-4">{scenario.situation}</Text>
            
            <View className="bg-blue-50 rounded-lg p-4 mb-4">
              <Text className="text-sm font-semibold text-blue-800 mb-2">Biểu hiện:</Text>
              <Text className="text-blue-700 text-sm mb-2">• {scenario.facialExpression}</Text>
              <Text className="text-blue-700 text-sm">• {scenario.bodyLanguage}</Text>
            </View>
          </View>

          {/* Emotion Options */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Bạn nghĩ {scenario.character} đang cảm thấy gì?
            </Text>
            
            <View style={{ gap: 12 }}>
              {scenario.options.map((emotion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleEmotionSelect(emotion)}
                  disabled={showResult}
                  className={`p-4 rounded-xl border-2 ${
                    showResult
                      ? emotion === scenario.correctEmotion
                        ? 'bg-green-100 border-green-500'
                        : emotion === selectedEmotion
                          ? 'bg-red-100 border-red-500'
                          : 'bg-gray-100 border-gray-300'
                      : selectedEmotion === emotion
                        ? 'bg-purple-100 border-purple-500'
                        : 'bg-white border-gray-300'
                  }`}
                >
                  <Text className={`text-center font-semibold ${
                    showResult
                      ? emotion === scenario.correctEmotion
                        ? 'text-green-800'
                        : emotion === selectedEmotion
                          ? 'text-red-800'
                          : 'text-gray-600'
                      : selectedEmotion === emotion
                        ? 'text-purple-800'
                        : 'text-gray-800'
                  }`}>
                    {emotion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Result */}
          {showResult && (
            <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <View className="flex-row items-center mb-4">
                {isCorrect ? (
                  <AntDesign name="checkcircle" size={24} color="#10B981" />
                ) : (
                  <AntDesign name="closecircle" size={24} color="#EF4444" />
                )}
                <Text className={`ml-2 text-lg font-bold ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
                </Text>
              </View>
              
              <Text className="text-gray-700 mb-3">
                <Text className="font-semibold">Cảm xúc đúng:</Text> {scenario.correctEmotion}
              </Text>
              <Text className="text-gray-600 leading-5">{scenario.explanation}</Text>
              
              <TouchableOpacity
                onPress={handleNext}
                className="bg-purple-600 py-3 rounded-full mt-4"
              >
                <Text className="text-white text-center font-bold">
                  {currentScenario < emotionScenarios.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
