import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  // Función para obtener solo el año actual
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-indigo-100 text-center mt-10">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between">
        <span className="text-indigo-600 font-bold">
          Harry Potter &copy; {getCurrentYear()}
        </span>

        <div className="flex space-x-4">
          <a
            href="https://github.com/mauroociappinaph"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-indigo-700 hover:text-indigo-500"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://maurociappina.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portafolio Web"
            className="text-indigo-700 hover:text-indigo-500"
          >
            <FaGlobe size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/maurojoseciappina/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-indigo-700 hover:text-indigo-500"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
