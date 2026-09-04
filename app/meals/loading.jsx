import classes from "./loading.module.css";

export default function MealsLoadingPage() {
  return (
    <div className={classes.loading}>
      <span className={classes.spinner} />
      <p>Loading meals...</p>
    </div>
  );
}