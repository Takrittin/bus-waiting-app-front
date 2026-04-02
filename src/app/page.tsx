import MapContainer from "@/components/MapContainer";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import ArrivalCard from "@/components/ArrivalCard";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-white selection:bg-[#d6e2fb]">
      {/* Map Background Layer */}
      <MapContainer />
      
      {/* UI Elements Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 font-sans">
        {/* Enable pointer events for actual UI elements */}
        <div className="pointer-events-auto">
          <TopNav />
          <Sidebar />
          <ArrivalCard />
        </div>
      </div>
    </main>
  );
}
