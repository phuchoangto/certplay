<script setup lang="ts">
import {
  Search,
  CircleX,
  LoaderCircle
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { computed, ref } from 'vue'
import ExamList from '@/components/ExamList.vue'


definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Home | Certplay',
})

const { data, pending, error } = useFetch<string[]>('/api/exams', { lazy: true })
const search = ref('')

const exams = computed(() =>
  !search.value || !data.value
    ? data.value || []
    : data.value.filter((exam) =>
        exam.toLowerCase().includes(search.value.toLowerCase())
      )
)
</script>

<template>
  <div class="flex flex-col">
    <Header>
      <form>
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="search"
            type="search"
            placeholder="Search exams..."
            class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </Header>
    <main
      class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"
      :class="{ 'justify-center': exams.length === 0 }"
    >
      
      <div class="flex flex-col items-center justify-center flex-1 gap-2" v-if="pending">
        <LoaderCircle class="size-5 animate-spin" />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 gap-2" v-else-if="exams.length === 0">
        <CircleX class="h-12 w-12 text-muted-foreground" />
        <h2 class="text-center text-lg font-semibold text-muted-foreground">
          No exams found
        </h2>
      </div>

      <div
        class="grid gap-4 md:grid-cols-2 lg:gap-6 lg:grid-cols-3"
        :class="{ hidden: exams.length === 0 }"
        v-else
      >
        <ExamList :exams="exams" />
      </div>
    </main>
  </div>
</template>