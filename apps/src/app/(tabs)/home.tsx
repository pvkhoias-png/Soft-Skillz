import { View, Text, TouchableOpacity, TextInput, FlatList, Image, ScrollView } from 'react-native'
import { router } from 'expo-router'
import HeaderHome from '@/components/HeaderHome'
import React, { useEffect, useMemo, useState } from 'react'
import ItemLessonHome from '@/components/ItemLessonHome'
import { ERouteTable } from '@/constants/route-table'
import { useHome } from '@/hooks/useHome'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { Play, SearchNormal1 } from 'iconsax-react-native'
import { images } from '@/constants'
import TitleComponent from '@/components/TitleComponent'
import ItemLessonHomeBig from '@/components/ItemLessonHomeBig'
import ItemLessonHomeSmall from '@/components/ItemLessonHomeSmall'
import { useToast } from '@/components/ToastNotify/ToastContext'
import { sortByLockOrder } from '@/utils/utils'

export type LessonItem = {
  thumb: string
  description: string
  title: string
  rank: string
  isCompleted: boolean
  category: { id: number; title: string }
  score: { score: number; totalScore: number }
  id: number
  isLocked: boolean
  image: string
  isPlaceholder?: boolean
}

export function toEvenArrayWithPlaceholder(data: LessonItem[] = []): LessonItem[] {
  const cleaned = [...data]
  if (cleaned.length % 2 !== 0) {
    cleaned.push({
      id: -1,
      thumb: '',
      description: '',
      title: '',
      rank: '',
      isCompleted: false,
      category: { id: 0, title: '' },
      score: { score: 0, totalScore: 0 },
      isLocked: false,
      image: '',
      isPlaceholder: true,
    })
  }
  return cleaned
}

function getRandomItems(data: any, count = 3) {
  const sorted = sortByLockOrder(data)
  const picked = [...sorted].sort(() => Math.random() - 0.5).slice(0, count)
  return sortByLockOrder(picked)
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const { categoriesQuery, learningItemsQuery } = useHome(activeTab ?? undefined)
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  // Khi màn hình focus -> refetch categories
  useEffect(() => {
    if (isFocused) queryClient.invalidateQueries({ queryKey: ['categories'] })
  }, [isFocused])

  // Khi categories load xong -> set activeTab lần đầu
  useEffect(() => {
    if (categoriesQuery.data?.length && !activeTab) {
      setActiveTab(categoriesQuery.data[0].id)
    }
  }, [categoriesQuery.data])

  const data = useMemo(
    () => toEvenArrayWithPlaceholder(learningItemsQuery?.data?.slice(0, 4) || []),
    [learningItemsQuery?.data],
  )

  const dataPopular = useMemo(
    () => getRandomItems(learningItemsQuery?.data, 3) || [],
    [learningItemsQuery?.data],
  )

  const dataSuggest = useMemo(
    () => getRandomItems(learningItemsQuery?.data, 4) || [],
    [learningItemsQuery?.data],
  )

  const keyExtractor = (item: LessonItem, index: number) =>
    item?.id !== undefined ? String(item.id) : `lesson-${index}`

  const renderLesson = ({ item }: { item: LessonItem }) =>
    item.isPlaceholder ? (
      <View style={{ flex: 1, margin: 8 }} />
    ) : (
      <ItemLessonHome
        data={item}
        onPress={() => {
          if (item.isLocked) {
            showToast('Vui lòng hoàn thành khoá học trước đó!', 'error')
          } else {
            router.push({
              pathname: ERouteTable.DETAIL_LESSON,
              params: {
                coursesId: item.id,
                score: item?.score?.score || 0,
                totalScore: item?.score?.totalScore || 100,
              },
            })
          }
        }}
      />
    )

  const renderItemLessonSmall = ({ item }: { item: LessonItem }) => (
    <ItemLessonHomeSmall
      data={item}
      onPress={() => {
        if (item.isLocked) {
          showToast('Vui lòng hoàn thành khoá học trước đó!', 'error')
        } else {
          router.push({
            pathname: ERouteTable.DETAIL_LESSON,
            params: {
              coursesId: item.id,
              score: item?.score?.score || 0,
              totalScore: item?.score?.totalScore || 100,
            },
          })
        }
      }}
    />
  )

  const renderItemLessonBig = ({ item }: { item: LessonItem }) => (
    <ItemLessonHomeBig
      data={item}
      onPress={() => {
        if (item.isLocked) {
          showToast('Vui lòng hoàn thành khoá học trước đó!', 'error')
        } else {
          router.push({
            pathname: ERouteTable.DETAIL_LESSON,
            params: {
              coursesId: item.id,
              score: item?.score?.score || 0,
              totalScore: item?.score?.totalScore || 100,
            },
          })
        }
      }}
    />
  )

  return (
    <View className="bg-neutral flex-1">
      <View className="px-4 pb-4">
        <HeaderHome />
      </View>

      <ScrollView className="px-4 flex-1" showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View className="relative">
          <TextInput
            className="w-full p-2 pl-14 h-14 bg-white rounded-full"
            placeholder="Tìm kiếm bài học"
            value={search}
            onChangeText={setSearch}
          />
          <View className="absolute top-3.5 left-4">
            <SearchNormal1 size="24" color="#919EAB" />
          </View>
        </View>
        {/* Title */}
        <Text className="text-2xl font-semibold mt-4">Danh mục kỹ năng mềm</Text>

        {/* Tabs thể loại: dùng FlatList horizontal để an toàn */}
        <View className="h-20">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 16 }}
            data={categoriesQuery.data || []}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`p-3.5 rounded-full mr-2 h-12 ${
                  activeTab === item.id ? 'border-primary-main border' : ''
                }`}
                style={{ backgroundColor: '#919EAB14' }}
                onPress={() => setActiveTab(item.id)}
              >
                <Text className="text-primary font-semibold capitalize">{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Hero banner */}
        <View className="my-4">
          <View className="mt-4 flex-row h-[288px] bg-primary-main justify-between items-center rounded-3xl overflow-hidden">
            <View className="p-5">
              <Text className="text-3xl font-bold text-white">Chinh phục {'\n'}Thử thách</Text>
              <Text className="text-sm text-[#FFFFFFA3] my-5">Bạn đã sẵn sàng?</Text>
              <Image source={images.userDiscovery} className="h-[36px] w-[92px]" />
              <TouchableOpacity
                onPress={() => router.push(ERouteTable.PLAY_SITUATION)}
                className="flex-row mt-5 w-[80%] z-20 items-center justify-between px-5 h-14 bg-white/10 rounded-full"
              >
                <Text className="text-white font-semibold">Khám phá ngay</Text>
                <View className="bg-primary rounded-full p-2">
                  <Play size="20" color="#FFFFFF" variant="Bold" />
                </View>
              </TouchableOpacity>
            </View>
            <Image source={images.discovery} className="w-60 h-80 mt-5 absolute right-0 bottom-0" />
          </View>
        </View>

        <TitleComponent title="Bài học phổ biến" />
        <FlatList
          horizontal
          data={dataPopular}
          renderItem={renderItemLessonBig}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        />

        <TitleComponent title="Bài học mới" />
        <FlatList
          data={data}
          renderItem={renderLesson}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ gap: 16 }}
          // (tuỳ chọn) tối ưu hoá
          initialNumToRender={6}
          windowSize={7}
          removeClippedSubviews
          getItemLayout={(_, index) => {
            // nếu ItemLessonHome có chiều cao cố định (ví dụ 250) + margin 16
            const ITEM_HEIGHT = 250
            const VERTICAL_GAP = 16
            return {
              length: ITEM_HEIGHT,
              offset: (ITEM_HEIGHT + VERTICAL_GAP) * Math.floor(index / 2),
              index,
            }
          }}
        />

        <TitleComponent title="Gần đây" />
        <FlatList
          horizontal
          data={learningItemsQuery?.data?.filter((it) => !it.isLocked)}
          renderItem={renderItemLessonSmall}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        />

        <TitleComponent title="Gợi ý cho bạn" />
        <FlatList
          horizontal
          data={dataSuggest}
          renderItem={renderItemLessonBig}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        />
      </ScrollView>
    </View>
  )
}
