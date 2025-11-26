"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Clock, Loader2, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findNearbyCenters, type Center } from '@/ai/flows/find-centers-flow';
import { Skeleton } from '@/components/ui/skeleton';

// Haversine formula to calculate distance between two lat/lng points
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 0.621371; // convert to miles
};

export function RecyclingLocator() {
  const [centers, setCenters] = useState<(Center & { distance: number })[]>([]);
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleFindNearby = () => {
    setLoading(true);
    setError(null);
    setCenters([]);
    setSearched(false);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError("Unable to retrieve your location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!userLocation) return;

    const fetchCenters = async () => {
      try {
        const foundCenters = await findNearbyCenters({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });

        const centersWithDistance = foundCenters
          .map(center => ({
            ...center,
            distance: getDistance(userLocation.latitude, userLocation.longitude, center.lat, center.lng)
          }));
        
        const sortedCenters = centersWithDistance.sort((a, b) => a.distance - b.distance);
        
        setCenters(sortedCenters);
      } catch (e) {
        console.error(e);
        setError("Could not find nearby recycling centers. Please try again.");
      } finally {
        setLoading(false);
        setSearched(true);
      }
    };

    fetchCenters();
  }, [userLocation]);

  return (
    <section id="locator" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Find a Recycling Center</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Prefer to drop off your e-waste? Find a convenient location near you.
          </p>
          <div className="mt-6">
            <Button size="lg" onClick={handleFindNearby} disabled={loading} className="rounded-full text-base py-6 px-8">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Finding Locations...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-5 w-5" />
                  Find Centers Near Me
                </>
              )}
            </Button>
          </div>
          {error && <p className="mt-4 text-destructive">{error}</p>}
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading && Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-4"><Skeleton className="h-40 w-full" /></Card>
            ))}

            {!loading && searched && centers.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-medium">No recycling centers found.</p>
                <p className="text-muted-foreground mt-2">Try adjusting your location or searching a wider area.</p>
              </div>
            )}
             {!loading && !searched && centers.length === 0 && !error && (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-medium">Ready to find a location?</p>
                <p className="text-muted-foreground mt-2">Click the button above to find recycling centers near you.</p>
              </div>
            )}
            {centers.map((center) => (
              <Card 
                key={center.id}
                className="w-full h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{center.name}</CardTitle>
                  <CardDescription className="font-semibold text-primary">
                      {center.distance.toFixed(1)} miles away
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between space-y-4 text-sm">
                  <div>
                      <div className="flex items-start text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                        <span>{center.address}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{center.hours}</span>
                      </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button asChild variant="outline" className="w-full">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2" /> View on Map
                        </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
