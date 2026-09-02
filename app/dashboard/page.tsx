"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type SavedLocation = {
    id: string;
    place_name: string;
    vicinity: string;
    lat: number;
    lng: number;
    category: string;
    created_at: string;
};

export default function DashboardPage() {
    const [locations, setLocations] = useState<SavedLocation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const fetchSavedLocations = async () => {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            setErrorMsg("You must be logged in to view your saved locations.");
            setIsLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("saved_locations")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch error:", error.message);
            setErrorMsg("Failed to load saved locations.");
        } else {
            setLocations(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSavedLocations();
    }, []);

    const handleDelete = async (id: string) => {
        const supabase = createClient();
        const { error } = await supabase
            .from("saved_locations")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Delete error:", error.message);
            alert("Failed to delete location.");
        } else {
            // Remove it locally from state so the UI updates instantly
            setLocations(locations.filter((loc) => loc.id !== id));
        }
    };

    return (
        <main className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-heading font-bold text-primary">Your Saved Locations</h1>

            {isLoading && <p className="text-text-secondary">Loading your saved places...</p>}

            {errorMsg && <p className="text-error">{errorMsg}</p>}

            {!isLoading && !errorMsg && locations.length === 0 && (
                <Card className="text-center py-10">
                    <p className="text-text-secondary">You haven't saved any locations yet. Go to Find Help to bookmark spots.</p>
                </Card>
            )}

            <div className="space-y-4">
                {locations.map((loc) => (
                    <Card key={loc.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border rounded">
                        <div>
                            <h3 className="font-semibold text-lg">{loc.place_name}</h3>
                            <p className="text-text-secondary text-sm">{loc.vicinity}</p>
                            <span className="text-xs text-gray-500">Saved on: {new Date(loc.created_at).toLocaleDateString()}</span>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => handleDelete(loc.id)}
                            className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1"
                        >
                            Delete
                        </Button>
                    </Card>
                ))}
            </div>
        </main>
    );
}