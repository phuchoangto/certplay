<script setup lang="ts">
import { CircleX, LoaderCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useExamStore } from '@/stores/exam'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'

const examStore = useExamStore()
const router = useRouter()

// ensure exam is set
if (!examStore.exam) {
  router.push('/')
}

const { data: questions, pending, error } = useFetch<Question[]>(`/api/exams/${examStore.exam}`, { lazy: true })

const topics = computed(() => questions.value?.map((question) => question.topic).filter((topic, index, self) => self.indexOf(topic) === index) || [])

const selectBy = ref('range')
const from = ref(0)
const to = ref(60)
const isStarted = ref(false)

watch(selectBy, (value) => examStore.setSelectBy(value))

const selectAll = ref(false)
const selectedQuestions = ref<Question[]>([])

const handleStart = () => {
  if (selectAll.value) {
    selectedQuestions.value = questions.value || []
  } else if (selectBy.value === 'range') {
    selectedQuestions.value = questions.value?.slice(from.value, to.value) || []
  }

  examStore.setSelectedQuestions(selectedQuestions.value)
  isStarted.value = true
}

const isRevealSolution = ref(false)

const handleRevealSolution = () => {
  const iframe = document.getElementById('iframe') as HTMLIFrameElement
  iframe.contentWindow?.postMessage(isRevealSolution.value ? 'hide-solution' : 'reveal-solution', '*')
  isRevealSolution.value = !isRevealSolution.value
}

const handleNextQuestion = () => {
  examStore.nextQuestion()
  isRevealSolution.value = false
}

const handlePreviousQuestion = () => {
  examStore.previousQuestion()
  isRevealSolution.value = false
}

const handleGlobalKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case '3':
      handleNextQuestion()
      break
    case '1':
      handlePreviousQuestion()
      break
    case '2':
      handleRevealSolution()
      break
  }
}

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleGlobalKeydown))
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <main class="flex flex-1 flex-col justify-center" :class="{ 'items-center': !isStarted }">
      <LoaderCircle v-if="pending" class="animate-spin" />
      <div v-else-if="isStarted" class="flex flex-1 flex-col">
        <iframe
          :srcdoc="examStore.selectedQuestions[examStore.currentQuestionIndex].html"
          class="w-full h-full px-4"
          id="iframe"
        ></iframe>
        <div class="p-4 border flex justify-center gap-4">
          <Button @click="handlePreviousQuestion">Previous</Button>
          <Sheet>
            <SheetTrigger>
              <Button>Discuss</Button>
            </SheetTrigger>
            <SheetContent class="w-[400px] sm:w-[540px] sm:max-w-[750px]">
              <iframe
                :srcdoc="examStore.selectedQuestions[examStore.currentQuestionIndex].discussionHtml"
                class="w-full h-full px-4"
                id="iframe"
              ></iframe>
            </SheetContent>
          </Sheet>
          <Button @click="handleRevealSolution">Reveal solution</Button>
          <Button @click="handleNextQuestion">Next</Button>
        </div>
      </div>
      <Card v-else class="lg:w-[750px] md:w-[540px] w-full">
        <CardHeader>
          <CardTitle>{{ examStore.exam }}</CardTitle>
          <CardDescription>{{ questions?.length }} questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col space-y-4">
            <div class="flex items-center space-x-4 rounded-md border p-4">
              <!-- <BellRing /> -->
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium leading-none">Examination mode</p>
                <p class="text-sm text-muted-foreground">Shuffle questions, use timer and score at the end</p>
              </div>
              <!-- <Switch /> -->
            </div>
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">Select questions</legend>
              <Tabs v-model="selectBy">
                <TabsList>
                  <TabsTrigger value="range">BY RANGE</TabsTrigger>
                  <TabsTrigger value="topic">BY TOPIC</TabsTrigger>
                  <TabsTrigger value="random">RANDOM</TabsTrigger>
                </TabsList>
                <TabsContent value="range">
                  <div class="grid gap-4">
                    <div class="grid gap-2">
                      <Label>From</Label>
                      <Input v-model="from" type="number" />
                    </div>
                    <div class="grid gap-2">
                      <Label>To</Label>
                      <Input v-model="to" type="number" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="topic">
                  <!-- <TagsInput v-model="modelValue">
                    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                      <TagsInputItemText />
                      <TagsInputItemDelete />
                    </TagsInputItem>
                    <TagsInputInput placeholder="Fruits..." />
                  </TagsInput> -->
                </TabsContent>
                <TabsContent value="random">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </fieldset>
            <div class="items-top flex gap-x-2">
              <Checkbox v-model="selectAll" id="terms1" />
              <div class="grid gap-1.5 leading-none">
                <label
                  for="terms1"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Select all questions
                </label>
                <p class="text-sm text-muted-foreground">You agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" @click="handleStart">Start</Button>
        </CardFooter>
      </Card>
    </main>
  </div>
</template>