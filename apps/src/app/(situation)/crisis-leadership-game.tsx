import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface CrisisScenario {
  id: string
  title: string
  situation: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  stakeholders: string[]
  timeline: string
  phases: CrisisPhase[]
}

interface CrisisPhase {
  id: string
  phase: string
  description: string
  challenges: CrisisChallenge[]
}

interface CrisisChallenge {
  id: string
  challenge: string
  context: string
  options: {
    text: string
    description: string
    impact: {
      team: number // -5 to 5
      reputation: number // -5 to 5
      timeline: number // -5 to 5
      budget: number // -5 to 5
    }
    leadershipStyle: string
  }[]
}

const crisisScenarios: CrisisScenario[] = [
  {
    id: '1',
    title: 'Dự án sắp deadline nhưng gặp sự cố nghiêm trọng',
    situation: 'Nhóm của bạn đang phát triển ứng dụng quan trọng cho khách hàng lớn. Còn 3 ngày đến deadline nhưng phát hiện lỗi bảo mật nghiêm trọng có thể ảnh hưởng đến hàng nghìn người dùng.',
    urgency: 'critical',
    stakeholders: ['Khách hàng', 'Đội phát triển', 'Ban giám đốc', 'Người dùng cuối'],
    timeline: '3 ngày',
    phases: [
      {
        id: 'assessment',
        phase: 'Đánh giá tình hình',
        description: 'Bạn vừa nhận được báo cáo về lỗi bảo mật từ team QA. Lỗi này có thể khiến dữ liệu người dùng bị rò rỉ.',
        challenges: [
          {
            id: 'immediate_response',
            challenge: 'Phản ứng ngay lập tức',
            context: 'Khách hàng đang chờ sản phẩm và đã đầu tư rất nhiều tiền. Báo chí có thể biết được thông tin này.',
            options: [
              {
                text: 'Thông báo ngay cho khách hàng và yêu cầu gia hạn',
                description: 'Thành thật về vấn đề và tìm giải pháp cùng nhau',
                impact: { team: 2, reputation: 1, timeline: 3, budget: -2 },
                leadershipStyle: 'Transparent & Collaborative'
              },
              {
                text: 'Giữ bí mật và cố gắng sửa lỗi trong im lặng',
                description: 'Không để ai biết và hy vọng sửa được trước deadline',
                impact: { team: -3, reputation: -4, timeline: -2, budget: 1 },
                leadershipStyle: 'Secretive & Risky'
              },
              {
                text: 'Thành lập team khủng hoảng và lập kế hoạch xử lý',
                description: 'Tập hợp chuyên gia và lập kế hoạch chi tiết',
                impact: { team: 3, reputation: 2, timeline: -1, budget: -1 },
                leadershipStyle: 'Systematic & Professional'
              }
            ]
          }
        ]
      },
      {
        id: 'communication',
        phase: 'Giao tiếp với các bên liên quan',
        description: 'Sau khi đánh giá, bạn cần thông báo cho tất cả các bên liên quan về tình hình và kế hoạch xử lý.',
        challenges: [
          {
            id: 'stakeholder_communication',
            challenge: 'Thông báo cho khách hàng',
            context: 'Khách hàng rất tức giận và đe dọa hủy hợp đồng. Họ cần biết chính xác điều gì đã xảy ra và khi nào sẽ được sửa.',
            options: [
              {
                text: 'Họp trực tiếp với khách hàng và trình bày kế hoạch chi tiết',
                description: 'Thể hiện sự chuyên nghiệp và cam kết khắc phục',
                impact: { team: 2, reputation: 3, timeline: 0, budget: 0 },
                leadershipStyle: 'Direct & Accountable'
              },
              {
                text: 'Gửi email báo cáo và hứa sẽ cập nhật thường xuyên',
                description: 'Giao tiếp qua văn bản để có thể kiểm soát thông tin',
                impact: { team: 0, reputation: 1, timeline: 0, budget: 0 },
                leadershipStyle: 'Controlled & Formal'
              },
              {
                text: 'Mời khách hàng tham gia vào quá trình khắc phục',
                description: 'Để họ hiểu rõ vấn đề và cùng tìm giải pháp',
                impact: { team: 3, reputation: 4, timeline: 1, budget: -1 },
                leadershipStyle: 'Inclusive & Transparent'
              }
            ]
          }
        ]
      },
      {
        id: 'resolution',
        phase: 'Khắc phục và phục hồi',
        description: 'Với sự hỗ trợ của team và khách hàng, bạn cần dẫn dắt quá trình khắc phục lỗi và đảm bảo chất lượng.',
        challenges: [
          {
            id: 'team_management',
            challenge: 'Quản lý team trong khủng hoảng',
            context: 'Team đang căng thẳng và mệt mỏi vì phải làm việc 24/7. Một số thành viên muốn nghỉ việc.',
            options: [
              {
                text: 'Tăng cường hỗ trợ và động viên team',
                description: 'Cung cấp thêm tài nguyên, thực phẩm và lời động viên',
                impact: { team: 4, reputation: 2, timeline: 0, budget: -2 },
                leadershipStyle: 'Supportive & Empathetic'
              },
              {
                text: 'Thuê thêm nhân lực tạm thời',
                description: 'Tìm kiếm chuyên gia bên ngoài để hỗ trợ',
                impact: { team: 2, reputation: 1, timeline: 2, budget: -3 },
                leadershipStyle: 'Strategic & Resourceful'
              },
              {
                text: 'Tập trung vào những người quan trọng nhất',
                description: 'Để những thành viên chủ chốt làm việc, những người khác nghỉ ngơi',
                impact: { team: 1, reputation: 0, timeline: 1, budget: 0 },
                leadershipStyle: 'Focused & Pragmatic'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Xung đột nghiêm trọng trong team',
    situation: 'Hai thành viên chủ chốt trong team có xung đột cá nhân nghiêm trọng, ảnh hưởng đến toàn bộ dự án. Một người đe dọa nghỉ việc nếu người kia không rời khỏi dự án.',
    urgency: 'high',
    stakeholders: ['Team members', 'HR Department', 'Project stakeholders'],
    timeline: '1 tuần',
    phases: [
      {
        id: 'conflict_assessment',
        phase: 'Đánh giá xung đột',
        description: 'Bạn cần hiểu rõ nguyên nhân và mức độ nghiêm trọng của xung đột giữa hai thành viên.',
        challenges: [
          {
            id: 'conflict_investigation',
            challenge: 'Tìm hiểu nguyên nhân xung đột',
            context: 'Cả hai đều là nhân viên giỏi và có đóng góp quan trọng cho dự án. Xung đột có vẻ liên quan đến vấn đề cá nhân.',
            options: [
              {
                text: 'Nói chuyện riêng với từng người để hiểu vấn đề',
                description: 'Lắng nghe cả hai phía một cách công bằng',
                impact: { team: 2, reputation: 2, timeline: 1, budget: 0 },
                leadershipStyle: 'Fair & Investigative'
              },
              {
                text: 'Tổ chức cuộc họp với cả hai để giải quyết trực tiếp',
                description: 'Để họ đối thoại và tìm giải pháp',
                impact: { team: 1, reputation: 1, timeline: 0, budget: 0 },
                leadershipStyle: 'Direct & Mediating'
              },
              {
                text: 'Mời HR tham gia để xử lý chuyên nghiệp',
                description: 'Để bộ phận chuyên trách xử lý vấn đề này',
                impact: { team: 0, reputation: 1, timeline: 2, budget: 0 },
                leadershipStyle: 'Professional & Delegating'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default function CrisisLeadershipGame() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState({
    team: 0,
    reputation: 0,
    timeline: 0,
    budget: 0
  })
  const [leadershipHistory, setLeadershipHistory] = useState<{
    phase: string
    challenge: string
    choice: string
    style: string
    impact: any
  }[]>([])

  const scenario = crisisScenarios[currentScenario]
  const currentPhaseData = scenario.phases[currentPhase]
  const currentChallengeData = currentPhaseData.challenges[currentChallenge]

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return
    
    setSelectedOption(optionIndex)
    const option = currentChallengeData.options[optionIndex]
    
    setTimeout(() => {
      setShowResult(true)
      setTotalScore(prev => ({
        team: prev.team + option.impact.team,
        reputation: prev.reputation + option.impact.reputation,
        timeline: prev.timeline + option.impact.timeline,
        budget: prev.budget + option.impact.budget
      }))
      setLeadershipHistory(prev => [...prev, {
        phase: currentPhaseData.phase,
        challenge: currentChallengeData.challenge,
        choice: option.text,
        style: option.leadershipStyle,
        impact: option.impact
      }])
    }, 500)
  }

  const handleNext = () => {
    if (currentChallenge < currentPhaseData.challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
      setSelectedOption(null)
      setShowResult(false)
    } else if (currentPhase < scenario.phases.length - 1) {
      setCurrentPhase(prev => prev + 1)
      setCurrentChallenge(0)
      setSelectedOption(null)
      setShowResult(false)
    } else if (currentScenario < crisisScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setCurrentPhase(0)
      setCurrentChallenge(0)
      setSelectedOption(null)
      setShowResult(false)
    } else {
      setGameCompleted(true)
    }
  }

  const handleContinue = () => {
    const overallScore = totalScore.team + totalScore.reputation + totalScore.timeline + totalScore.budget
    const maxScore = 80 // 20 points per category * 4 categories
    const percentage = Math.round(((overallScore + maxScore) / (maxScore * 2)) * 100)
    
    router.push({
      pathname: ERouteTable.RESULT_SITUATION,
      params: {
        type: percentage >= 70 ? 'win' : 'lose',
        totalScore: Math.max(0, overallScore),
        maxScore: maxScore,
      },
    })
  }

  const resetGame = () => {
    setCurrentScenario(0)
    setCurrentPhase(0)
    setCurrentChallenge(0)
    setSelectedOption(null)
    setShowResult(false)
    setGameCompleted(false)
    setTotalScore({ team: 0, reputation: 0, timeline: 0, budget: 0 })
    setLeadershipHistory([])
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'Cực kỳ khẩn cấp'
      case 'high': return 'Khẩn cấp'
      case 'medium': return 'Trung bình'
      case 'low': return 'Thấp'
      default: return 'Không xác định'
    }
  }

  if (gameCompleted) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-red-50 to-orange-50">
        <View className="flex-1 p-6">
          <View className="items-center mb-8">
            <Text className="text-4xl mb-4">🛡️</Text>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Khủng hoảng đã qua!</Text>
            <Text className="text-lg text-gray-600">Bạn đã lãnh đạo thành công qua {crisisScenarios.length} tình huống khủng hoảng</Text>
          </View>

          <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Đánh giá lãnh đạo:</Text>
            <View style={{ gap: 12 }}>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Điểm Team:</Text>
                <Text className={`font-semibold ${totalScore.team >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalScore.team >= 0 ? '+' : ''}{totalScore.team}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Điểm Reputation:</Text>
                <Text className={`font-semibold ${totalScore.reputation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalScore.reputation >= 0 ? '+' : ''}{totalScore.reputation}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Điểm Timeline:</Text>
                <Text className={`font-semibold ${totalScore.timeline >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalScore.timeline >= 0 ? '+' : ''}{totalScore.timeline}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Điểm Budget:</Text>
                <Text className={`font-semibold ${totalScore.budget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalScore.budget >= 0 ? '+' : ''}{totalScore.budget}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleContinue}
              className="bg-red-600 py-4 rounded-full"
            >
              <Text className="text-white text-center font-bold text-lg">Xem kết quả</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={resetGame}
              className="border-2 border-red-600 py-4 rounded-full"
            >
              <Text className="text-red-600 text-center font-bold text-lg">Chơi lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-red-50 to-orange-50">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white h-12 w-12 items-center justify-center rounded-full shadow-md"
        >
          <AntDesign name="left" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold mr-10 text-gray-800">
          Lãnh đạo trong khủng hoảng
        </Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* Crisis Info */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <View className="flex-row items-center mb-4">
            <View className="bg-red-100 rounded-full p-3 mr-3">
              <Text className="text-2xl">🚨</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{scenario.title}</Text>
              <View className="flex-row items-center mt-1">
                <View className={`px-2 py-1 rounded-full mr-2 ${getUrgencyColor(scenario.urgency)}`}>
                  <Text className="text-white text-xs font-bold">{getUrgencyText(scenario.urgency)}</Text>
                </View>
                <Text className="text-sm text-gray-500">Timeline: {scenario.timeline}</Text>
              </View>
            </View>
          </View>
          
          <Text className="text-gray-700 leading-6 mb-4">{scenario.situation}</Text>
          
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="text-gray-800 font-semibold mb-2">Các bên liên quan:</Text>
            <Text className="text-gray-600">{scenario.stakeholders.join(', ')}</Text>
          </View>
        </View>

        {/* Current Phase */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <View className="flex-row items-center mb-4">
            <View className="bg-orange-100 rounded-full p-3 mr-3">
              <Text className="text-2xl">📋</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{currentPhaseData.phase}</Text>
              <Text className="text-sm text-gray-500">Phase {currentPhase + 1}/{scenario.phases.length}</Text>
            </View>
          </View>
          
          <Text className="text-gray-700 leading-6 mb-4">{currentPhaseData.description}</Text>
        </View>

        {/* Current Challenge */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <View className="flex-row items-center mb-4">
            <View className="bg-yellow-100 rounded-full p-3 mr-3">
              <Text className="text-2xl">⚡</Text>
            </View>
            <Text className="text-lg font-semibold text-gray-800 flex-1">{currentChallengeData.challenge}</Text>
          </View>
          
          <Text className="text-gray-700 leading-6 mb-4">{currentChallengeData.context}</Text>
        </View>

        {/* Options */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Bạn sẽ hành động như thế nào?
          </Text>
          
          <View style={{ gap: 12 }}>
            {currentChallengeData.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(index)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 ${
                  showResult
                    ? index === selectedOption
                      ? 'bg-green-100 border-green-500'
                      : 'bg-gray-100 border-gray-300'
                    : selectedOption === index
                      ? 'bg-red-100 border-red-500'
                      : 'bg-white border-gray-300'
                }`}
              >
                <View className="flex-row items-start">
                  <View className="bg-red-100 rounded-full p-2 mr-3 mt-1">
                    <Text className="text-red-600 font-bold text-sm">{index + 1}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 font-medium mb-2">{option.text}</Text>
                    <Text className="text-sm text-gray-600 mb-3">{option.description}</Text>
                    
                    <View className="bg-gray-50 rounded-lg p-3">
                      <Text className="text-sm font-semibold text-gray-700 mb-2">Phong cách lãnh đạo:</Text>
                      <Text className="text-sm text-gray-600 mb-2">{option.leadershipStyle}</Text>
                      
                      <Text className="text-sm font-semibold text-gray-700 mb-1">Tác động:</Text>
                      <View className="flex-row flex-wrap">
                        {Object.entries(option.impact).map(([key, value]) => (
                          <View key={key} className="mr-2 mb-1">
                            <Text className={`text-xs px-2 py-1 rounded ${
                              value > 0 ? 'bg-green-100 text-green-700' : 
                              value < 0 ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {key}: {value > 0 ? '+' : ''}{value}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Result */}
        {showResult && selectedOption !== null && (
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-md">
            <View className="flex-row items-center mb-4">
              <AntDesign name="checkcircle" size={24} color="#10B981" />
              <Text className="ml-2 text-lg font-bold text-green-600">Quyết định đã được thực hiện</Text>
            </View>
            
            <Text className="text-gray-700 mb-4">
              <Text className="font-semibold">Lựa chọn của bạn:</Text> {currentChallengeData.options[selectedOption].text}
            </Text>
            <Text className="text-gray-600 leading-5 mb-4">
              {currentChallengeData.options[selectedOption].description}
            </Text>
            
            <TouchableOpacity
              onPress={handleNext}
              className="bg-red-600 py-3 rounded-full"
            >
              <Text className="text-white text-center font-bold">
                {currentChallenge < currentPhaseData.challenges.length - 1 ? 'Thử thách tiếp theo' : 
                 currentPhase < scenario.phases.length - 1 ? 'Phase tiếp theo' :
                 currentScenario < crisisScenarios.length - 1 ? 'Tình huống tiếp theo' : 'Hoàn thành'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Score Dashboard */}
        <View className="bg-white rounded-2xl p-4 shadow-md">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Dashboard lãnh đạo:</Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="bg-blue-50 rounded-lg p-3 w-[48%] mb-3">
              <Text className="text-blue-800 font-semibold text-sm">Team Morale</Text>
              <Text className={`text-lg font-bold ${totalScore.team >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalScore.team >= 0 ? '+' : ''}{totalScore.team}
              </Text>
            </View>
            <View className="bg-purple-50 rounded-lg p-3 w-[48%] mb-3">
              <Text className="text-purple-800 font-semibold text-sm">Reputation</Text>
              <Text className={`text-lg font-bold ${totalScore.reputation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalScore.reputation >= 0 ? '+' : ''}{totalScore.reputation}
              </Text>
            </View>
            <View className="bg-green-50 rounded-lg p-3 w-[48%]">
              <Text className="text-green-800 font-semibold text-sm">Timeline</Text>
              <Text className={`text-lg font-bold ${totalScore.timeline >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalScore.timeline >= 0 ? '+' : ''}{totalScore.timeline}
              </Text>
            </View>
            <View className="bg-yellow-50 rounded-lg p-3 w-[48%]">
              <Text className="text-yellow-800 font-semibold text-sm">Budget</Text>
              <Text className={`text-lg font-bold ${totalScore.budget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalScore.budget >= 0 ? '+' : ''}{totalScore.budget}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
