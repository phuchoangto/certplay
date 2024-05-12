<script setup lang="ts">
import { Bird, Book, Bot, Code2, CornerDownLeft, LifeBuoy, Mic, Paperclip, Rabbit, Settings, Settings2, Share, SquareTerminal, SquareUser, Triangle, Turtle } from 'lucide-vue-next'

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

const route = useRoute()

const exam = route.params.exam as string

const data = ref<Payment[]>([
  {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
])

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="grid h-screen w-full pl-[53px]">
    <aside class="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div class="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle class="size-5 fill-foreground" />
        </Button>
      </div>
      <nav class="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-lg bg-muted"
              aria-label="Playground"
            >
              <SquareTerminal class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Playground
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-lg"
              aria-label="Models"
            >
              <Bot class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Models
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-lg"
              aria-label="API"
            >
              <Code2 class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            API
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-lg"
              aria-label="Documentation"
            >
              <Book class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Documentation
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-lg"
              aria-label="Settings"
            >
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
            <Button
              variant="ghost"
              size="icon"
              class="mt-auto rounded-lg"
              aria-label="Help"
            >
              <LifeBuoy class="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="mt-auto rounded-lg"
              aria-label="Account"
            >
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
      <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="relative hidden flex-col items-start gap-8 md:flex">
          <form class="grid w-full items-start gap-6">
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <ExamCard exam="AZ-400" />
              <legend class="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <RadioGroup default-value="option-one">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="option-one" value="option-one" />
                  <Label for="option-one">Option One</Label>
                  <Input type="text" placeholder="Option One" />
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="option-two" value="option-two" />
                  <Label for="option-two">Option Two</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </form>
        </div>
        <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2">
          <DataTable :columns="columns" :data="data" />
        </div>
      </main>
    </div>
  </div>
</template>