import { Dimensions, FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { images } from '@/constants'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useRef, useState } from 'react'
import { softSkillGames } from '@/data/soft-skills'

const { width } = Dimensions.get('window')

const listSituation = softSkillGames

export default function SituationScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentIndex(index)
  }

  const goToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true })
    setCurrentIndex(index)
  }

  return (
    <ImageBackground source={images.bgAuth} style={{ height: '100%' }}>
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 mt-2 mb-4">
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/play-situation')}
            className="bg-white h-12 w-12 items-center justify-center rounded-full"
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-center flex-1 mr-10">Chọn kỹ năng mềm</Text>
        </View>

        <Text className="text-2xl text-center text-gray-600 mt-2">
          Phát triển kỹ năng mềm cho tương lai
        </Text>

        {/* Carousel */}
        <FlatList
          ref={flatListRef}
          data={listSituation}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push(item.route)}
                activeOpacity={0.85}
                style={{
                  width: '100%',
                  borderRadius: 30,
                  overflow: 'hidden',
                  alignItems: 'center',
                }}
              >
                {/* Hình ảnh minh họa */}
                <ImageBackground
                  source={item.image}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 12 }}
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                  }}
                />

                {/* Icon và tiêu đề */}
                <View style={{ marginTop: 12, alignItems: 'center', paddingHorizontal: 16 }}>
                  <Text style={{ fontSize: 36 }}>{item.icon}</Text>
                  <Text className="text-lg font-bold text-center text-gray-800 mt-1">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-center text-gray-600 mt-2 leading-5">
                    {item.description}
                  </Text>
                  
                  {/* Thông tin độ khó và thời gian */}
                  <View className="flex-row justify-between w-full mt-3 px-2">
                    <View className="flex-row items-center">
                      <Text className="text-xs text-gray-500">Độ khó:</Text>
                      <Text className={`text-xs font-semibold ml-1 ${
                        item.difficulty === 'Dễ' ? 'text-green-600' :
                        item.difficulty === 'Trung bình' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {item.difficulty}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-xs text-gray-500">Thời gian:</Text>
                      <Text className="text-xs font-semibold ml-1 text-blue-600">
                        {item.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        <View className="flex-row justify-center mt-4">
          {listSituation.map((_, i) => (
            <View
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 4,
                backgroundColor: i === currentIndex ? '#000' : '#ccc',
              }}
            />
          ))}
        </View>
        {/* Controls */}
        <View className="flex-row justify-center items-center gap-6 mt-6">
          <TouchableOpacity
            onPress={() =>
              goToIndex((currentIndex - 1 + listSituation.length) % listSituation.length)
            }
            className="bg-white p-4 rounded-full shadow"
          >
            <AntDesign name="left" size={24} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => goToIndex((currentIndex + 1) % listSituation.length)}
            className="bg-white p-4 rounded-full shadow"
          >
            <AntDesign name="right" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
