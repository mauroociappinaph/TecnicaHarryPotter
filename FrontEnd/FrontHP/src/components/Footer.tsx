import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-yellow-400 text-center">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between">
        <span className="text-white font-bold">
          Harry Potter &copy; {getCurrentYear()}
        </span>

        <div className="flex space-x-4">
          <a
            href="https://github.com/mauroociappinaph"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-yellow-500"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://maurociappina.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portafolio Web"
            className="text-white hover:text-yellow-500"
          >
            <FaGlobe size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/maurojoseciappina/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-yellow-500"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
