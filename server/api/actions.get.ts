import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 })
  }
  const client = await serverSupabaseClient<Database>(event);
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  console.log(currentDate.toISOString())
  // get START_EXAM actions from the database where userId is the current user and time in today
  const { data, error } = await client.from('actions').select('*').eq('action', 'START_EXAM').eq('userId', user.id).gte('created_at', currentDate.toISOString())
  if (error) {
    throw createError({ statusMessage: error.message, statusCode: 500 })
  }
  return data
})
