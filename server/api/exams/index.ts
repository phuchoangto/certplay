import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data, error } = await client.from('questions').select('exam')

  if (error) {
    throw createError({ statusMessage: error.message, statusCode: 500 })
  }

  // remove duplicate exams
  const exams = data.map((question) => question.exam).filter((exam, index, self) => self.indexOf(exam) === index)

  return exams
})
