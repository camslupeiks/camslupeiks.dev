import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > lastScrollY && current > 50) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
    setLastScrollY(current);
  });

  return (
    <motion.nav
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 bg-opacity-90 flex items-center justify-between p-4 z-50"
    >
      <motion.div
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 6, // 20 seconds for one full spin (nice and slow)
          ease: "linear",
        }}
        className="text-3xl font-bold font-coralPixels"
      >
        camslupeiks.dev
      </motion.div>
      <div className="flex gap-8">
        {[
          { key: "contact", link: "mailto:me@camslupeiks.dev" },
          { key: "linkedin", link: "https://www.linkedin.com/in/camslupeiks/" },
          { key: "github", link: "https://github.com/camslupeiks" },
          { key: "cv", link: "/resume.pdf" },
        ].map(({ key, link }) => (
          <a
            key={key}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-pink-500"
          >
            {key}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
