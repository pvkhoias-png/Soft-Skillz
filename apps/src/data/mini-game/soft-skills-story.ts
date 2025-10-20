export interface Message {
  id: string
  text: string
  isBot: boolean
  options?: string[]
  isCorrect?: boolean
}

export interface Scenario {
  id: string
  category: string
  botMessage: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export const allScenarios: Scenario[] = [
  // Giao tiếp
  {
    id: '1',
    category: 'Giao tiếp',
    botMessage: 'Trong giờ học nhóm, bạn và Minh có ý kiến khác nhau về cách làm dự án. Minh nói to và cố thuyết phục bạn. Bạn sẽ làm gì?',
    options: [
      'Nói to hơn để Minh nghe ý kiến mình',
      'Lắng nghe Minh nói xong rồi trình bày ý kiến của mình một cách bình tĩnh',
      'Im lặng và làm theo ý kiến của Minh',
      'Bỏ đi vì không muốn tranh cãi',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Lắng nghe và trình bày ý kiến một cách bình tĩnh là cách giao tiếp hiệu quả nhất.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: '2',
    category: 'Giao tiếp',
    botMessage: 'Bạn vô tình làm hỏng máy tính của bạn cùng lớp. Bạn ấy rất buồn vì đây là món quà từ gia đình. Bạn sẽ nói gì?',
    options: [
      'Xin lỗi và đề nghị sửa chữa hoặc đền bù',
      'Nói "Xin lỗi" rồi đi ngay',
      'Đổ lỗi cho người khác',
      'Giả vờ không biết gì',
    ],
    correctAnswer: 0,
    explanation: 'Rất tốt! Xin lỗi chân thành và đề nghị sửa chữa thể hiện trách nhiệm và sự quan tâm.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '3',
    category: 'Giao tiếp',
    botMessage: 'Bạn cần thuyết trình trước lớp về dự án của nhóm. Bạn cảm thấy rất hồi hộp và sợ mình sẽ quên. Bạn sẽ làm gì?',
    options: [
      'Thở sâu, chuẩn bị kỹ và tập trung vào nội dung',
      'Đọc toàn bộ slide một cách nhanh chóng',
      'Nhờ bạn khác thuyết trình thay',
      'Bỏ qua phần thuyết trình',
    ],
    correctAnswer: 0,
    explanation: 'Xuất sắc! Thở sâu và chuẩn bị kỹ giúp bạn tự tin và thuyết trình hiệu quả hơn.',
    difficulty: 'hard',
    points: 20,
  },

  // Làm việc nhóm
  {
    id: '4',
    category: 'Làm việc nhóm',
    botMessage: 'Nhóm bạn có 4 người: An (giỏi thuyết trình), Bình (giỏi nghiên cứu), Chi (giỏi thiết kế), Dung (giỏi tổ chức). Cần làm bài thuyết trình về "Tác động của mạng xã hội" trong 1 tuần. Bạn sẽ phân công như thế nào?',
    options: [
      'Để mỗi người tự chọn phần mình thích',
      'Phân công theo thế mạnh: Bình nghiên cứu, Chi thiết kế, An thuyết trình, Dung tổ chức',
      'Làm chung tất cả mọi thứ',
      'Chia đều tất cả cho mọi người',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Phân công theo thế mạnh của từng người giúp tận dụng tài năng và hiệu quả cao nhất.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '5',
    category: 'Làm việc nhóm',
    botMessage: 'Trong nhóm có một thành viên thường xuyên không hoàn thành nhiệm vụ đúng hạn, làm ảnh hưởng đến tiến độ của cả nhóm. Bạn sẽ làm gì?',
    options: [
      'Phàn nàn với cô giáo ngay lập tức',
      'Nói chuyện riêng với thành viên đó để tìm hiểu nguyên nhân và hỗ trợ',
      'Làm thay phần việc của họ',
      'Loại bỏ họ khỏi nhóm',
    ],
    correctAnswer: 1,
    explanation: 'Rất tốt! Giao tiếp và hỗ trợ đồng đội là cách xử lý xung đột trong nhóm hiệu quả nhất.',
    difficulty: 'hard',
    points: 20,
  },

  // Quản lý thời gian
  {
    id: '6',
    category: 'Quản lý thời gian',
    botMessage: 'Tuần tới bạn có: 3 bài kiểm tra (Toán, Lý, Anh), 1 bài thuyết trình (Sử), 1 buổi thi đấu bóng đá, và cần dành thời gian cho gia đình. Thời gian rảnh: 4 tiếng/ngày sau giờ học. Bạn sẽ sắp xếp như thế nào?',
    options: [
      'Học theo thứ tự môn học xuất hiện',
      'Ưu tiên môn khó và sắp xếp theo deadline',
      'Học tất cả cùng lúc',
      'Bỏ một số hoạt động để tập trung học',
    ],
    correctAnswer: 1,
    explanation: 'Thông minh! Ưu tiên theo độ khó và deadline giúp bạn quản lý thời gian hiệu quả và đạt kết quả tốt nhất.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '7',
    category: 'Quản lý thời gian',
    botMessage: 'Bạn thường xuyên bị trễ hẹn với bạn bè vì không tính toán được thời gian di chuyển. Lần tới bạn sẽ làm gì?',
    options: [
      'Đặt giờ báo thức sớm hơn 30 phút',
      'Tính toán thời gian di chuyển và chuẩn bị trước',
      'Nhờ bạn bè đợi mình',
      'Hủy hẹn khi không chắc chắn về thời gian',
    ],
    correctAnswer: 1,
    explanation: 'Rất tốt! Tính toán và chuẩn bị trước là cách quản lý thời gian chủ động và hiệu quả.',
    difficulty: 'easy',
    points: 10,
  },

  // Giải quyết vấn đề
  {
    id: '8',
    category: 'Giải quyết vấn đề',
    botMessage: 'Trong lớp có 2 nhóm học sinh thường xuyên cãi nhau về việc sử dụng không gian chung. Nhóm A muốn yên tĩnh để học, nhóm B muốn thảo luận nhóm. Điều này ảnh hưởng đến không khí học tập của cả lớp. Bạn sẽ làm gì?',
    options: [
      'Để cô giáo xử lý',
      'Tổ chức cuộc họp để tìm giải pháp chung',
      'Chọn phe và ủng hộ một nhóm',
      'Tránh xa cả hai nhóm',
    ],
    correctAnswer: 1,
    explanation: 'Xuất sắc! Giao tiếp và hợp tác để tìm giải pháp chung là cách giải quyết xung đột tốt nhất.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '9',
    category: 'Giải quyết vấn đề',
    botMessage: 'Bạn gặp khó khăn trong việc hiểu một bài toán. Bạn đã thử nhiều cách nhưng vẫn không giải được. Bạn sẽ làm gì?',
    options: [
      'Bỏ cuộc và chép đáp án của bạn',
      'Tìm hiểu từng bước một cách có hệ thống và nhờ thầy cô giúp đỡ',
      'Học thuộc cách giải',
      'Đợi đến khi nào hiểu thì thôi',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Tìm hiểu có hệ thống và tìm kiếm sự giúp đỡ là cách học hiệu quả nhất.',
    difficulty: 'medium',
    points: 15,
  },

  // Lãnh đạo
  {
    id: '10',
    category: 'Lãnh đạo',
    botMessage: 'Bạn được chọn làm trưởng nhóm tổ chức chương trình "Áo ấm mùa đông" cho trẻ em vùng cao. Nhóm có 8 thành viên với các kỹ năng khác nhau. Thời gian: 2 tuần. Mục tiêu: quyên góp 100 áo ấm. Bạn sẽ dẫn dắt như thế nào?',
    options: [
      'Tự làm tất cả để đảm bảo chất lượng',
      'Phân công rõ ràng, động viên và hỗ trợ từng thành viên',
      'Để mọi người tự do làm theo ý muốn',
      'Chỉ giao việc cho những người mình tin tưởng',
    ],
    correctAnswer: 1,
    explanation: 'Xuất sắc! Phân công rõ ràng, động viên và hỗ trợ giúp phát huy tối đa năng lực của nhóm.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '11',
    category: 'Lãnh đạo',
    botMessage: 'Một thành viên trong nhóm bạn phụ trách liên tục không hoàn thành nhiệm vụ, khiến cả nhóm bị chậm tiến độ. Là trưởng nhóm, bạn sẽ xử lý như thế nào?',
    options: [
      'Loại bỏ thành viên đó khỏi nhóm ngay lập tức',
      'Nói chuyện riêng để hiểu vấn đề và tìm cách hỗ trợ',
      'Giao ít việc hơn cho họ',
      'Phàn nàn với thầy cô',
    ],
    correctAnswer: 1,
    explanation: 'Rất tốt! Lãnh đạo tốt là biết lắng nghe, hiểu vấn đề và tìm cách hỗ trợ đồng đội.',
    difficulty: 'hard',
    points: 20,
  },

  // Thuyết trình
  {
    id: '12',
    category: 'Thuyết trình',
    botMessage: 'Bạn có 10 phút để thuyết trình về dự án "Ứng dụng học tiếng Anh cho trẻ em" trước 5 giám khảo và 30 khán giả. Bạn đã chuẩn bị kỹ nhưng vẫn cảm thấy hồi hộp. Bạn sẽ làm gì?',
    options: [
      'Đọc toàn bộ slide một cách nhanh chóng',
      'Thở sâu, giao tiếp bằng mắt và kể câu chuyện hấp dẫn',
      'Tập trung vào slide và tránh nhìn khán giả',
      'Nhờ bạn khác thuyết trình thay',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Thở sâu giúp giảm căng thẳng, giao tiếp bằng mắt tạo kết nối, kể chuyện thu hút khán giả.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '13',
    category: 'Thuyết trình',
    botMessage: 'Trong lúc thuyết trình, có người đặt câu hỏi mà bạn không biết câu trả lời. Bạn sẽ làm gì?',
    options: [
      'Giả vờ không nghe thấy câu hỏi',
      'Thành thật nói không biết và hứa sẽ tìm hiểu sau',
      'Trả lời một cách mơ hồ',
      'Chuyển hướng sang chủ đề khác',
    ],
    correctAnswer: 1,
    explanation: 'Rất tốt! Thành thật và hứa tìm hiểu sau thể hiện sự chuyên nghiệp và trách nhiệm.',
    difficulty: 'medium',
    points: 15,
  },

  // Quản lý cảm xúc
  {
    id: '14',
    category: 'Quản lý cảm xúc',
    botMessage: 'Bạn vừa nhận điểm kém trong bài kiểm tra Toán mà bạn đã học rất chăm chỉ. Bạn cảm thấy rất thất vọng và muốn bỏ cuộc. Bạn sẽ làm gì?',
    options: [
      'Bỏ học Toán vì mình không có năng khiếu',
      'Nghỉ ngơi một chút, phân tích lỗi sai và lập kế hoạch học tập mới',
      'Học ngày đêm để bù đắp',
      'Chép bài của bạn để có điểm cao hơn',
    ],
    correctAnswer: 1,
    explanation: 'Xuất sắc! Quản lý cảm xúc và phân tích vấn đề một cách khách quan giúp bạn học hỏi và tiến bộ.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '15',
    category: 'Quản lý cảm xúc',
    botMessage: 'Bạn bị bạn cùng lớp trêu chọc về ngoại hình. Bạn cảm thấy rất buồn và tức giận. Bạn sẽ làm gì?',
    options: [
      'Trả thù bằng cách trêu chọc lại',
      'Bỏ qua và tập trung vào việc học',
      'Nói chuyện riêng với họ về cảm xúc của mình',
      'Báo cáo với thầy cô ngay lập tức',
    ],
    correctAnswer: 2,
    explanation: 'Rất tốt! Giao tiếp trực tiếp và thành thật về cảm xúc là cách xử lý tình huống này tốt nhất.',
    difficulty: 'medium',
    points: 15,
  },

  // Tư duy phản biện
  {
    id: '16',
    category: 'Tư duy phản biện',
    botMessage: 'Bạn đọc một bài báo trên mạng xã hội nói rằng "Học sinh không cần học Toán vì có máy tính". Bạn sẽ nghĩ như thế nào?',
    options: [
      'Tin ngay vì bài báo có nhiều lượt like',
      'Nghĩ lại và tìm hiểu thêm thông tin từ nhiều nguồn khác',
      'Chia sẻ bài viết này với bạn bè',
      'Bỏ qua vì không quan tâm',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Tư duy phản biện giúp bạn đánh giá thông tin một cách khách quan và đưa ra quyết định đúng đắn.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '17',
    category: 'Tư duy phản biện',
    botMessage: 'Trong cuộc thi tranh luận, đối thủ đưa ra một luận điểm mà bạn không đồng ý. Bạn sẽ phản bác như thế nào?',
    options: [
      'Tấn công cá nhân đối thủ',
      'Tìm bằng chứng và lập luận logic để phản bác',
      'Nói to hơn để át giọng đối thủ',
      'Đồng ý để tránh xung đột',
    ],
    correctAnswer: 1,
    explanation: 'Xuất sắc! Tranh luận dựa trên bằng chứng và lập luận logic là cách tranh luận chuyên nghiệp và hiệu quả.',
    difficulty: 'hard',
    points: 20,
  },

  // Sáng tạo
  {
    id: '18',
    category: 'Sáng tạo',
    botMessage: 'Nhóm bạn được giao nhiệm vụ tạo ra một sản phẩm để giải quyết vấn đề ô nhiễm môi trường. Mọi người đều đề xuất các ý tưởng giống nhau. Bạn sẽ làm gì?',
    options: [
      'Đồng ý với ý tưởng của mọi người',
      'Đề xuất cách tiếp cận hoàn toàn mới và khác biệt',
      'Chờ người khác nghĩ ra ý tưởng',
      'Sao chép ý tưởng từ nơi khác',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Tư duy sáng tạo và dám khác biệt giúp tìm ra giải pháp độc đáo và hiệu quả.',
    difficulty: 'hard',
    points: 20,
  },

  // Đạo đức và trách nhiệm
  {
    id: '19',
    category: 'Đạo đức và trách nhiệm',
    botMessage: 'Bạn phát hiện ra một bạn cùng lớp đang gian lận trong bài kiểm tra. Bạn sẽ làm gì?',
    options: [
      'Làm ngơ vì không phải việc của mình',
      'Nói chuyện riêng với bạn đó về hành động này',
      'Báo cáo ngay với thầy cô',
      'Gian lận theo để có điểm cao',
    ],
    correctAnswer: 1,
    explanation: 'Rất tốt! Giao tiếp trực tiếp và giúp bạn nhận ra sai lầm là cách xử lý tình huống này nhân văn nhất.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '20',
    category: 'Đạo đức và trách nhiệm',
    botMessage: 'Bạn được giao nhiệm vụ làm báo cáo nhóm nhưng do bận việc khác, bạn không hoàn thành đúng hạn. Bạn sẽ làm gì?',
    options: [
      'Đổ lỗi cho các thành viên khác',
      'Thành thật nhận lỗi và đề xuất cách khắc phục',
      'Giao cho người khác làm',
      'Giả vờ như không có việc gì xảy ra',
    ],
    correctAnswer: 1,
    explanation: 'Xuất sắc! Nhận trách nhiệm và tìm cách khắc phục thể hiện tính trung thực và trách nhiệm.',
    difficulty: 'medium',
    points: 15,
  },
]
