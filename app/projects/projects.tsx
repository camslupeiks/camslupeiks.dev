import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import cryostasisImage from "../../assets/images/cryostasis.webp";
import numberedImage from "../../assets/images/numbered.avif";
import otisImage from "../../assets/images/otis.webp";
import velavuImage from "../../assets/images/velavu.webp";

const projects = [
  {
    name: "Velavu",
    description:
      "Modular tracking ecosystem for assets and people. CES Innovation Award winner.",
    tools: ["React", "TypeScript", "Mapbox", "MQTT", "Python", "AWS"],
    link: "https://www.velavu.com",
    image: velavuImage,
    primaryColor: "#f0f0ff",
    secondaryColor: "#6C63FF",
  },
  {
    name: "Otis Dental",
    description:
      "Wellness app designed to support users on their journey toward physical and mental well-being.",
    tools: ["React Native", "TypeScript", "Expo", "Firebase", "Node.js"],
    link: "https://hellootis.com/",
    image: otisImage,
    primaryColor: "#f1f0ec",
    secondaryColor: "#8B4513",
  },
  {
    name: "Cryostasis",
    description:
      "Desktop app used to manage and preserve biological matter. Enables real-time monitoring and precise environmental control.",
    tools: ["Electron", "React", "TypeScript", "Node.js"],
    link: "https://www.cryostasis.ca/",
    image: cryostasisImage,
    primaryColor: "#ECF6FF",
    secondaryColor: "#1D4ED8",
  },
  {
    name: "Numbered",
    description:
      "Cross-platform tool for collectors to organize, track, and value their collections.",
    tools: [
      "React Native",
      "TypeScript",
      "Expo",
      "Node.js",
      "OpenSearch",
      "AWS",
    ],
    link: "https://apps.apple.com/us/app/numbered/id6502341814",
    image: numberedImage,
    primaryColor: "#FAF9F6",
    secondaryColor: "#2D3748",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
  }),
};

export function Projects() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const paginate = (newDirection: number) => {
    setIndex(([prevIndex]) => {
      const newIndex =
        (prevIndex + newDirection + projects.length) % projects.length;
      return [newIndex, newDirection];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastInteractionTime > 10000) {
        paginate(1);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [lastInteractionTime]);

  const current = projects[index];

  return (
    <section
      className="max-w-screen h-screen relative overflow-x-hidden"
      style={{ backgroundColor: current.primaryColor }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 max-w-full h-full flex flex-col md:flex-row p-12 gap-12"
        >
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-6xl md:text-7xl mb-8 font-specialGothic">
              {current.name}
            </h2>
            <p className="text-2xl text-gray-600 mb-6 font-medium">
              {current.description}
            </p>
            <div className="mb-6">
              <span className="font-bold text-xl text-gray-800">
                Tools I used:
              </span>
              <ul className="flex flex-wrap gap-3 mt-3">
                {current.tools.map((tool, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 rounded-full text-md font-medium"
                    style={{
                      color: current.primaryColor,
                      backgroundColor: current.secondaryColor,
                    }}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-lg font-medium mt-4 border px-4 py-2 rounded-full group transition-colors duration-300"
              style={{
                color: current.secondaryColor,
                borderColor: current.secondaryColor,
              }}
            >
              Learn more{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <img
                src={current.image}
                alt={current.name}
                className="max-w-full rounded-xl shadow-xl transition-all duration-300 ease-in-out group-hover:filter group-hover:blur-sm group-hover:scale-105 group-hover:brightness-50"
              />
              {/* Hover text */}
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-specialGothic text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View project
              </span>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setLastInteractionTime(Date.now());
              setIndex([i, i > index ? 1 : -1]);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              i === index
                ? "bg-gray-800 scale-200"
                : "bg-gray-400 hover:bg-pink-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
