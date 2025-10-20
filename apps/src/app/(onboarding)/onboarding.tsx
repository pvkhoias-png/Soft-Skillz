import { Text, ImageBackground, TouchableOpacity, View, Image } from 'react-native'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import { router } from 'expo-router'
import React from 'react'

export default function Onboarding() {
  return (
    <ImageBackground source={images.onboarding2} resizeMode="cover" className="h-full">
      <View className="mt-32 flex-1 px-4 items-center">
        <Image source={images.logoApp} className="h-[32px] w-[120px]" />
      </View>
      <View className="items-center mb-20 px-10">
        <Text className="text-4xl font-semibold text-center">Chào mừng bạn {'\n'}đến với SoftSkillz!</Text>
        <Text className="text-center py-6">
          Nơi học cách tự tin nói lên suy nghĩ, kết nối {'\n'}bạn bè và khám phá sức mạnh bên trong.
        </Text>
        <TouchableOpacity
          className="bg-primary-dark w-full rounded-full px-12 h-14 justify-center"
          onPress={() => router.replace(ERouteTable.SIGIN_IN)}
        >
          <Text className="text-center text-white text-lg font-bold ">Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}
