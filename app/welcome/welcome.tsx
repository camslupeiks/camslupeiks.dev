import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import img from "./me.jpeg";

export function Welcome() {
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const [time, setTime] = useState<string>("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image behavior
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["grayscale(100%)", "grayscale(0%)"],
  );

  // Text behavior
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 1], [2, 0.5]); // << text starts at 2x and shrinks to normal

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-CA", {
        ...options,
        timeZone: "America/Toronto", // Ottawa timezone
      });

      const formatted = formatter.format(now);
      const seconds = formatted.split(":")[2];
      const minutes = formatted.split(":")[1];
      const hours = formatted.split(":")[0];
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-desertRose">
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen w-full overflow-hidden">
        <motion.img
          src={img}
          alt="me"
          className="w-[40vw] h-auto rounded"
          style={{
            scale: imageScale,
            opacity: imageOpacity,
            filter: imageFilter,
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
        <motion.div
          className="fixed bottom-4 right-4 text-xs font-coralPixels text-gray-800 text-right"
          style={{
            opacity: useTransform(scrollY, [0, 50], [1, 0]),
          }}
        >
          Ottawa, CA
          <br />
          {new Date().toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          {time}
        </motion.div>
      </div>
    </section>
  );
}
