import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="relative z-[2] py-3 sm:py-4"
      style={{
        background: `repeating-linear-gradient(
          -45deg,
          #000000,
          #000000 12px,
          #1a2205 12px,
          #1a2205 24px
        )`,
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#000000] text-sm font-mono font-bold bg-[#C2FE0B] px-3 py-1">
            © {new Date().getFullYear()} Yvan Gui
          </span>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/YvanGui19"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C2FE0B] text-[#000000] hover:bg-[#f0f0ec] transition-colors p-2"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/yvangui"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C2FE0B] text-[#000000] hover:bg-[#f0f0ec] transition-colors p-2"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
