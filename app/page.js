import Link from "next/link";

import ImageSlideshow from "@/components/images/image-slideshow";
import classes from "./page.module.css";

export default async function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.heroContainer}>
          <div className={classes.slideshow}>
            <ImageSlideshow />
          </div>
          <div className={classes.heroContent}>
            <h1 className={classes.title}>
              NextLevel Food <br />
              <span className={classes.highlight}>for NextLevel Foodies</span>
            </h1>
            <p className={classes.subtitle}>
              Taste & share food from all over the world. Join a global community of culinary enthusiasts.
            </p>
            <div className={classes.cta}>
              <Link href="/meals" className={classes.primaryBtn}>Explore Meals</Link>
              <Link href="/community" className={classes.secondaryBtn}>Join the Community</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className={classes.infoSection}>
          <div className={classes.sectionHeader}>
            <h2>How it works</h2>
            <div className={classes.divider}></div>
          </div>
          <div className={classes.featureGrid}>
            <div className={classes.featureCard}>
              <h3>Discover</h3>
              <p>
                Explore a curated collection of delicious meals shared by our community.
                Find inspiration for your next meal from diverse culinary traditions.
              </p>
            </div>
            <div className={classes.featureCard}>
              <h3>Cook</h3>
              <p>
                Follow simple, step-by-step instructions to recreate these amazing dishes in your own kitchen.
              </p>
            </div>
            <div className={classes.featureCard}>
              <h3>Share</h3>
              <p>
                Upload your own favorite recipes and inspire others. Become a part of the global food conversation.
              </p>
            </div>
          </div>
        </section>

        <section className={classes.infoSection}>
          <div className={classes.sectionHeader}>
            <h2>Why NextLevel Food?</h2>
            <div className={classes.divider}></div>
          </div>
          <div className={classes.featureGrid}>
            <div className={classes.featureCard}>
              <h3>Authentic Recipes</h3>
              <p>
                Our meals are shared by real people, ensuring you get authentic tastes and home-cooked secrets.
              </p>
            </div>
            <div className={classes.featureCard}>
              <h3>Global Community</h3>
              <p>
                Connect with food lovers from every corner of the globe and exchange cultural flavors.
              </p>
            </div>
            <div className={classes.featureCard}>
              <h3>Culinary Growth</h3>
              <p>
                Expand your cooking skills and palate by trying new ingredients and techniques every day.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
