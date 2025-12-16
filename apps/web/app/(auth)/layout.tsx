// app/(auth)/layout.tsx
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                {/* This renders the Login or Signup page content */}
                {children}
            </div>
        </div>
    )
}