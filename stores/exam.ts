export const useExamStore = defineStore('examStore', {
  state: () => ({
    exam: '',
    selectBy: '',
    selectedQuestions: [] as Question[],
    currentQuestionIndex: 0,
  }),
  actions: {
    setExam(exam: string) {
      this.exam = exam
    },
    setSelectBy(selectBy: string) {
      this.selectBy = selectBy
    },
    setSelectedQuestions(questions: Question[]) {
      this.selectedQuestions = questions
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.selectedQuestions.length - 1) {
        this.currentQuestionIndex++
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },
  },
  getters: {
  },
})