import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function VirtualVarna() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [43.2141, 27.9147],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);

    L.marker([43.2141, 27.9147])
      .addTo(map)
      .bindPopup("<b>Varna</b><br>Welcome to Virtual Varna!");

    L.marker([43.2021, 27.9219])
      .addTo(map)
      .bindPopup(
        "<b>Sea Garden</b><br>One of Varna's most famous parks."
      );

    L.marker([43.2078, 27.9176])
      .addTo(map)
      .bindPopup(
        "<b>Varna Cathedral</b><br>Dormition of the Mother of God Cathedral."
      );

    L.marker([43.2048, 27.9222])
      .addTo(map)
      .bindPopup(
        "<b>Varna Beach</b><br>The central beach area."
      );

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col p-6">
      <div className="mb-5">
        <p className="text-sm font-medium text-cyan-400">
          AETHER CITY
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          Virtual Varna
        </h1>

        <p className="mt-2 text-zinc-400">
          Explore Varna on an interactive map.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-zinc-800">
        <div
          ref={mapRef}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}