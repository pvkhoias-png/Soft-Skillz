// Type cho câu hỏi kỹ năng mềm
export type Question = {
  id: number
  question: string
  answer: number
  explanation: string
}

// Danh sách câu hỏi về kỹ năng mềm
export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Nếu bạn có 24 giờ trong ngày và dành 8 giờ để ngủ, 6 giờ để học, 2 giờ để ăn uống, thì bạn còn lại bao nhiêu giờ để làm việc khác?',
    answer: 8,
    explanation: '(24 - 8 - 6 - 2 = 8 giờ còn lại)',
  },
  {
    id: 2,
    question: 'Một nhóm có 5 thành viên. Nếu mỗi người hoàn thành 2 nhiệm vụ, tổng cộng nhóm sẽ hoàn thành bao nhiêu nhiệm vụ?',
    answer: 10,
    explanation: '(5 thành viên × 2 nhiệm vụ = 10 nhiệm vụ)',
  },
  {
    id: 3,
    question: 'Bạn cần hoàn thành 15 bài tập trong 3 ngày. Mỗi ngày bạn cần làm ít nhất bao nhiêu bài để hoàn thành đúng hạn?',
    answer: 5,
    explanation: '(15 bài ÷ 3 ngày = 5 bài mỗi ngày)',
  },
  {
    id: 4,
    question: 'Trong một cuộc thuyết trình 10 phút, bạn dành 2 phút giới thiệu, 6 phút trình bày nội dung chính. Còn lại bao nhiêu phút để kết luận và hỏi đáp?',
    answer: 2,
    explanation: '(10 - 2 - 6 = 2 phút còn lại)',
  },
  {
    id: 5,
    question: 'Bạn có 100 điểm trong một bài kiểm tra kỹ năng mềm. Bạn đạt 75 điểm. Tỷ lệ phần trăm đạt được là bao nhiêu?',
    answer: 75,
    explanation: '(75/100 × 100% = 75%)',
  },
  {
    id: 6,
    question: 'Một dự án cần hoàn thành trong 20 ngày. Đã trôi qua 12 ngày. Còn lại bao nhiêu ngày để hoàn thành?',
    answer: 8,
    explanation: '(20 - 12 = 8 ngày còn lại)',
  },
  {
    id: 7,
    question: 'Trong một cuộc họp nhóm có 8 người, mỗi người được nói tối đa 5 phút. Tổng thời gian nói của cả nhóm là bao nhiêu phút?',
    answer: 40,
    explanation: '(8 người × 5 phút = 40 phút)',
  },
  {
    id: 8,
    question: 'Bạn cần đọc 120 trang sách trong 6 ngày. Mỗi ngày bạn cần đọc ít nhất bao nhiêu trang?',
    answer: 20,
    explanation: '(120 trang ÷ 6 ngày = 20 trang mỗi ngày)',
  },
  {
    id: 9,
    question: 'Một khóa học kỹ năng mềm có 15 buổi học. Bạn đã tham gia 9 buổi. Còn lại bao nhiêu buổi?',
    answer: 6,
    explanation: '(15 - 9 = 6 buổi còn lại)',
  },
  {
    id: 10,
    question: 'Trong một bài thuyết trình, bạn cần trình bày 5 ý chính. Mỗi ý bạn dành 3 phút. Tổng thời gian trình bày là bao nhiêu phút?',
    answer: 15,
    explanation: '(5 ý × 3 phút = 15 phút)',
  },
  {
    id: 11,
    question: 'Bạn có 50 câu hỏi trong bài kiểm tra. Bạn trả lời đúng 42 câu. Số câu sai là bao nhiêu?',
    answer: 8,
    explanation: '(50 - 42 = 8 câu sai)',
  },
  {
    id: 12,
    question: 'Một nhóm dự án có 6 thành viên, mỗi người phụ trách 3 nhiệm vụ. Tổng số nhiệm vụ của nhóm là bao nhiêu?',
    answer: 18,
    explanation: '(6 thành viên × 3 nhiệm vụ = 18 nhiệm vụ)',
  },
  {
    id: 13,
    question: 'Bạn dành 2 giờ mỗi ngày để học kỹ năng mềm. Trong 1 tuần (7 ngày) bạn học tổng cộng bao nhiêu giờ?',
    answer: 14,
    explanation: '(2 giờ × 7 ngày = 14 giờ)',
  },
  {
    id: 14,
    question: 'Trong một cuộc tranh luận, mỗi bên có 10 phút để trình bày quan điểm. Tổng thời gian trình bày của cả hai bên là bao nhiêu phút?',
    answer: 20,
    explanation: '(2 bên × 10 phút = 20 phút)',
  },
  {
    id: 15,
    question: 'Bạn cần hoàn thành 30 bài tập trong 5 ngày. Mỗi ngày bạn cần làm ít nhất bao nhiêu bài?',
    answer: 6,
    explanation: '(30 bài ÷ 5 ngày = 6 bài mỗi ngày)',
  },
  {
    id: 16,
    question: 'Một khóa đào tạo kỹ năng lãnh đạo kéo dài 8 tuần. Đã trôi qua 5 tuần. Còn lại bao nhiêu tuần?',
    answer: 3,
    explanation: '(8 - 5 = 3 tuần còn lại)',
  },
  {
    id: 17,
    question: 'Trong một cuộc họp nhóm, 12 người tham gia. Nếu mỗi người nói 3 phút, tổng thời gian nói là bao nhiêu phút?',
    answer: 36,
    explanation: '(12 người × 3 phút = 36 phút)',
  },
  {
    id: 18,
    question: 'Bạn có 90 phút để hoàn thành một bài thi kỹ năng mềm. Đã trôi qua 65 phút. Còn lại bao nhiêu phút?',
    answer: 25,
    explanation: '(90 - 65 = 25 phút còn lại)',
  },
  {
    id: 19,
    question: 'Một dự án cần 24 giờ công để hoàn thành. Nhóm có 4 người. Mỗi người cần làm việc ít nhất bao nhiêu giờ?',
    answer: 6,
    explanation: '(24 giờ ÷ 4 người = 6 giờ mỗi người)',
  },
  {
    id: 20,
    question: 'Bạn cần đọc 80 trang tài liệu trong 4 ngày. Mỗi ngày bạn cần đọc ít nhất bao nhiêu trang?',
    answer: 20,
    explanation: '(80 trang ÷ 4 ngày = 20 trang mỗi ngày)',
  },
  {
    id: 21,
    question: 'Trong một bài thuyết trình 15 phút, bạn dành 3 phút mở đầu, 9 phút nội dung chính. Còn lại bao nhiêu phút để kết luận?',
    answer: 3,
    explanation: '(15 - 3 - 9 = 3 phút còn lại)',
  },
  {
    id: 22,
    question: 'Một nhóm có 7 thành viên tham gia cuộc thi. Mỗi người cần hoàn thành 4 thử thách. Tổng số thử thách là bao nhiêu?',
    answer: 28,
    explanation: '(7 thành viên × 4 thử thách = 28 thử thách)',
  },
  {
    id: 23,
    question: 'Bạn dành 1.5 giờ mỗi ngày để rèn luyện kỹ năng giao tiếp. Trong 1 tuần bạn rèn luyện tổng cộng bao nhiêu giờ?',
    answer: 10.5,
    explanation: '(1.5 giờ × 7 ngày = 10.5 giờ)',
  },
  {
    id: 24,
    question: 'Trong một cuộc đàm phán, mỗi bên có 15 phút để trình bày. Tổng thời gian trình bày là bao nhiêu phút?',
    answer: 30,
    explanation: '(2 bên × 15 phút = 30 phút)',
  },
  {
    id: 25,
    question: 'Bạn có 120 câu hỏi trong bài kiểm tra kỹ năng mềm. Bạn đã trả lời 85 câu. Còn lại bao nhiêu câu chưa trả lời?',
    answer: 35,
    explanation: '(120 - 85 = 35 câu chưa trả lời)',
  },
]
