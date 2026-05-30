import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Mail, Phone, ExternalLink, GraduationCap, Briefcase, Code, FolderGit, Cpu, Layers } from "lucide-react";
import { PERSONAL_DETAILS } from "../data";

interface NavbarProps {
  onOpenQuickContact: () => void;
  onOpenSandbox: () => void;
}

export default function Navbar({ onOpenQuickContact, onOpenSandbox }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple implementation to track active section
      const sections = ["home", "about", "skills", "projects", "experience", "education", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Cpu },
    { id: "about", label: "About", icon: Layers },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FolderGit },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020617]/90 backdrop-blur-md border-b border-emerald-500/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 text-left group transition-all"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-lg blur-md opacity-45 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative h-10 w-10 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center font-display font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  BP
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-none tracking-tight">
                  {PERSONAL_DETAILS.name}
                </span>
                <span className="font-mono text-[10px] text-emerald-400/80 block mt-0.5">
                  SOFTWARE SUPPORT & DEV
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-display text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={onOpenSandbox}
              className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg font-display text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-200 cursor-pointer"
            >
              <Cpu className="h-4 w-4 text-amber-400 animate-pulse shrink-0" />
              Sandbox
            </button>
            <button
              onClick={onOpenQuickContact}
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-display text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all duration-200 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              Connect
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenQuickContact}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-display text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Connect
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-800/80 bg-[#0d1321] overflow-hidden"
          >
            <div className="px-3 pt-3 pb-6 space-y-1 sm:px-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left font-display text-base font-medium transition-all ${
                      activeSection === item.id
                        ? "text-emerald-400 bg-emerald-500/10 border-l-4 border-emerald-500"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-emerald-400" />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenSandbox();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left font-display text-base font-medium text-amber-400 hover:bg-slate-800/30 cursor-pointer"
              >
                <Cpu className="h-5 w-5 text-amber-400 animate-pulse shrink-0" />
                <span>Diagnostics Sandbox</span>
              </button>
              <div className="pt-4 border-t border-slate-800/60 flex flex-col gap-2.5 px-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{PERSONAL_DETAILS.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{PERSONAL_DETAILS.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
