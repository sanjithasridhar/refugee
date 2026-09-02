import OtpLoginForm from "@/components/auth/OtpLoginForm";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
            <div className="w-full max-w-md p-8 bg-surface border border-border rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
                {/* Mounting your existing login component here */}
                <OtpLoginForm />
            </div>
        </div>
    );
}