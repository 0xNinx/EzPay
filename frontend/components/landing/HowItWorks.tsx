'use client';

import { useEffect, useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Register & Generate',
    description: 'Create your merchant account and generate payment links or QR codes.',
  },
  {
    number: 2,
    title: 'Customer Pays',
    description: 'Customers pay with stablecoins via QR code, link, or wallet address.',
  },
  {
    number: 3,
    title: 'Receive Funds',
    description: 'Settlement completes in 2-5 seconds to your wallet or bank account.',
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            How It Works
          </h2>
          <p
            className={`text-lg text-muted-foreground transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Accept stablecoin payments in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center font-bold text-lg mb-4 mx-auto hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
