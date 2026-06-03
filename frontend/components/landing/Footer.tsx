'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">EzPay</h3>
            <p className="text-muted-foreground text-sm">Lightweight Stellar payment infrastructure for stablecoin payments with fiat settlement.</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors duration-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors duration-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-foreground transition-colors duration-300">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-300">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors duration-300">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} EzPay. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
