import Button from "@/components/button";
import Input from "@/components/input";
import InputButton from "@/components/input_button";
import Hero from "@/components/page_parts/hero";
import HomeAbout from "@/components/page_parts/home_about";
import HomeMenu from "@/components/page_parts/home_menu";
import WhyBest from "@/components/page_parts/why_best";
import HomepageLayout from "@/layouts/homepage";

export default function Home() {
  return (
    <div>
      <HomepageLayout>
        <Hero />
        <HomeAbout />
        <WhyBest />
        <HomeMenu />
      </HomepageLayout>
    </div>
  );
}
