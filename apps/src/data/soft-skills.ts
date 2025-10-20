import { ERouteTable } from '@/constants/route-table'
import { images } from '@/constants'

export interface SoftSkillGame {
  id: string
  title: string
  icon: string
  image: any
  route: ERouteTable
  description: string
  difficulty: 'Dễ' | 'Trung bình' | 'Khó'
  time: string
  category: string
  scenarios?: SoftSkillScenario[]
  learningOutcomes?: string[]
}

export interface SoftSkillScenario {
  id: string
  title: string
  description: string
  situation: string
  options: {
    text: string
    isCorrect: boolean
    explanation: string
    points: number
  }[]
}

export const softSkillGames: SoftSkillGame[] = [
  {
    id: '1',
    title: 'Tình huống giao tiếp',
    icon: '🗣️',
    image: images.game1,
    route: ERouteTable.STORY_SCREEN,
    description: 'Học cách giao tiếp hiệu quả trong các tình huống khác nhau',
    difficulty: 'Dễ',
    time: '5-10 phút',
    category: 'Giao tiếp',
    learningOutcomes: [
      'Cải thiện khả năng lắng nghe',
      'Học cách diễn đạt ý kiến rõ ràng',
      'Phát triển kỹ năng đặt câu hỏi',
      'Rèn luyện cách phản hồi tích cực'
    ],
    scenarios: [
      {
        id: 'comm_1',
        title: 'Tranh luận với bạn bè',
        description: 'Bạn không đồng ý với ý kiến của bạn trong nhóm học tập',
        situation: 'Trong buổi thảo luận nhóm, Minh và Lan có quan điểm khác nhau về chủ đề dự án. Minh muốn làm dự án về môi trường, còn Lan muốn làm về công nghệ. Cả hai đều có lý do hợp lý.',
        options: [
          {
            text: 'Nói to hơn và cố gắng thuyết phục Lan',
            isCorrect: false,
            explanation: 'Nói to không phải cách giao tiếp hiệu quả. Điều này có thể tạo ra xung đột.',
            points: 0
          },
          {
            text: 'Lắng nghe ý kiến của Lan và tìm điểm chung',
            isCorrect: true,
            explanation: 'Lắng nghe và tìm điểm chung là cách tốt nhất để giải quyết xung đột.',
            points: 10
          },
          {
            text: 'Im lặng và để Lan quyết định',
            isCorrect: false,
            explanation: 'Im lặng không phải là giao tiếp. Cần bày tỏ ý kiến một cách tôn trọng.',
            points: 2
          }
        ]
      },
      {
        id: 'comm_2',
        title: 'Xin lỗi khi làm sai',
        description: 'Bạn vô tình làm hỏng đồ của bạn cùng lớp',
        situation: 'Trong giờ học, bạn vô tình làm đổ nước vào máy tính của bạn cùng lớp, khiến máy bị hỏng. Bạn cùng lớp rất buồn vì đây là món quà sinh nhật từ gia đình.',
        options: [
          {
            text: 'Xin lỗi chân thành và đề nghị sửa chữa',
            isCorrect: true,
            explanation: 'Xin lỗi chân thành và đề nghị sửa chữa thể hiện trách nhiệm và sự quan tâm.',
            points: 10
          },
          {
            text: 'Đổ lỗi cho người khác',
            isCorrect: false,
            explanation: 'Đổ lỗi cho người khác không giải quyết được vấn đề và làm mất lòng tin.',
            points: 0
          },
          {
            text: 'Giả vờ không biết gì',
            isCorrect: false,
            explanation: 'Giả vờ không biết là hành vi không trung thực và có thể làm tình hình tồi tệ hơn.',
            points: 0
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Làm việc nhóm',
    icon: '👥',
    image: images.game2,
    route: ERouteTable.MATCHING_SCREEN,
    description: 'Rèn luyện kỹ năng hợp tác và làm việc nhóm',
    difficulty: 'Trung bình',
    time: '10-15 phút',
    category: 'Hợp tác',
    learningOutcomes: [
      'Hiểu vai trò của từng thành viên trong nhóm',
      'Phát triển kỹ năng phân công công việc',
      'Học cách giải quyết xung đột trong nhóm',
      'Rèn luyện khả năng hỗ trợ đồng đội'
    ],
    scenarios: [
      {
        id: 'team_1',
        title: 'Phân công nhiệm vụ trong dự án',
        description: 'Nhóm 4 người cần hoàn thành bài thuyết trình trong 1 tuần',
        situation: 'Nhóm của bạn có 4 thành viên: An (giỏi thuyết trình), Bình (giỏi nghiên cứu), Chi (giỏi thiết kế), Dung (giỏi tổ chức). Cần làm bài thuyết trình về "Tác động của mạng xã hội" trong 1 tuần.',
        options: [
          {
            text: 'Để mỗi người tự chọn phần mình thích',
            isCorrect: false,
            explanation: 'Tự chọn có thể dẫn đến không cân bằng khối lượng công việc.',
            points: 3
          },
          {
            text: 'Phân công theo thế mạnh: Bình nghiên cứu, Chi thiết kế, An thuyết trình, Dung tổ chức',
            isCorrect: true,
            explanation: 'Phân công theo thế mạnh giúp tận dụng tài năng của từng người.',
            points: 10
          },
          {
            text: 'Làm chung tất cả mọi thứ',
            isCorrect: false,
            explanation: 'Làm chung có thể gây lãng phí thời gian và không hiệu quả.',
            points: 2
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Quản lý thời gian',
    icon: '⏰',
    image: images.game3,
    route: ERouteTable.FILL_VALUE_SCREEN,
    description: 'Học cách sắp xếp và quản lý thời gian hiệu quả',
    difficulty: 'Trung bình',
    time: '8-12 phút',
    category: 'Tổ chức',
    learningOutcomes: [
      'Biết cách ưu tiên công việc',
      'Học cách lập kế hoạch thời gian',
      'Phát triển kỹ năng đánh giá thời gian',
      'Rèn luyện tính kỷ luật'
    ],
    scenarios: [
      {
        id: 'time_1',
        title: 'Lập lịch học tập hiệu quả',
        description: 'Cần sắp xếp thời gian cho nhiều môn học và hoạt động',
        situation: 'Tuần tới bạn có: 3 bài kiểm tra (Toán, Lý, Anh), 1 bài thuyết trình (Sử), 1 buổi thi đấu bóng đá, và cần dành thời gian cho gia đình. Thời gian rảnh: 4 tiếng/ngày sau giờ học.',
        options: [
          {
            text: 'Học theo thứ tự môn học xuất hiện',
            isCorrect: false,
            explanation: 'Không ưu tiên theo độ quan trọng và thời gian có thể không đủ.',
            points: 2
          },
          {
            text: 'Ưu tiên môn khó và sắp xếp theo deadline',
            isCorrect: true,
            explanation: 'Ưu tiên theo độ khó và deadline giúp quản lý thời gian hiệu quả.',
            points: 10
          },
          {
            text: 'Học tất cả cùng lúc',
            isCorrect: false,
            explanation: 'Học tất cả cùng lúc có thể gây căng thẳng và không hiệu quả.',
            points: 1
          }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Lãnh đạo nhóm',
    icon: '👑',
    image: images.game1,
    route: ERouteTable.STORY_SCREEN,
    description: 'Học cách dẫn dắt và lãnh đạo một nhóm hiệu quả',
    difficulty: 'Khó',
    time: '12-18 phút',
    category: 'Lãnh đạo',
    learningOutcomes: [
      'Hiểu vai trò của người lãnh đạo',
      'Học cách truyền cảm hứng và động viên',
      'Phát triển kỹ năng ra quyết định',
      'Rèn luyện khả năng chịu trách nhiệm'
    ],
    scenarios: [
      {
        id: 'leadership_1',
        title: 'Dẫn dắt dự án từ thiện',
        description: 'Là trưởng nhóm tổ chức chương trình từ thiện',
        situation: 'Bạn được chọn làm trưởng nhóm tổ chức chương trình "Áo ấm mùa đông" cho trẻ em vùng cao. Nhóm có 8 thành viên với các kỹ năng khác nhau. Thời gian: 2 tuần. Mục tiêu: quyên góp 100 áo ấm.',
        options: [
          {
            text: 'Tự làm tất cả để đảm bảo chất lượng',
            isCorrect: false,
            explanation: 'Làm tất cả một mình không phát huy được sức mạnh tập thể.',
            points: 2
          },
          {
            text: 'Phân công rõ ràng, động viên và hỗ trợ từng thành viên',
            isCorrect: true,
            explanation: 'Phân công và hỗ trợ giúp phát huy tối đa năng lực của nhóm.',
            points: 10
          },
          {
            text: 'Để mọi người tự do làm theo ý muốn',
            isCorrect: false,
            explanation: 'Thiếu định hướng có thể dẫn đến lãng phí thời gian và nguồn lực.',
            points: 3
          }
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'Đọc cảm xúc',
    icon: '😊',
    image: images.game3,
    route: ERouteTable.EMPATHY_GAME,
    description: 'Học cách đọc hiểu và đồng cảm với cảm xúc của người khác',
    difficulty: 'Dễ',
    time: '8-12 phút',
    category: 'Đồng cảm',
    learningOutcomes: [
      'Nhận biết các biểu hiện cảm xúc trên khuôn mặt',
      'Hiểu ngôn ngữ cơ thể và tín hiệu phi ngôn từ',
      'Phát triển khả năng đồng cảm',
      'Cải thiện kỹ năng giao tiếp'
    ]
  },
  {
    id: '10',
    title: 'Sáng tạo brainstorming',
    icon: '💡',
    image: images.game2,
    route: ERouteTable.CREATIVITY_GAME,
    description: 'Phát triển tư duy sáng tạo và khả năng tạo ra ý tưởng mới',
    difficulty: 'Trung bình',
    time: '10-15 phút',
    category: 'Sáng tạo',
    learningOutcomes: [
      'Tư duy out-of-the-box',
      'Tạo ra nhiều ý tưởng trong thời gian ngắn',
      'Kết hợp các ý tưởng để tạo ra giải pháp mới',
      'Đánh giá và lựa chọn ý tưởng tốt nhất'
    ]
  },
  {
    id: '11',
    title: 'Lãnh đạo khủng hoảng',
    icon: '🛡️',
    image: images.game3,
    route: ERouteTable.CRISIS_LEADERSHIP_GAME,
    description: 'Rèn luyện kỹ năng lãnh đạo trong các tình huống khủng hoảng',
    difficulty: 'Khó',
    time: '20-25 phút',
    category: 'Lãnh đạo',
    learningOutcomes: [
      'Quản lý stress và áp lực trong khủng hoảng',
      'Đưa ra quyết định nhanh chóng và chính xác',
      'Giao tiếp hiệu quả trong tình huống căng thẳng',
      'Dẫn dắt team vượt qua khó khăn'
    ]
  }
]