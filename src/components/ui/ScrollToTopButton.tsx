"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center shadow-2xl hover:bg-cyan-600 hover:text-white transition-all duration-500 z-40 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
