import { getSupabase } from "./supabase";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Failed to fetch meals");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // throw new Error("Failed to fetch meal");
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  const supabase = getSupabase();
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  const { error } = await supabase.storage
    .from("meals-images")
    .upload(fileName, bufferedImage, {
      contentType: meal.image.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Saving image failed: ${error.message}`);
  }

  const { data } = supabase.storage.from("meals-images").getPublicUrl(fileName);

  meal.image = data.publicUrl;

  db.prepare(
    `
      INSERT INTO meals (
        title,
        slug,
        image,
        summary,
        instructions,
        creator,
        creator_email
      )
      VALUES (
        @title,
        @slug,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
      )
    `,
  ).run(meal);
}
