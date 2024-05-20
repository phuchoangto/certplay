<script setup lang="ts">
import { Bell,SquareTerminal, CircleX, LoaderCircle, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users, Triangle } from 'lucide-vue-next'

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
  <div class="grid min-h-screen w-full md:grid-cols-[60px_1fr] lg:grid-cols-[60px_1fr]">
    <div class="hidden border-r md:block">
      <div class="flex items-center justify-center border-b h-[60px]">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle class="size-5 fill-foreground" />
        </Button>
      </div>
      <div class="flex-1">
        <nav class="grid gap-1 p-2 justify-center">
          <Button
              variant="ghost"
              size="icon"
              class="rounded-lg bg-muted"
              aria-label="Playground"
            >
              <SquareTerminal class="size-5" />
            </Button>
        </nav>
      </div>

    </div>
    <div class="flex flex-col">
      <header class="flex items-center gap-4 border-b px-4 h-[60px]">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <a href="#" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <a href="#"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a href="#"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                <ShoppingCart class="h-5 w-5" />
                Orders
                <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </a>
              <a href="#"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <Package class="h-5 w-5" />
                Products
              </a>
              <a href="#"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <Users class="h-5 w-5" />
                Customers
              </a>
              <a href="#"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <LineChart class="h-5 w-5" />
                Analytics
              </a>
            </nav>
            <div class="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our
                    support team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" class="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." v-model="search"
                class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="flex flex-1 flex-col justify-center" :class="{'items-center': !isStarted}">
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
        <Card class="lg:w-[750px] md:w-[540px] w-full" v-else>
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

