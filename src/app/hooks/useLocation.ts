import { useState, useEffect } from "react";

export interface UserLocation {
  status: "idle" | "loading" | "granted" | "denied" | "unavailable";
  countryCode: string | null;
  regionName: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

const REGION_MAP: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  AU: "Australia",
  CA: "Canada",
  IE: "Ireland",
  NZ: "New Zealand",
  IN: "India",
  SG: "Singapore",
  ZA: "South Africa",
  // Fallback — everything else shows "International" first
};

// Use ip-api.com (free, no key needed, returns country code)
async function fetchGeoByIP(): Promise<{ country: string; countryCode: string; city: string; regionName: string } | null> {
  try {
    const res = await fetch("https://ip-api.com/json/?fields=country,countryCode,city,regionName", {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>({
    status: "idle",
    countryCode: null,
    regionName: null,
    city: null,
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    // First try IP-based geolocation (no permission needed)
    setLocation((prev) => ({ ...prev, status: "loading" }));

    fetchGeoByIP().then((geo) => {
      if (geo) {
        setLocation({
          status: "granted",
          countryCode: geo.countryCode,
          regionName: geo.regionName || null,
          city: geo.city || null,
          latitude: null,
          longitude: null,
        });
      } else {
        setLocation((prev) => ({ ...prev, status: "unavailable" }));
      }
    });
  }, []);

  const requestPreciseLocation = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, status: "unavailable" }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
      },
      () => {
        // Permission denied — that's fine, IP location still works
      }
    );
  };

  const getServiceRegion = (): string => {
    if (!location.countryCode) return "All Regions";
    return REGION_MAP[location.countryCode] || "International";
  };

  return { location, requestPreciseLocation, getServiceRegion };
}
