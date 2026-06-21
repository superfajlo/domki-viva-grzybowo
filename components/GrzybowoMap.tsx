"use client";

import { CONTACT } from "@/lib/site";
import { useEffect, useRef } from "react";
import "./grzybowo-map.css";

const LOT: [number, number] = [54.1609915, 15.4900945];
const MAP_CENTER: [number, number] = [54.1605, 15.4915];
const MARKER_IMG = "/images/mapa/domki-viva-marker.webp";
const POPUP_IMG = "/images/mapa/domki-viva-popup.webp";

export function GrzybowoMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: import("leaflet").Map | null = null;
    let resizeTimer: number | undefined;

    void (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      map = L.map(container, {
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "viva-house-marker",
        html: `<img src="${MARKER_IMG}" width="64" height="64" alt="" />`,
        iconSize: [64, 64],
        iconAnchor: [32, 56],
      });

      const marker = L.marker(LOT, { icon: markerIcon }).addTo(map);

      marker.bindTooltip("Domki Viva", {
        permanent: true,
        direction: "top",
        offset: [0, -28],
        className: "viva-tooltip",
      });

      marker.bindPopup(`
        <div class="house-popup">
          <img
            class="house-thumb"
            src="${POPUP_IMG}"
            alt="Domki Viva"
          />
          <div class="house-text">
            <div class="house-title">Domki Viva</div>
            <div class="house-subtitle">${CONTACT.address}, Grzybowo</div>
          </div>
        </div>
      `);

      map.setView(MAP_CENTER, 15);
      resizeTimer = window.setTimeout(() => map?.invalidateSize(), 100);
    })();

    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      map?.remove();
    };
  }, []);

  return (
    <div
      id="grzybowo-map"
      ref={containerRef}
      role="region"
      aria-label="Mapa interaktywna – lokalizacja Domków Viva w Grzybowie"
    />
  );
}
