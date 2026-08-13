
"use client";

import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import AppImage from "@/components/AppImage";
import {
  CloudUpload,
  ChevronDown,
  Menu,
  X,
  User,
  FolderOpen,
  LogOut,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
  setActiveTab?: (tab: string) => void;
  initialTab?: string;
}

export default function Navbar({
  user,
  setActiveTab,
  initialTab,
}: NavbarProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setActiveTabState] = useState(initialTab || "files");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  const userDetails = {
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((n) => n?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",

    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",

    email: user?.emailAddress || "Cloud Storage Account",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((p) => !p);
  };

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    signOut(() => router.push("/sign-in"));
  };

  const switchTab = (tab: string, url: string) => {
    setActiveTabState(tab);
    setActiveTab?.(tab);
    router.replace(url);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`sticky top-4 z-50 mx-4 md:mx-6 px-3 transition-all duration-300 rounded-[28px] border border-white/[0.08] shadow-2xl shadow-black/30 relative overflow-visible ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-2xl"
            : "bg-zinc-950/50 backdrop-blur-xl"
        }`}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-indigo-500/[0.12] blur-3xl rounded-full" />

          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-sky-500/[0.10] blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between py-3.5 px-3 md:px-4">
          {/* ================= LOGO ================= */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push("/dashboard")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/30 blur-lg rounded-2xl group-hover:bg-indigo-500/50 transition-all duration-300" />

              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <CloudUpload className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="leading-tight">
              <h1 className="text-white font-bold text-lg tracking-tight">
                Droply
              </h1>

              <p className="text-[11px] text-white/40">
                Cloud Storage
              </p>
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              {/* Sign In */}
              <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/80 text-sm font-medium hover:bg-white/[0.07] hover:text-white transition-all duration-200"
              >
                Sign In
              </button>

              {/* Sign Up */}
              <button
                onClick={() => router.push("/sign-up")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-200"
              >
                Sign Up
              </button>
            </SignedOut>

            <SignedIn>
              {/* ================= PROFILE ================= */}
              <div ref={dropdownRef} className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setIsDropdownOpen((p) => !p)}
                  className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-2xl border transition-all duration-200 ${
                    isDropdownOpen
                      ? "bg-white/[0.08] border-white/[0.14]"
                      : "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md" />

                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/[0.12] bg-zinc-800">
                      {user?.imageUrl ? (
                        <AppImage
                          src={user.imageUrl}
                          width={36}
                          height={36}
                          alt="user"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-indigo-500 to-violet-600">
                          {userDetails.initials}
                        </div>
                      )}
                    </div>

                    {/* Online indicator */}
                    <span className="absolute bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950" />
                  </div>

                  {/* Name */}
                  <div className="hidden lg:block text-left max-w-[140px]">
                    <p className="text-white text-sm font-medium truncate">
                      {userDetails.displayName}
                    </p>

                    <div className="text-white/40 text-[10px] truncate">
                      {userDetails.email}
                    </div>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-[280px] rounded-2xl border border-white/[0.10] bg-zinc-950/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden z-[99999] animate-in fade-in slide-in-from-top-2 duration-200">
                    

                    {/* Menu */}
                    <div className="p-2">
                      {/* Profile */}
                      <button
                        onClick={() =>
                          switchTab("profile", "/dashboard?tab=profile")
                        }
                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.06] transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                          <User className="w-4 h-4 text-white/60 group-hover:text-indigo-400 transition-colors" />
                        </div>

                        <div>
                          <p className="text-white/90 text-sm font-medium">
                            Profile
                          </p>

                          <p className="text-white/30 text-[11px]">
                            Manage your account
                          </p>
                        </div>
                      </button>

                      {/* My Files */}
                      <button
                        onClick={() => switchTab("files", "/dashboard")}
                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.06] transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                          <FolderOpen className="w-4 h-4 text-white/60 group-hover:text-indigo-400 transition-colors" />
                        </div>

                        <div>
                          <p className="text-white/90 text-sm font-medium">
                            My Files
                          </p>

                          <p className="text-white/30 text-[11px]">
                            Browse your cloud files
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div className="p-2 border-t border-white/[0.07]">
                      <button
                        onClick={handleSignOut}
                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-red-500/[0.08] transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-red-500/[0.08] border border-red-500/[0.10] flex items-center justify-center">
                          <LogOut className="w-4 h-4 text-red-400" />
                        </div>

                        <div>
                          <p className="text-red-400 text-sm font-medium">
                            Sign Out
                          </p>

                          <p className="text-red-400/40 text-[11px]">
                            Sign out of Droply
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </SignedIn>
          </div>

          {/* ================= MOBILE BUTTONS ================= */}
          <div className="md:hidden flex items-center gap-2">
            <SignedIn>
              {/* Mobile Avatar */}
              <button
                onClick={toggleMobileMenu}
                className="relative"
              >
                <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-xl" />

                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/[0.12] bg-zinc-800">
                  {user?.imageUrl ? (
                    <AppImage
                      src={user.imageUrl}
                      width={36}
                      height={36}
                      alt="user"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-indigo-500 to-violet-600">
                      {userDetails.initials}
                    </div>
                  )}
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950" />
              </button>
            </SignedIn>

            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.07] transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE PORTAL ================= */}
      {mounted &&
        createPortal(
          <>
            {/* BACKDROP */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 w-screen h-dvh bg-black/70 backdrop-blur-sm z-[9998] md:hidden animate-in fade-in duration-200"
                onClick={toggleMobileMenu}
              />
            )}

            {/* ================= MOBILE MENU ================= */}
            <div
              className={`fixed top-0 right-0 h-dvh w-[86%] max-w-[360px] bg-zinc-950/95 backdrop-blur-2xl border-l border-white/[0.08] z-[9999] transform transition-transform duration-300 ease-out md:hidden ${
                isMobileMenuOpen
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/[0.10] blur-3xl rounded-full pointer-events-none" />

              <div className="relative h-full flex flex-col">
                {/* ================= MOBILE HEADER ================= */}
                <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <CloudUpload className="w-4 h-4 text-white" />
                    </div>

                    <div>
                      <h2 className="text-white font-bold text-base">
                        Droply
                      </h2>

                      <p className="text-white/30 text-[10px]">
                        Cloud Storage
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={toggleMobileMenu}
                    className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* ================= USER CARD ================= */}
                <SignedIn>
                  <div className="p-5">
                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4">
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" />

                      <div className="relative flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/[0.12] bg-zinc-800">
                            {user?.imageUrl ? (
                              <AppImage
                                src={user.imageUrl}
                                width={48}
                                height={48}
                                alt="user"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-base font-bold text-white bg-gradient-to-br from-indigo-500 to-violet-600">
                                {userDetails.initials}
                              </div>
                            )}
                          </div>

                          <span className="absolute bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-zinc-950" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-white font-semibold text-sm truncate">
                            {userDetails.displayName}
                          </p>

                          <div className="flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3 text-white/30" />

                            <div className="text-white/40 text-xs truncate">
                              {userDetails.email}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </SignedIn>

                {/*  MENU  */}
                <div className="px-5 space-y-2">
                  <SignedOut>
                    <button
                      onClick={() => {
                        toggleMobileMenu();
                        router.push("/sign-in");
                      }}
                      className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] transition-all"
                    >
                      Sign In
                    </button>

                    <button
                      onClick={() => {
                        toggleMobileMenu();
                        router.push("/sign-up");
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20"
                    >
                      Sign Up
                    </button>
                  </SignedOut>

                  <SignedIn>
                    {/* My Files */}
                    <button
                      onClick={() => {
                        switchTab("files", "/dashboard");
                      }}
                      className="group w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.10] transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center">
                        <FolderOpen className="w-4 h-4 text-indigo-400" />
                      </div>

                      <div className="text-left">
                        <p className="text-white/90 text-sm font-medium">
                          My Files
                        </p>

                        <p className="text-white/30 text-[11px]">
                          Browse your files
                        </p>
                      </div>
                    </button>

                    {/* Profile */}
                    <button
                      onClick={() => {
                        toggleMobileMenu();
                        switchTab(
                          "profile",
                          "/dashboard?tab=profile"
                        );
                      }}
                      className="group w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.10] transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-400" />
                      </div>

                      <div className="text-left">
                        <p className="text-white/90 text-sm font-medium">
                          Profile
                        </p>

                        <p className="text-white/30 text-[11px]">
                          Manage your account
                        </p>
                      </div>
                    </button>
                  </SignedIn>
                </div>

                {/*  BOTTOM  */}
                <div className="mt-auto p-5 border-t border-white/[0.07]">
                  <SignedIn>
                    <button
                      onClick={handleSignOut}
                      className="group w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/[0.05] border border-red-500/[0.08] hover:bg-red-500/[0.10] transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-500/[0.08] border border-red-500/[0.10] flex items-center justify-center">
                        <LogOut className="w-4 h-4 text-red-400" />
                      </div>

                      <div className="text-left">
                        <p className="text-red-400 text-sm font-medium">
                          Sign Out
                        </p>

                        <p className="text-red-400/40 text-[11px]">
                          Sign out of Droply
                        </p>
                      </div>
                    </button>
                  </SignedIn>

                  <p className="text-center text-white/20 text-[10px] mt-5">
                    Droply • Secure Cloud Storage
                  </p>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}