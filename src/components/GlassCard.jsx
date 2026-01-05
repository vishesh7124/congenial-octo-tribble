import { motion } from "framer-motion";

export default function RetroGlassCard({
  title,
  text,
  image,
  imagePosition = "right",
}) {
  const isLeft = imagePosition === "left";

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative max-w-360 mx-auto px-8"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className={`
    ${isLeft ? "md:order-2 md:text-right md:items-end" : "md:text-left"}
    relative z-10 flex flex-col
  `}>
            <h1 className="text-9xl md:text-8xl font-gothic text-pink-300 mb-6 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)]">
              {title}
            </h1>

            <p className="text-4xl md:text-3xl text-pink-200/80 font-gothic leading-relaxed whitespace-pre-line">
              {text}
            </p>
          </div>
          <div
            className={`${isLeft ? "md:order-1" : ""} relative z-10 flex justify-center`}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <img
                src={image}
                alt=""
                className="max-h-80 md:max-h-136 lg:max-h-152 object-contain rounded-2xl drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative lines */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-64 h-px bg-linear-to-r from-transparent via-pink-400 to-transparent"></div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
      </motion.div>
    </div>
  );
}