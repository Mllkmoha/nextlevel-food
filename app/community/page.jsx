import Image from 'next/image';

import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <h1>
            One shared passion: <span className={classes.highlight}>Food</span>
          </h1>
          <p>Join our global community and share your favorite culinary secrets!</p>
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes.contentWrapper}>
          <h2 className={classes.sectionTitle}>Community Perks</h2>
          <div className={classes.perksGrid}>
            <div className={classes.perkCard}>
              <div className={classes.iconWrapper}>
                <Image src={mealIcon} alt="A delicious meal" />
              </div>
              <h3>Share & Discover</h3>
              <p>Explore thousands of authentic recipes from foodies around the world.</p>
            </div>
            <div className={classes.perkCard}>
              <div className={classes.iconWrapper}>
                <Image src={communityIcon} alt="A crowd of people, cooking" />
              </div>
              <h3>Connect</h3>
              <p>Find new friends and like-minded people who share your passion for great food.</p>
            </div>
            <div className={classes.perkCard}>
              <div className={classes.iconWrapper}>
                <Image src={eventsIcon} alt="A crowd of people at a cooking event" />
              </div>
              <h3>Exclusive Events</h3>
              <p>Participate in virtual cooking classes and exclusive culinary events.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
