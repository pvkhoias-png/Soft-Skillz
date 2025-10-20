import { images } from '@/constants'

export const RANK_TIERS = [
  {
    minScore: 0,
    maxScore: 1000,
    rank: images.rank1,
    nextRank: images.rank2,
    nextScore: 1000,
    name: 'HẠT GIỐNG Ý TƯỞNG',
    nameNext: 'NHÀ KHAI PHÁ',
  },
  {
    minScore: 1001,
    maxScore: 3000,
    rank: images.rank2,
    nextRank: images.rank3,
    nextScore: 3000,
    name: 'NHÀ KHAI PHÁ',
    nameNext: 'TÊN LỬA TĂNG TRƯỞNG',
  },
  {
    minScore: 3001,
    maxScore: 5000,
    rank: images.rank3,
    nextRank: images.rank4,
    nextScore: 5000,
    name: 'TÊN LỬA TĂNG TRƯỞNG',
    nameNext: 'NGÔI SAO ĐẦU TƯ',
  },
  {
    minScore: 5001,
    maxScore: 8000,
    rank: images.rank4,
    nextRank: images.rank5,
    nextScore: 8000,
    name: 'NGÔI SAO ĐẦU TƯ',
    nameNext: 'KỲ LÂN KHỞI NGHIỆP',
  },
  {
    minScore: 8001,
    maxScore: 10000,
    rank: images.rank5,
    nextRank: images.rank6,
    nextScore: 10000,
    name: 'KỲ LÂN KHỞI NGHIỆP',
    nameNext: 'HUYỀN THOẠI VÔ ĐỊCH',
  },
  {
    minScore: 10001,
    maxScore: 999999,
    rank: images.rank6,
    nextRank: images.rank6,
    nextScore: 999999,
    name: 'HUYỀN THOẠI VÔ ĐỊCH',
    nameNext: 'HUYỀN THOẠI VÔ ĐỊCH',
  },
]

export const listDefaultRank = [
  {
    image: images.rank1,
    name: 'Hạt Giống Ý Tưởng',
    description: 'Gieo những hạt giống đầu tiên trên hành trình học tập.',
    star: '0',
  },
  {
    image: images.rank2,
    name: 'Nhà Khai Phá',
    description: 'Đang khám phá và xây dựng những kỹ năng cơ bản.',
    star: '1,000',
  },
  {
    image: images.rank3,
    name: 'Tên Lửa Tăng Trưởng',
    description: 'Tốc độ học tập của bạn đang tăng vọt.',
    star: '3,000',
  },
  {
    image: images.rank4,
    name: 'Ngôi Sao Đầu Tư',
    description: 'Đã chứng minh giá trị và được công nhận.',
    star: '5,000',
  },
  {
    image: images.rank5,
    name: 'Kỳ Lân Khởi Nghiệp',
    description: 'Kỹ năng của bạn đã đạt đẳng cấp siêu việt.',
    star: '8,000',
  },
  {
    image: images.rank6,
    name: 'Huyền Thoại Vô Địch',
    description: 'Chinh phục mọi thử thách và trở thành huyền thoại.',
    star: '10,000',
  },
]
