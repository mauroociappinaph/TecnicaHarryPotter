import {
  GiMagicGate,
  GiSpellBook,
  GiMagicSwirl,
  GiWizardStaff,
  GiCauldron,
} from "react-icons/gi";
import hogwartsBook from "../asset/vecteezy_love-book-reading-watercolor-books-hand-painted_13183675.png";
const AdministrarCharacters = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Bienvenido a la Escuela de <br /> Magia y Hechicería de
                  Hogwarts
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Explora todos los personajes y sus fascinantes características
                  del mundo mágico. Crea un nuevo personaje, dale vida con
                  detalles únicos, o edita uno ya existente para personalizar
                  aún más su historia.
                  <div>
                    <GiMagicGate className="inline-block h-10 w-10 text-yellow-400 ml-2" />
                    <GiMagicSwirl className="inline-block h-10 w-10 text-yellow-400 ml-2" />
                  </div>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="Hogwarts Castle"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src={hogwartsBook}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Explora el mundo mágico
                  </h2>
                  <p className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    En Hogwart aprenderás el arte de la magia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  ¿Que podrás hacer en esta pagina?
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <GiWizardStaff className="h-12 w-12 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">
                  Descubre Personajes
                </h3>
                <p className="text-sm text-gray-300">
                  Sumérgete en el mundo mágico y descubre a todos los
                  personajes, cada uno con sus propias y fascinantes
                  características explora sus habilidades e historias.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <GiCauldron className="h-12 w-12 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">
                  Crear Personajes
                </h3>
                <p className="text-sm text-gray-300">
                  Crea un nuevos personajes, personalízalo con características
                  únicas y dale vida en este mundo lleno de posibilidades.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <GiSpellBook className="h-12 w-12 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">
                  Editar Personajes
                </h3>
                <p className="text-sm text-gray-300">
                  Edita personajes existentes y ajusta sus detalles para
                  adaptarlos a tus ideas y visión.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32"></section>
      </main>
    </div>
  );
};

export default AdministrarCharacters;
