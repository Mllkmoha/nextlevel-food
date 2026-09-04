import { getSupabase } from "./supabase";
import slugify from "slugify";
import xss from "xss";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

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

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

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

  meal.image = publicUrlData.publicUrl;

  const { error: insertError } = await supabase
    .from("meals")
    .insert({
      title: meal.title,
      slug: meal.slug,
      image: meal.image,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
    });

  if (insertError) {
    throw new Error(`Saving meal failed: ${insertError.message}`);
  }
}