<script setup lang="ts">
import { LoaderCircle, BellRing, Bird, Book, Bot, Code2, CornerDownLeft, LifeBuoy, Mic, Paperclip, Rabbit, Settings, Settings2, Share, SquareTerminal, SquareUser, Triangle, Turtle } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
import { columns } from '@/components/columns'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useExamStore } from '@/stores/exam'
import { onKeyStroke } from '@vueuse/core'

const examStore = useExamStore()
const router = useRouter()

// ensure exam is set
if (!examStore.exam) {
  router.push('/')
}

const { data: questions, pending, error } = await useFetch<Question[]>(`/api/exams/${examStore.exam}`, {
  lazy: true,
})

const topics = computed(() => {
  if (!questions.value) {
    return []
  }
  return questions.value.map((question) => question.topic).filter((topic, index, self) => self.indexOf(topic) === index)
})
const modelValue = ref(['Apple', 'Banana'])

const selectBy = ref('range')
const from = ref(0)
const to = ref(60)
const isStarted = ref(false)

watch(selectBy, (value) => {
  examStore.setSelectBy(value)
})

const selectAll = ref(false)
const selectedQuestions = ref<Question[]>([])

const handleStart = () => {
  if (selectAll.value) {
    selectedQuestions.value = questions.value || []
  }

  if (selectBy.value === 'range') {
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

const isDiscussionVisible = ref(false)

const handleNextQuestion = () => {
  examStore.nextQuestion()
  isRevealSolution.value = false
}

const handlePreviousQuestion = () => {
  examStore.previousQuestion()
  isRevealSolution.value = false
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown);
});

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
</script>

<template>
  <div class="grid h-screen w-full pl-[56px]">
    <aside class="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div class="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle class="size-5 fill-foreground" />
        </Button>
      </div>
      <nav class="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-lg bg-muted" aria-label="Playground">
              <SquareTerminal class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Playground
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Models">
              <Bot class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Models
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="API">
              <Code2 class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            API
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Documentation">
              <Book class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Documentation
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-lg" aria-label="Settings">
              <Settings2 class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav class="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="mt-auto rounded-lg" aria-label="Help">
              <LifeBuoy class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" class="mt-auto rounded-lg" aria-label="Account">
              <SquareUser class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
    <div class="flex flex-col">
      <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 class="text-xl font-semibold">
          Playground
        </h1>
      </header>
      <main :class="{ 'flex flex-1 items-center justify-center': !isStarted, 'flex flex-1 flex-col': isStarted }">
        <LoaderCircle class="animate-spin" v-if="pending" />
        <div v-else-if="isStarted" class="flex flex-1 flex-col">
          <iframe :srcdoc="examStore.selectedQuestions[examStore.currentQuestionIndex].html" class="w-full h-full px-4"
            id="iframe"></iframe>
          <div class="p-4 border flex justify-center gap-4">
            <Button @click="handlePreviousQuestion">Previous</Button>
            <Sheet>
              <SheetTrigger>
                <Button>Discuss</Button>
              </SheetTrigger>
              <SheetContent class="w-[400px] sm:w-[540px] sm:max-w-[750px]">
                <iframe :srcdoc="examStore.selectedQuestions[examStore.currentQuestionIndex].discussionHtml"
                      class="w-full h-full px-4" id="iframe"></iframe>
              </SheetContent>
            </Sheet>
            <Button @click="handleRevealSolution" >Reveal solution</Button>
            <Button @click="handleNextQuestion">Next</Button>
          </div>
        </div>
        <Card class="w-[760px]" v-else>
          <CardHeader>
            <CardTitle>{{ examStore.exam }}</CardTitle>
            <CardDescription>{{ questions?.length }} questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col space-y-4">
              <div class="flex items-center space-x-4 rounded-md border p-4">
                <BellRing />
                <div class="flex-1 space-y-1">
                  <p class="text-sm font-medium leading-none">
                    Examination mode
                  </p>
                  <p class="text-sm text-muted-foreground">
                    Shuffle questions, use timer and score at the end
                  </p>
                </div>
                <Switch />
              </div>
              <fieldset class="grid gap-6 rounded-lg border p-4">
                <legend class="-ml-1 px-1 text-sm font-medium">
                  Select questions
                </legend>
                <Tabs default-value="range" v-model="selectBy">
                  <TabsList>
                    <TabsTrigger value="range">
                      BY RANGE
                    </TabsTrigger>
                    <TabsTrigger value="topic">
                      BY TOPIC
                    </TabsTrigger>
                    <TabsTrigger value="random">
                      RANDOM
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="range">
                    <div class="grid gap-4">
                      <div class="grid gap-2">
                        <Label>From</Label>
                        <Input type="number" v-model="from" />
                      </div>
                      <div class="grid gap-2">
                        <Label>To</Label>
                        <Input type="number" v-model="to" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="topic">
                    <TagsInput v-model="modelValue">
                      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                      </TagsInputItem>

                      <TagsInputInput placeholder="Fruits..." />
                    </TagsInput>
                  </TabsContent>
                  <TabsContent value="random">
                    Change your password here.
                  </TabsContent>
                </Tabs>
              </fieldset>
              <div class="items-top flex gap-x-2">
                <Checkbox id="terms1" v-model="selectAll" />
                <div class="grid gap-1.5 leading-none">
                  <label for="terms1"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Select all questions
                  </label>
                  <p class="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
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
  </div>
</template>