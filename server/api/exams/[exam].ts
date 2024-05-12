import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const exam = getRouterParam(event, 'exam')
  if (!exam) {
    throw createError({ statusMessage: 'Exam not found', statusCode: 404 })
  }
  const { data, error } = await client.from('questions').select('*').eq('exam', exam)
  if (error) {
    throw createError({ statusMessage: error.message, statusCode: 500 })
  }
  return data
})
