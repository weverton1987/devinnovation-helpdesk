'use client'
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-100 py-4">
            <div className="container mx-auto text-center">
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()}{" "}
                    <Link href="https://www.instagram.com/dev_innovation/" className="text-blue-500 hover:underline">
                        Dev Innovation
                    </Link>
                    . Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
