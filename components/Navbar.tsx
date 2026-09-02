"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email || null);
            }
        };
        checkUser();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUserEmail(null);
        router.push("/login");
    };

    return (
        <nav className="w-full border-b border-gray-200 bg-white py-4 px-6 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-6">
                <Link href="/find-help" className="font-bold text-xl text-primary">
                    RefugeeSupport
                </Link>
                <div className="hidden sm:flex gap-4">
                    <Link href="/find-help" className="text-sm font-medium text-gray-600 hover:text-primary">
                        Find Help
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary">
                        My Dashboard
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {userEmail ? (
                    <>
                        <span className="text-xs text-gray-500 hidden md:inline">{userEmail}</span>
                        <Button variant="secondary" onClick={handleLogout} className="text-sm py-1 px-3">
                            Log Out
                        </Button>
                    </>
                ) : (
                    <Link href="/login">
                        <Button variant="primary" className="text-sm py-1 px-3">
                            Log In
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}