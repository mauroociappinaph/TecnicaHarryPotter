import { useEffect } from "react";

const BackgroundMusic = () => {
  const audio = new Audio("/ways-of-the-wizard-197105.mp3");

  useEffect(() => {
    console.log("BackgroundMusic component mounted"); // Log para confirmar que el componente se montó

    audio.loop = true;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => {
        console.log("Audio is playing"); // Log para confirmar que el audio se está reproduciendo
      })
      .catch((error) => {
        console.error("Error al reproducir el audio:", error); // Log para errores de reproducción
      });

    return () => {
      console.log("BackgroundMusic component unmounted"); // Log para confirmar que el componente se desmontó
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};

export default BackgroundMusic;
