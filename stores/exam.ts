export const useExamStore = defineStore('examStore', {
  state: () => ({
    exam: '',
    selectBy: '',
    selectedQuestions: [] as Question[]
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
    }
  },
  getters: {
  },
})