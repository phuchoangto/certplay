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
  <ExamCard v-for="exam in exams" :exam="exam" />
</template>