"use client";

import { useActionState } from "react";

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, { message: null });
  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <h1>
            Share your <span className={classes.highlight}>favorite meal</span>
          </h1>
          <p>Join our community by contributing your own culinary masterpieces.</p>
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes.formWrapper}>
          <form className={classes.form} action={formAction}>
            <div className={classes.formGroup}>
              <div className={classes.row}>
                <div className={classes.field}>
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="e.g. Jane Doe" required />
                </div>
                <div className={classes.field}>
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" name="email" placeholder="jane@example.com" required />
                </div>
              </div>
              <div className={classes.field}>
                <label htmlFor="title">Meal Title</label>
                <input type="text" id="title" name="title" placeholder="e.g. Spicy Basil Pasta" required />
              </div>
              <div className={classes.field}>
                <label htmlFor="summary">Short Summary</label>
                <input type="text" id="summary" name="summary" placeholder="A brief description of the dish" required />
              </div>
              <div className={classes.field}>
                <label htmlFor="instructions">Cooking Instructions</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows="10"
                  placeholder="Step-by-step guide to creating this meal..."
                  required
                ></textarea>
              </div>
              <ImagePicker label="Meal Imagery" name="image" />
            </div>
            {state.message && (
              <div className={classes.message}>
                {state.message}
              </div>
            )}
            <div className={classes.actions}>
              <MealsFormSubmit />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
