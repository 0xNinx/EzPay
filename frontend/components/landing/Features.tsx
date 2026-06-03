'use client';

import { useEffect, useState } from 'react';

const features = [
  {
    title: 'QR Code Payments',
    description: 'Generate QR codes for instant stablecoin payments from customers.',
  },
  {
    title: 'Fiat Settlement',
    description: 'Receive payments directly in your bank account via Anchor infrastructure.',
  },
  {
    title: 'Unregistered Merchants',
    description: 'Pay any merchant by wallet address or bank details, no registration required.',
  },
  {
    title: 'Stellar Fast Settlement',
    description: '2-5 second transaction finality with extremely low fees.',
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose EzPay?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lightweight payment infrastructure for real-world usability and cross-border accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
