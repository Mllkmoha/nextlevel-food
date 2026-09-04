"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals.jsx";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return typeof text !== "string" || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title")?.trim(),
    summary: formData.get("summary")?.trim(),
    instructions: formData.get("instructions")?.trim(),
    image: formData.get("image"),
    creator: formData.get("name")?.trim(),
    creator_email: formData.get("email")?.trim(),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0 ||
    !["image/jpeg", "image/png", "image/webp"].includes(meal.image.type) ||
    meal.image.size > 5 * 1024 * 1024
  ) {
    return { message: "Please complete all fields and upload a JPEG, PNG, or WebP image smaller than 5 MB." };
  }

  try {
    await saveMeal(meal);
  } catch (error) {
    console.error("Failed to save meal:", error);
    return { message: "We could not save your meal. Please try again." };
  }

  revalidatePath("/meals");
  redirect("/meals");
}
