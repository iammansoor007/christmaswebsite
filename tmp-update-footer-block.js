const fs = require('fs');
const path = require('path');

const filePath = path.join('app', 'components', 'Footer.jsx');
let text = fs.readFileSync(filePath, 'utf8');

const startMarker = "      {/* Main Container - Responsive padding from 300px up */}";
const endMarker = "      </div>\n    </footer>";
const start = text.indexOf(startMarker);
const end = text.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error('Markers not found');
}

const newBlock = `      {/* Main Container - Responsive padding from 300px up */}
      <div className="w-full mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-16 2xl:px-20 relative z-10">
        {/* Main Footer Content - Three columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-16">
          {/* Column 1: Brand Column - Logo */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
              <Image
                src={logo}
                alt={`${companyName} Logo`}
                width={144}
                height={144}
                className="object-contain w-full h-full"
                priority={false}
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  target.style.display = "none";
                  target.parentElement.innerHTML = \`
                    <div class="w-full h-full flex items-center justify-center bg-dark-navy rounded-xl border border-holiday-gold/20">
                      <div class="text-center">
                        <div class="text-2xl sm:text-3xl font-bold text-white">LH</div>
                        <div class="text-xs sm:text-sm text-white/70">Logo</div>
                      </div>
                    </div>
                  \`;
                }}
              />
            </div>
            <p className="text-center lg:text-left text-sm text-white/60 mt-3 max-w-[220px]">
              {tagline}
            </p>
          </div>

          {/* Column 2: Link Sections */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {Object.entries(linkSections).map(([category, linkItems]) => (
                <div key={\`category-\${category}\`}>
                  <h4 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-3 pb-2 border-b border-holiday-gold/20 relative">
                    <span>{category}</span>
                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold"></div>
                  </h4>
                  <ul className="space-y-2">
                    {linkItems.map((link) => (
                      <li key={\`link-\${link.label}\`}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-holiday-gold transition-all duration-200 flex items-center group text-sm sm:text-base hover:pl-2"
                        >
                          <span className="w-1.5 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold opacity-0 group-hover:opacity-100 mr-2 transition-all duration-200"></span>
                          <span className="break-words">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 text-center lg:text-left">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/80 group hover:text-white transition-colors duration-200">
                <BsFillTelephoneFill className="text-holiday-gold flex-shrink-0 text-base sm:text-lg" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base break-words">
                    {contact.phone}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    {contact.hours}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white/80 group hover:text-white transition-colors duration-200">
                <FaEnvelope className="text-holiday-red flex-shrink-0 text-base sm:text-lg" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base break-words">
                    {contact.email}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    {contact.support}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 lg:pt-12 border-t border-holiday-red/20">
          <div className="mb-6">
            <h4 className="text-white font-semibold text-base sm:text-lg mb-3 text-center lg:text-left">
              Follow Our Journey
            </h4>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {socialMedia.map((social) => {
                const IconComponent = iconMap[social.icon] || FaFacebookF;
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg border border-holiday-gold/30 bg-dark-navy/50 backdrop-blur-sm text-holiday-gold hover:bg-gradient-to-r hover:from-holiday-red hover:via-holiday-gold hover:to-holiday-red hover:text-dark-navy transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-holiday-gold/20 text-sm sm:text-base"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-white/60 text-sm sm:text-base">
                © {year} {companyName}. Designed by{" "}
                <a
                  href="https://mohsindesigns.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300 font-medium hover:underline underline-offset-2"
                >
                  Mohsin Designs
                </a>
                . All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-holiday-gold transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-holiday-red transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-white/40 text-xs sm:text-sm px-4">
              {certifications}
            </p>
          </div>
        </div>
      </div>
`;

fs.writeFileSync(filePath, text.slice(0, start) + newBlock + text.slice(end));
