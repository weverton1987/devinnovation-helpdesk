import { DashboardHeader } from "./components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen w-full mx-auto max-w-7xl">
            <header className="bg-gray-800 text-white p-4 rounded">
                <DashboardHeader />
            </header>
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}
