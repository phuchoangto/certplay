import { createError } from "h3";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
import { Database } from "@/types/database.types";
import { z } from "zod";

const schema = z.object({
  action: z.string(),
  details: z.string(),
});

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ message: "Unauthorized", statusCode: 401 });
  }

  const result = await readValidatedBody(event, (body) =>
    schema.safeParse(body)
  );
  if (!result.success) {
    throw createError({ message: "Invalid body", statusCode: 400 });
  }

  const client = await serverSupabaseClient<Database>(event);

  const currentDate = new Date();

  // check subscription
  const { data: subscription, error: subscriptionError } = await client
    .from("subscriptions")
    .select("*")
    .eq("userId", user.id)
    .eq("plan", "PRO")
    .gte("expiresAt", currentDate.toISOString());

  if (subscriptionError) {
    throw createError({ message: subscriptionError.message, statusCode: 500 });
  }

  console.log(subscription);

  if (subscription.length === 0) {
    // if user has no subscription, check limit
    currentDate.setHours(0, 0, 0, 0);
    const { data: actions, error } = await client
      .from("actions")
      .select("*")
      .eq("action", "START_EXAM")
      .eq("userId", user.id)
      .gte("created_at", currentDate.toISOString());
    if (error) {
      throw createError({ message: error.message, statusCode: 500 });
    }

    // if has 5 or more actions, throw error
    if (actions.length >= 5) {
      throw createError({
        statusMessage: "Limit reached!",
        statusCode: 400,
        message: "You have reached the limit of 5 exams per day",
      });
    }
  }

  // store action
  const { action, details } = result.data;
  const { data, error: insertError } = await client
    .from("actions")
    .insert({ action, details, userId: user.id });
  if (insertError) {
    throw createError({ message: insertError.message, statusCode: 500 });
  }
  
  return data;
});
