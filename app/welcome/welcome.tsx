import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import img from "./me.jpeg";

export function Welcome() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [time, setTime] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Motion transforms
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["grayscale(0%)", "grayscale(100%)"],
  );

  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [2, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      } as Intl.DateTimeFormatOptions;

      const formatter = new Intl.DateTimeFormat("en-CA", {
        ...options,
        timeZone: "America/Toronto",
      });

      const formatted = formatter.format(now);
      setTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef}>
      {/* INTRO SECTION */}
      <section className="relative h-[300vh]">
        <div className="sticky top-0 flex flex-col items-center justify-center h-screen w-full overflow-hidden">
          <motion.img
            src={img}
            alt="me"
            className="w-[40vw] rounded-xl"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              filter: imageFilter,
            }}
          />
          <motion.div
            className="fixed bottom-4 left-4 text-xs font-coralPixels text-gray-800"
            style={{
              opacity: useTransform(scrollY, [0, 50], [1, 0]),
            }}
          >
            Ottawa, CA
            <br />
            {new Date().toLocaleDateString("en-CA")} {time}
          </motion.div>

          <motion.div
            className="fixed bottom-4 right-4 text-xl text-gray-800 font-coralPixels"
            style={{
              opacity: useTransform(scrollY, [0, 50], [1, 0]),
            }}
          >
            senior software engineer @{" "}
            <a
              href="https://www.brashinc.com/"
              target="_blank"
              className="underline"
            >
              brash inc.
            </a>
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 whitespace-nowrap text-center"
            style={{
              translateX: "-50%",
              translateY: "-50%",
              opacity: textOpacity,
              scale: textScale,
            }}
          >
            <h1 className="font-bold text-[12vw]">Hey, I'm Cam.</h1>
            <span className="text-[2vw] text-gray-800 text-center">
              I build things. I break things. I fix things. Here are some of
              those{" "}
              <span className="underline decoration-pink-500">things</span>.
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
