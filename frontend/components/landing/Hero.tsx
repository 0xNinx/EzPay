'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1
          className={`text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Pay with Stablecoins
          <span className="block text-accent mt-2">Receive in Crypto or Fiat</span>
        </h1>

        <p
          className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Lightweight payment infrastructure on Stellar. Accept stablecoin payments via QR codes and links, with direct bank settlement for merchants.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            href="/register"
            className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted hover:border-accent transition-all duration-300"
          >
            How It Works
          </a>
        </div>

        <div
          className={`mt-16 grid grid-cols-3 gap-4 md:gap-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="p-4 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-foreground">2-5s</div>
            <div className="text-sm text-muted-foreground mt-1">Settlement Time</div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-foreground">&lt;0.01%</div>
            <div className="text-sm text-muted-foreground mt-1">Transaction Fee</div>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-foreground">Global</div>
            <div className="text-sm text-muted-foreground mt-1">Cross-Border</div>
          </div>
        </div>
      </div>
    </section>
  );
}
