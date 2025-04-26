import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import img from "./me.jpg";

export function Welcome() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image behavior
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Text behavior
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 1], [2, 0.5]); // << text starts at 2x and shrinks to normal

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-desertRose">
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen w-full">
        <motion.img
          src={img}
          alt="me"
          className="w-1/3 h-auto shadow-lg"
          style={{
            scale,
            opacity: imageOpacity,
          }}
        />
        <motion.h1
          className="absolute top-1/2 left-1/2 text-[12vw] whitespace-nowrap font-bold text-warmStone pointer-events-none"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            opacity: textOpacity,
            scale: textScale,
          }}
        >
          <span>Hey, I'm Cam.</span>
        </motion.h1>
      </div>
    </section>
  );
}
