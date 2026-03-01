import { motion } from "framer-motion";
import Button from "../common/Button";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiTailwindcss,
} from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";

// Configuration des icônes flottantes
const floatingIcons = [
  { Icon: SiReact, position: "top-0 right-24", delay: 0, duration: 3 },
  { Icon: SiNodedotjs, position: "top-5 left-15", delay: 0.5, duration: 3.5 },
  { Icon: SiMongodb, position: "top-1/4 -left-4", delay: 1, duration: 4 },
  {
    Icon: SiJavascript,
    position: "bottom-1/4 -right-2",
    delay: 0.3,
    duration: 3.2,
  },
  { Icon: SiHtml5, position: "bottom-0 left-10", delay: 0.7, duration: 3.8 },
  { Icon: SiCss3, position: "bottom-0 right-28", delay: 0.2, duration: 3.3 },
  { Icon: SiGit, position: "top-1/3 right-4", delay: 0.9, duration: 3.6 },
  {
    Icon: SiTailwindcss,
    position: "bottom-1/3 left-0",
    delay: 0.4,
    duration: 3.4,
  },
];

// Configuration des formes de fond avec trajectoires distinctes
const backgroundShapes = [
  {
    size: "w-80 h-80",
    position: "top-10 left-0",
    duration: 40,
    x: [0, 400, 700, 300, 0],
    y: [0, 50, -30, 80, 0],
  },
  {
    size: "w-60 h-60",
    position: "bottom-20 left-10",
    duration: 35,
    x: [0, 300, 600, 200, 0],
    y: [0, -80, -150, -50, 0],
  },
  {
    size: "w-40 h-40",
    position: "top-1/2 right-1/4",
    duration: 45,
    x: [0, 500, 250, 650, 0],
    y: [0, -100, 100, -50, 0],
  },
  {
    size: "w-20 h-20",
    position: "top-10 left-0",
    duration: 55,
    x: [0, 100, 800, 400, 0],
    y: [0, 150, -130, 30, 0],
  },
  {
    size: "w-30 h-30",
    position: "bottom-20 left-10",
    duration: 75,
    x: [0, 150, 60, 20, 0],
    y: [0, -8, -15, -500, 0],
  },
  {
    size: "w-25 h-25",
    position: "top-1/2 right-1/4",
    duration: 90,
    x: [0, 50, 500, 150, 0],
    y: [0, -10, 100, 500, 0],
  },
];

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Formes de fond animées */}
      {backgroundShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} ${shape.position} rounded-full bg-primary/20 blur-2xl`}
          animate={{
            x: shape.x,
            y: shape.y,
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium mb-4">Hello, je suis</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-4">
              <span className="text-text">Yvan</span>{" "}
              <span className="text-primary">Gui</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-text mb-6">
              Développeur Web
            </h2>
            <p className="text-text-light mb-8 max-w-lg">
              Ancien expert technique dans l&apos;aéronautique, j&apos;ai choisi
              de mettre mes compétences d&apos;analyse, de rigueur et de
              résolution de problèmes au service du développement web.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/projects">Voir mes projets</Button>
              <Button variant="outline" to="/contact">
                Me contacter
              </Button>
            </div>
          </motion.div>

          {/* Composition design avec icônes flottantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Icônes flottantes en arrière-plan */}
              {floatingIcons.map(
                ({ Icon, position, delay, duration }, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${position} text-text-muted/30`}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: duration,
                      delay: delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-8 h-8 lg:w-10 lg:h-10" />
                  </motion.div>
                )
              )}

              {/* Logo central </> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 lg:w-44 lg:h-44 bg-background rounded-2xl border border-border flex items-center justify-center"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(0, 255, 136, 0.4), 0 0 80px rgba(0, 255, 136, 0.2)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(0, 255, 136, 0.4), 0 0 80px rgba(0, 255, 136, 0.2)",
                      "0 0 60px rgba(0, 255, 136, 0.6), 0 0 100px rgba(0, 255, 136, 0.3)",
                      "0 0 40px rgba(0, 255, 136, 0.4), 0 0 80px rgba(0, 255, 136, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BiCodeAlt className="w-16 h-16 lg:w-24 lg:h-24 text-primary" />
                </motion.div>
              </div>

              {/* Cercle décoratif externe */}
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
