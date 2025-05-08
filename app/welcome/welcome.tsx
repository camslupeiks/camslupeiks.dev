import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Import images
import img0 from "./photos/me_0.jpg";
import img1 from "./photos/me_1.jpg";
import img10 from "./photos/me_10.jpg";
import img11 from "./photos/me_11.jpg";
import img12 from "./photos/me_12.jpg";
import img2 from "./photos/me_2.jpg";
import img3 from "./photos/me_3.jpg";
import img4 from "./photos/me_4.jpg";
import img5 from "./photos/me_5.jpg";
import img6 from "./photos/me_6.jpg";
import img7 from "./photos/me_7.jpg";
import img8 from "./photos/me_8.jpg";
import img9 from "./photos/me_9.jpg";

const images = [
  img0,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

export function Welcome() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [time, setTime] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["grayscale(100%)", "grayscale(0%)"],
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [2, 1]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Toronto",
      });
      setTime(formatter.format(now));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef}>
      <section className="relative h-[300vh]">
        <div className="sticky top-0 flex flex-col items-center justify-center h-screen w-full overflow-hidden">
          <motion.img
            src={images[imageIndex]}
            alt="me"
            className="w-[40vw] h-[80vh] object-cover rounded-xl"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
              filter: imageFilter,
            }}
          />

          <motion.div
            className="fixed bottom-4 left-4 text-lg text-gray-600 font-medium"
            style={{
              opacity: useTransform(scrollY, [0, 50], [1, 0]),
            }}
          >
            Senior Software Engineer @{" "}
            <a
              href="https://www.brashinc.com/"
              target="_blank"
              className="hover:text-pink-500"
            >
              Brash Inc.
            </a>
          </motion.div>

          <motion.div
            className="fixed bottom-4 right-4 text-gray-600 font-medium"
            style={{
              opacity: useTransform(scrollY, [0, 50], [1, 0]),
              fontSize: "0.75rem",
            }}
          >
            {new Date().toLocaleDateString("en-CA")} {time} {"EST"}
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
            <h1 className="font-bold text-[12vw] font-specialGothic">
              Hey, I'm Cam.
            </h1>
            <span className="text-[2vw] text-gray-600 text-center font-mediumd">
              I build things. I break things. I fix things. Here are some of
              those{" "}
              <span className="underline decoration-pink-500 text-pink-500">
                things
              </span>
              .
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
