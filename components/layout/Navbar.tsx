"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/index.html" || pathname.endsWith("/index.html") || pathname === "/index";
    }
    const cleanPathname = pathname.replace(/\.html$/, "").replace(/\/$/, "");
    const cleanPath = path.replace(/\/$/, "");
    return cleanPathname === cleanPath || cleanPathname.endsWith(cleanPath);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 font-black text-xl"
          >
            <img
              src="/logo-carelife.png"
              alt="CareLife Logo"
              className="w-8 h-8 object-contain rounded-[6px] bg-white p-0.5 border border-[#1A1A1A]"
            />
            <span>CareLife</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`transition-opacity ${isActive("/") ? "opacity-100 border-b-2" : "opacity-75 hover:opacity-100"}`}
            >
              Beranda
            </Link>
            <Link
              href="/menu"
              className={`transition-opacity ${isActive("/menu") ? "opacity-100 border-b-2" : "opacity-75 hover:opacity-100"}`}
            >
              Belajar
            </Link>
            <Link
              href="/chat"
              className={`transition-opacity ${isActive("/chat") ? "opacity-100 border-b-2" : "opacity-75 hover:opacity-100"}`}
            >
              Tanya AI
            </Link>
            <Link
              href="/about"
              className={`transition-opacity ${isActive("/about") ? "opacity-100 border-b-2" : "opacity-75 hover:opacity-100"}`}
            >
              Tentang
            </Link>
          </div>

          <Link
            href="/beli"
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            Beli Buku
          </Link>
        </div>
      </div>
    </nav>
  );
}
