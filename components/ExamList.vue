<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const props = defineProps({
  exams: {
    type: Array as () => string[],
    required: true,
  },
})
</script>

<template>
  <div class="items-start justify-center gap-4 rounded-lg" :class="{ 'md:grid lg:grid-cols-2 xl:grid-cols-3': exams.length > 0 }">
    <ExamCard v-for="exam in exams" :exam="exam" />
    <Alert v-if="exams.length === 0">
      <AlertTitle>No exams found</AlertTitle>
      <AlertDescription>
        There are no exams available at the moment. Please check back later.
      </AlertDescription>
  </Alert>
  </div>
</template>