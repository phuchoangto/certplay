<script setup lang="ts">
import { Bird, Play } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useExamStore } from '@/stores/exam'

const router = useRouter()

const props = defineProps({
  exam: {
    type: String,
    required: true,
  }
});

const examStore = useExamStore()

const selectExam = () => {
  examStore.setExam(props.exam)
  router.push('/start')
}
</script>

<template>
  <Card class="hover:bg-accent cursor-pointer" @click="selectExam">
    <CardHeader>
        <CardTitle>
          {{ props.exam }}
        </CardTitle>
        <CardDescription>
          Beautifully designed components built with Radix UI and Tailwind CSS.
        </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-4 text-sm text-muted-foreground">
        <div class="flex items-center">
          <Icon name="logos:microsoft-icon" class="mr-1 h-3 w-3" />
          Microsoft
        </div>
        <div class="flex items-center">
          <Bird class="mr-1 h-3 w-3" />
          20k
        </div>
        <div>Updated April 2023</div>
      </div>
    </CardContent>
  </Card>
</template>