import { FaGithub, FaLinkedin } from "react-icons/fa";
import profileService from "../../services/profileService";
import useFetch from "../../hooks/useFetch";

function Footer() {
  const { data: profile } = useFetch(() => profileService.get());

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
          <span className="text-lime text-sm font-mono font-bold bg-lime/10 backdrop-blur-md px-3 py-1">
            © {new Date().getFullYear()} Yvan Gui
          </span>

          <div className="flex items-center gap-4">
            {profile?.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime/10 backdrop-blur-md text-lime hover:bg-lime/30 transition-all p-2"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
            {profile?.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime/10 backdrop-blur-md text-lime hover:bg-lime/30 transition-all p-2"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
