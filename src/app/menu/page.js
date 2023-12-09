import Menu from "@/components/page_parts/menu";
import MenuHero from "@/components/page_parts/menu_hero";

import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function MenuPage() {
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
      <MenuHero />
      <Menu meals={meals} />
    </div>
  );
}
