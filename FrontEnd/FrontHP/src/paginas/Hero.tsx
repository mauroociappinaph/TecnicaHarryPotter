import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Bienvenido al mundo de{" "}
          <span className="text-yellow-400">Harry Potter</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white">
          Emprende un viaje mágico a través de Hogwarts, donde la{" "}
          <span className="text-yellow-400">magia</span> y la{" "}
          <span className="text-yellow-400">aventura</span> te esperan en cada
          rincón.
        </p>

        <Link to="/login">
          <button className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-yellow-400 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 my-4">
            Comienza tu aventura
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
