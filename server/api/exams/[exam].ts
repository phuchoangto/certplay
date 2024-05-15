import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { load } from 'cheerio';
import { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const exam = getRouterParam(event, 'exam')
  if (!exam) {
    throw createError({ statusMessage: 'Exam not found', statusCode: 404 })
  }
  const { data, error } = await client.from('questions').select('*').ilike('exam', exam)
  if (error) {
    throw createError({ statusMessage: error.message, statusCode: 500 })
  }

  data.forEach((question) => {
    const $ = load(question.html || '')
    return {
      ...question,
      questionHtml: $('div.full-width-header').remove().end().html()
    }
  })
  return data
})
