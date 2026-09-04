import { getSupabase } from "./supabase";
import { randomUUID } from "node:crypto";
import slugify from "slugify";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function getMeals() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("meals")
    .select("*");

  if (error) {
    throw new Error(`Failed to fetch meals: ${error.message}`);
  }

  return data;
}

export async function getMeal(slug) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("meals")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return undefined;
    }

    throw new Error(`Failed to fetch meal: ${error.message}`);
  }

  return data;
}

export async function saveMeal(meal) {
  const supabase = getSupabase();
  const imageExtension = IMAGE_TYPES[meal.image?.type];

  if (!imageExtension || meal.image.size === 0) {
    throw new Error("Please upload a JPEG, PNG, or WebP image.");
  }

  if (meal.image.size > MAX_IMAGE_SIZE) {
    throw new Error("Please upload an image smaller than 5 MB.");
  }

  const slug = slugify(meal.title, { lower: true, strict: true });
  if (!slug) {
    throw new Error("Please provide a meal title containing letters or numbers.");
  }

  const fileName = `${slug}-${randomUUID()}.${imageExtension}`;

  const bufferedImage = Buffer.from(await meal.image.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("meals-images")
    .upload(fileName, bufferedImage, {
      contentType: meal.image.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Saving image failed: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("meals-images")
    .getPublicUrl(fileName);

  const imageUrl = publicUrlData.publicUrl;

  const { error: insertError } = await supabase
    .from("meals")
    .insert({
      title: meal.title,
      slug,
      image: imageUrl,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
    });

  if (insertError) {
    await supabase.storage.from("meals-images").remove([fileName]);
    throw new Error(`Saving meal failed: ${insertError.message}`);
  }
}