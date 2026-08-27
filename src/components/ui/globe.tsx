import createGlobe from "cobe";
import { useEffect, useRef } from "react";
// import { useTheme } from "../features/ThemeProvider";

export function Cobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const {theme} = useTheme();

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let dragging = false;
    let lastX = 0;
    let rotationSpeed = 0.005; // Vitesse de rotation par défaut
    let targetSpeed = rotationSpeed; // Vitesse cible pour le lissage

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Définir les couleurs en fonction du thème
    //  const globeColors = theme === 'dark'
    //  ? {
    //      baseColor: [0.1, 0.1, 0.1] as [number, number, number], // Couleur de base pour le thème sombre
    //      markerColor: [0.8, 0.2, 0.2] as [number, number, number], // Couleur des marqueurs pour le thème sombre
    //      glowColor: [1, 1, 1] as [number, number, number] // Couleur de l'éclat pour le thème sombre
    //    }
    //  : {
    //      baseColor: [1, 3, 19] as [number, number, number], // Couleur de base pour le thème clair
    //      markerColor: [0.2, 0.6, 0.8] as [number, number, number], // Couleur des marqueurs pour le thème clair
    //      glowColor: [1, 3, 19] as [number, number, number] // Couleur de l'éclat pour le thème clair
    //    };

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [245 / 255, 245 / 255, 245 / 255], // Blanc très clair
      markerColor: [100 / 255, 200 / 255, 255 / 255], // Bleu clair
      glowColor: [255 / 255, 220 / 255, 180 / 255], // Beige clair
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += rotationSpeed; // Rotation continue
        state.width = width * 2;
        state.height = width * 2;

        // Lisser la transition entre les vitesses
        rotationSpeed += (targetSpeed - rotationSpeed) * 0.1;
      },
    });

    const onMouseDown = (event: MouseEvent) => {
      dragging = true;
      lastX = event.clientX;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!dragging) return;
      const deltaX = event.clientX - lastX;
      targetSpeed = deltaX * 0.0105; // Ajuste la vitesse en fonction du déplacement
      lastX = event.clientX;
    };

    const onMouseUp = () => {
      dragging = false;
      targetSpeed = 0.005; // Revenir à la vitesse par défaut progressivement
    };

    canvasRef.current?.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      canvasRef.current?.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
        cursor: "grab",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
         className="md:ml-14 ml-0"
      />
    </div>
  );
}
