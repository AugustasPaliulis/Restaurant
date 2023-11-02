import Button from "@/components/button";
import Input from "@/components/input";
import InputButton from "@/components/input_button";
import Hero from "@/components/page_parts/hero";
import HomeAbout from "@/components/page_parts/home_about";
import HomeMenu from "@/components/page_parts/home_menu";
import HomeReview from "@/components/page_parts/review";
import WhyBest from "@/components/page_parts/why_best";
import HomepageLayout from "@/layouts/homepage";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function Home() {
  async function data() {
    const dishes = [
      "breakfast",
      "lunch",
      "dinner",
      "snack",
      "dessert",
      "drink",
    ];
    const meals = {};
    const promises = dishes.map(async (dish) => {
      const docRef = doc(db, "dishes", dish);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        meals[dish] = docSnap.data();
      }
    });

    await Promise.all(promises);

    return meals;
  }

  const meals = await data();
  return (
    <div>
      <HomepageLayout>
        <Hero />
        <HomeAbout />
        <WhyBest />
        <HomeMenu meals={meals} />
        <HomeReview />
      </HomepageLayout>
    </div>
  );
}
