import Logo from './Logo';

export default function Footer() {
  return (
    <>
      {/* Top Gradient Section */}
      <div className="w-full bg-gradient-to-b from-black to-indigo-800 flex flex-col items-center justify-center px-6 py-12 md:py-20">
        <h1 className="text-white text-[32px] sm:text-[40px] md:text-[96px] font-['Cormorant_SC'] leading-tight text-center uppercase tracking-wide">
          <span className="font-semibold">READ.</span>{' '}
          <span className="font-light">earn.</span>{' '}
          <span className="font-semibold">publish.</span>
        </h1>
        <p className="mt-4 max-w-md sm:max-w-xl text-center text-neutral-300 text-sm sm:text-base md:text-lg font-['Montserrat'] leading-relaxed tracking-tight">
          Turn every page into profit with the first decentralized read-to-earn platform.
        </p>
      </div>

      {/* Footer Main */}
      <footer className="w-full bg-black px-6 sm:px-8 md:px-12 pt-10 pb-6 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-10 md:flex-row md:justify-between md:items-start">
          {/* Logo and Contact */}
          <div className="flex flex-col items-start gap-4 font-['Manrope']">
            <Logo />
            <a
              href="mailto:support@invincibleread.com"
              className="text-neutral-300 hover:text-white text-sm sm:text-base transition"
            >
              support@invincibleread.com
            </a>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 w-full md:w-auto text-left">
            {/* Explore */}
            <div className="flex flex-col gap-2 font-['Manrope']">
              <h4 className="text-white text-base sm:text-lg font-semibold mb-1">Explore</h4>
              <a href="#home" className="text-neutral-300 hover:text-white text-sm transition">Home</a>
              <a href="#roadmap" className="text-neutral-300 hover:text-white text-sm transition">Roadmap</a>
              <a
                href="https://invincibles-organization.gitbook.io/invincible-read-whitepaper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Whitepaper
              </a>
              <a
                href="https://invincibles-organization.gitbook.io/invincible-read-whitepaper/tokenomics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Tokenomics
              </a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-2 font-['Manrope']">
              <h4 className="text-white text-base sm:text-lg font-semibold mb-1">Legal</h4>
              <a
                href="https://invincibles-organization.gitbook.io/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Terms & Conditions
              </a>
              <a
                href="https://invincibles-organization.gitbook.io/privacy-policiy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Privacy Policy
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-2 font-['Manrope']">
              <h4 className="text-white text-base sm:text-lg font-semibold mb-1">Connect</h4>
              <a
                href="https://www.linkedin.com/company/invincibleread/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                LinkedIn
              </a>
              <a
                href="https://medium.com/@invincibleread/how-to-participate-in-the-invincible-read-pre-sale-step-by-step-guide-510e316b428d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Medium
              </a>
              <a
                href="https://x.com/invincible_read"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                X (Twitter)
              </a>
              <a
                href="https://t.me/invincible_read"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Telegram
              </a>
              <a
                href="https://discord.gg/jGtrk7TejJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white text-sm transition"
              >
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-neutral-500 text-sm font-['Manrope']">
          © {new Date().getFullYear()} INVINCIBLE READ — All rights reserved.
        </div>
      </footer>
    </>
  );
}
