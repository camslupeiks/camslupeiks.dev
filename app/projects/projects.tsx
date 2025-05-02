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
    backgroundColor: "#f0f0ff",
  },
  {
    name: "Otis Dental",
    description:
      "Wellness app designed to support users on their journey toward physical and mental well-being.",
    tools: ["React Native", "TypeScript", "Expo", "Firebase", "Node.js"],
    link: "https://hellootis.com/",
    image: otisImage,
    backgroundColor: "#f1f0ec",
  },
  {
    name: "Cryostasis",
    description:
      "Desktop app used to manage and preserve biological matter. Enables real-time monitoring and precise environmental control.",
    tools: ["Electron", "React", "TypeScript", "Node.js"],
    link: "https://www.cryostasis.ca/",
    image: cryostasisImage,
    backgroundColor: "#ECF6FF",
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
    backgroundColor: "#FAF9F6",
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
      className="w-screen h-screen relative overflow-hidden"
      style={{ backgroundColor: current.backgroundColor }}
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
          className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row p-12 gap-12"
        >
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900">
              {current.name}
            </h2>
            <p className="text-2xl text-gray-700 mb-6">{current.description}</p>
            <div className="mb-6">
              <span className="font-semibold text-xl text-gray-800">
                Tools I used:
              </span>
              <ul className="flex flex-wrap gap-3 mt-3">
                {current.tools.map((tool, i) => (
                  <li
                    key={i}
                    className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-md font-medium"
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
              className="text-2xl text-pink-600 hover:underline font-semibold mt-4"
            >
              Learn more →
            </a>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src={current.image}
              alt={current.name}
              className="max-w-full rounded-xl shadow-xl"
            />
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
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-pink-600 scale-125"
                : "bg-gray-400 hover:bg-pink-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
