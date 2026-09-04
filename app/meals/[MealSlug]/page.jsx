import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";

export async function generateMetadata({ params }) {
  const { MealSlug } = await params;
  const meal = getMeal(MealSlug);
  if (!meal) {
    return notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailPage({ params }) {
  const { MealSlug } = await params;
  const meal = getMeal(MealSlug);

  if (!meal) {
    return notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <div className={classes.container}>
        <header className={classes.header}>
          <div className={classes.imageWrapper}>
            <Image src={meal.image} alt={meal.title} fill className={classes.image} />
          </div>
          <div className={classes.headerText}>
            <h1 className={classes.title}>{meal.title}</h1>
            <p className={classes.creator}>
              Created by{" "}
              <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            </p>
            <p className={classes.summary}>{meal.summary}</p>
          </div>
        </header>
        <main className={classes.main}>
          <div className={classes.contentWrapper}>
            <h2 className={classes.sectionTitle}>Instructions</h2>
            <p
              className={classes.instructions}
              dangerouslySetInnerHTML={{ __html: meal.instructions }}
            ></p>
          </div>
        </main>
      </div>
    </>
  );
}
