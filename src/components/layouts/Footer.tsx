import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative bg-[#191C24] text-[#8A93A5] pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#222631]">
      {/* Background Image Container with Rich Purple Glow Fallback */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.image2url.com/r2/default/images/1792066532856-594260d6-ff26-4de7-a36a-fd754140c0b4.avif'), radial-gradient(circle at 50% 20%, rgba(88, 28, 135, 0.4) 0%, rgba(25, 28, 36, 1) 70%)`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Top Call-to-Action Card */}
        <div className="bg-[#191C24] border border-[#222631] rounded-3xl p-8 sm:p-14 mb-16 text-center shadow-[-12px_-12px_28px_#222631,12px_12px_28px_#101217]">
          <div className="w-12 h-12 bg-[#191C24] text-[#d9a79c] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
            <span className="font-extrabold text-lg">S</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#CFD4DC] mb-3 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-sm text-[#8A93A5] max-w-lg mx-auto mb-8 leading-relaxed">
            Join thousands of shoppers who have already discovered curated
            products with our seamless store experience.
          </p>
          <Link
            to="/products"
            className="inline-flex cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-4 px-8 rounded-2xl text-sm shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all items-center justify-center gap-2"
          >
            Get Started →
          </Link>
        </div>

        {/* Bottom Multi-Column Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-10 border-t border-[#222631]">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="cursor-pointer bg-[#191C24] text-[#d9a79c] font-bold py-1.5 px-3 rounded-xl text-md shadow-[-4px_-4px_10px_#222631,4px_4px_10px_#101217] flex items-center justify-center">
                S
              </div>
              <span className="text-xl font-bold text-[#CFD4DC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                My Store
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#8A93A5]">
              A sleek and modern digital storefront designed to bring you the
              best online products with a smooth professional interface.
            </p>
            <p className="text-[11px] text-[#535C6D] pt-2">
              ©Designed & Developed by Saif
            </p>
          </div>

          {/* Pages Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#CFD4DC]">
              Pages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#d9a79c] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#CFD4DC]">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#changelog"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#licenses"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Licenses
                </a>
              </li>
              <li>
                <a
                  href="#styleguide"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Style Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#CFD4DC]">
              Social Media
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#d9a79c] transition-colors"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
