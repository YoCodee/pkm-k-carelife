"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Home, BookOpen, MessageCircle, ShoppingBag, ScanLine } from "lucide-react";
import { playSFX, triggerHaptic } from "@/lib/sfx";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/menu", icon: BookOpen, label: "Belajar" },
    { href: "/scan", icon: ScanLine, label: "Scan QR" },
    { href: "/chat", icon: MessageCircle, label: "Tanya AI" },
    { href: "/beli", icon: ShoppingBag, label: "Beli" },
  ];

  // Prefetch semua tab utama saat komponen dimuat (menghilangkan lag perpindahan halaman di HP)
  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/menu");
    router.prefetch("/scan");
    router.prefetch("/chat");
    router.prefetch("/beli");
  }, [router]);

  const handleNavClick = (href: string) => {
    if (pathname !== href) {
      playSFX("click");
      triggerHaptic("click");
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-[600px] z-50 px-6 pb-5">
      <nav className="bg-[#66B2B2] flex justify-around items-center py-3 px-3 rounded-[28px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => handleNavClick(item.href)}
            className={`flex items-center justify-center w-12 h-12 rounded-[12px] border-2 transition-[background-color,color,border-color,box-shadow] duration-200 ${
              isActive(item.href)
                ? "bg-[#FFD700] text-[#1A1A1A] border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]"
                : "text-white border-transparent hover:text-white/90"
            }`}
          >
            <item.icon size={22} strokeWidth={isActive(item.href) ? 2.5 : 2} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
