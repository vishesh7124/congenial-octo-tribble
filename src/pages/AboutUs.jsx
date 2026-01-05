import { TopNavOverlay } from "../components/TopNavOverlay";
import RetroGlassCard from "../components/GlassCard";
import { competitionsData } from "../utils/AboutUsData.js";
import Footer from "../components/footer";

export function Competitions() {
  return (
    <div
      className="min-h-screen bg-black text-pink-400 bg-cover bg-center"
      style={{
        backgroundImage: "url('/AboutUs/background.png')",
        backgroundAttachment: "fixed",
      }}
    >
      <TopNavOverlay />

      <div className="pt-40">
        {competitionsData.map((item) => (
          <RetroGlassCard
            key={item.id}
            title={item.title}
            text={item.text}
            image={item.image}
            imagePosition={item.imagePosition}
          />
        ))}
      </div>

      <Footer></Footer>
    </div>
  );
}