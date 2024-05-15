import { createClient } from "@supabase/supabase-js";
import { load } from "cheerio";

const SUPABASE_URL = "https://pxaipuuwlbzpuxlfdyvn.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YWlwdXV3bGJ6cHV4bGZkeXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNTYxNTIsImV4cCI6MjAzMDgzMjE1Mn0.Bq4FXYF8sf5Yq057vbKIdbgE7QgbcHxo2udYC4GvHHk";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const exam = "AZ-400";

// Fetch questions from Supabase
const { data: questions, error: fetchError } = await supabase
  .from("questions_duplicate")
  .select("*")
  .eq("exam", exam);

if (fetchError) {
  console.error("Error fetching questions:", fetchError);
  process.exit(1);
}

if (questions) {
  for (const question of questions) {
    try {
      console.log(`Fixing question ${question.title}`);
      const $ = load(question.html);

      // fix assets path
      $.html().replace(/\=\"\/assets/g, '="https://www.examtopics.com/assets');

      // Remove unwanted elements
      $("div.full-width-header").remove();
      $("div.footer-cert").remove();
      $("footer").remove();
      $("div.action-row-container").remove();
      $("div.container div.row").first().remove();
      $("div.container div.row").first().remove();
      $("div.container div.row").first().remove();
      $("div.discussion-page-comments-section").remove();
      $("div.sec-spacer").removeClass("sec-spacer pt-50");
      $("div.discussion-header-container").removeClass(
        "discussion-header-container"
      );
      $("div.container").removeClass("container");

      // add custom script
      $("body").append(`<script>window.addEventListener('message', (event) => {
        if (event.data === 'reveal-solution') {
            window.document.querySelector('a.reveal-solution').click()
        }
        if (event.data === 'hide-solution') {
          window.document.querySelector('a.hide-solution').click()
      }
    });</script>`);

      console.log(`Updating question ${question.title}`);
      const { error: updateError } = await supabase
        .from("questions")
        .update({ html: $.html() })
        .eq("id", question.id);

      if (updateError) {
        console.error(
          `Error updating question ${question.title}:`,
          updateError
        );
      } else {
        console.log(`Successfully updated question ${question.title}`);
      }
    } catch (err) {
      console.error(`Error processing question ${question.title}:`, err);
    }
  }

  console.log("All questions updated successfully.");
} else {
  console.log("No questions found for the specified exam.");
}
