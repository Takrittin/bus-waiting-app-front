"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    longdo: any;
  }
}

export default function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const existingScript = document.getElementById("longdo-map-script");

    const findBusStops = (map: any) => {
      // 1. Listen for search results first
      window.longdo.Event.bind("search", (result: any) => {
        if (result.data) {
          result.data.forEach((poi: any) => {
            const marker = new window.longdo.Marker(
              { lon: poi.lon, lat: poi.lat },
              {
                title: poi.name,
                detail: poi.address || "Bus Stop",
                icon: {
                  url: "https://mmmap15.longdo.com/mmmap/images/icons/bus.png",
                  offset: { x: 12, y: 45 },
                },
              }
            );
            map.Overlays.add(marker);
          });
        }
      });

      // 2. Trigger the search
      map.Search.search("bus stop", {
        limit: 100,
      });
    };

    const initMap = () => {
      if (window.longdo && mapRef.current && !mapInstance.current) {
        const map = new window.longdo.Map({
          placeholder: mapRef.current,
          zoom: 14,
          location: { lon: 100.5332, lat: 13.7367 }, // Bangkok
          ui: window.longdo.UiComponent.None,
        });

        mapInstance.current = map;

        // Ensure search runs once map is ready
        map.Event.bind("ready", () => {
          findBusStops(map);
        });
      }
    };

    if (existingScript) {
      // If script exists, just try to init (it might already be loaded)
      initMap();
    } else {
      const script = document.createElement("script");
      script.id = "longdo-map-script";
      script.src = `https://api.longdo.com/map/?key=${process.env.NEXT_PUBLIC_LONGDO_MAP_API_KEY}`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Alexandria Theme Overlay */}
      <div 
        className="absolute inset-0 bg-[#094cb2]/10 pointer-events-none mix-blend-color" 
        aria-hidden="true"
      />
    </div>
  );
}