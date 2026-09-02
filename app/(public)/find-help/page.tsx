"use client";
import { createClient } from "@/lib/supabaseClient";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type LocationState = { lat: number; lng: number } | null;
type Place = { place_id: string; name: string; vicinity: string; geometry: { location: { lat: number; lng: number } } };

const CATEGORIES = [
    { id: 'hospital', label: 'Hospitals / Clinics' },
    { id: 'food', label: 'Food & Water' },
    { id: 'shelter', label: 'Shelters' },
    { id: 'ngo', label: 'NGOs & Support' },
    { id: 'legal', label: 'Legal Aid' },
];

export default function FindHelpPage() {
    const [location, setLocation] = useState<LocationState>(null);
    const [locError, setLocError] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [results, setResults] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const requestLocation = () => {
        setIsLocating(true);
        setLocError(null);

        if (!navigator.geolocation) {
            setLocError("Location services are not supported by your browser.");
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsLocating(false);
            },
            () => {
                setLocError("We need your location to find nearby help. Please enable location permissions.");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const searchCategory = async (categoryId: string) => {
        if (!location) return;

        setActiveCategory(categoryId);
        setIsLoading(true);
        setResults([]);

        try {
            const res = await fetch(`/api/nearby?lat=${location.lat}&lng=${location.lng}&type=${categoryId}`);
            const data = await res.json();

            if (res.ok) {
                setResults(data.results || []);
            } else {
                console.error(data.error);
            }
        } catch {
            console.error("Failed to fetch results.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (place: Place) => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("You must be logged in to save a location.");
            return;
        }

        const { error } = await supabase
            .from('saved_locations')
            .insert({
                user_id: user.id,
                place_name: place.name,
                vicinity: place.vicinity,
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
                category: "help"
            });

        if (error) {
            console.error("Database error:", error.message);
            alert(`Failed to save location: ${error.message}`);
        } else {
            alert("Location officially saved to database!");
        }
    };

    return (
        <main className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-heading font-bold text-primary">Find Nearby Help</h1>

            {!location ? (
                <Card className="text-center py-10 space-y-4">
                    <h2 className="text-xl font-semibold">Share your location to see what is nearby</h2>
                    <p className="text-text-secondary max-w-md mx-auto">
                        Your location is only used to find services near you right now. It is not continuously tracked.
                    </p>
                    {locError && <p className="text-error text-sm">{locError}</p>}
                    <Button onClick={requestLocation} disabled={isLocating}>
                        {isLocating ? "Locating..." : "Allow Location Access"}
                    </Button>
                </Card>
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={activeCategory === cat.id ? "primary" : "secondary"}
                                onClick={() => searchCategory(cat.id)}
                            >
                                {cat.label}
                            </Button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {isLoading && <p className="text-text-secondary">Searching nearby...</p>}

                        {!isLoading && activeCategory && results.length === 0 && (
                            <p className="text-text-secondary">No results found within 5km.</p>
                        )}

                        {results.map((place, index) => (
                            <Card key={place.place_id || index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-4 border rounded">
                                <div>
                                    <h3 className="font-semibold text-lg">{place.name}</h3>
                                    <p className="text-text-secondary text-sm">{place.vicinity}</p>
                                </div>

                                <button
                                    onClick={() => handleSave(place)}
                                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                                >
                                    Save
                                </button>

                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}