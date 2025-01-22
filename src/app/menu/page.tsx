
import Dessert from "@/components/MenuPages/Dessert";
import Drink from "@/components/MenuPages/Drinks";
import Experience from "@/components/MenuPages/Experience";
import MainCours from "@/components/MenuPages/MainCourse";
import StarterMenu from "@/components/MenuPages/StartMenu";
import PartnersAndClients from "@/components/MenuPages/PartnerClient";
import Hero from "@/components/MenuPages/MenuHero";

export default function Menu() {
  return (
<div>
  <Hero/>
  <StarterMenu/>
  <MainCours/>
  <Experience/>
  <Dessert/>
  <Drink/>	
  <PartnersAndClients/>
</div>
  );
}