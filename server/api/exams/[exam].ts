import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const exam = getRouterParam(event, 'exam')
  if (!exam) {
    throw createError({ statusMessage: 'Exam not found', statusCode: 404 })
  }
  const { data, error } = await client.from('questions').select('*').ilike('exam', exam).order('topic', { ascending: true }).order('questionNumber', { ascending: true })
  if (error) {
    throw createError({ statusMessage: error.message, statusCode: 500 })
  }
  return data
})
