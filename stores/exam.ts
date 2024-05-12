export const useExamStore = defineStore('examStore', {
  state: () => ({
    exam: '',
    mode: '',
    from: 0,
    to: 0,
    take: 0,
    shuffle: false,
  }),
  actions: {
    setExam(exam: string) {
      this.exam = exam
    },
    setMode(mode: string) {
      this.mode = mode
    },
    setFrom(from: number) {
      this.from = from
    },
    setTo(to: number) {
      this.to = to
    },
    setTake(take: number) {
      this.take = take
    },
    setShuffle(shuffle: boolean) {
      this.shuffle = shuffle
    },
  },
})