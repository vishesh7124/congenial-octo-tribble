import { TopNavOverlay } from "../components/TopNavOverlay";
import { TeamCard } from "../components/TeamCard";
import { teamMembers } from "../utils/TeamData";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const titleVariant = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export function Team() {
  const posterMembers = teamMembers.slice(0, 9);
  const remainingMembers = teamMembers.slice(9);

  return (
    <div
      className="min-h-screen text-pink-400 overflow-hidden"
      style={{
        backgroundImage: "url('/AboutUs/background.png')",
        backgroundAttachment: "fixed",
      }}
    >
      <TopNavOverlay />

      <div className="pt-36 max-w-7xl mx-auto relative">
        <div className="relative min-h-250">

          {/* Animated Titles */}
          <motion.h1
            variants={titleVariant}
            initial="hidden"
            animate="visible"
            className="absolute left-0 top-0 text-[13rem] mr-20 text-pink-400/80 font-gothic leading-none"
          >
            Meet
          </motion.h1>

          <motion.h1
            variants={titleVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="absolute right-20 top-85 text-[13rem] text-pink-400/80 font-gothic leading-none"
          >
            The
          </motion.h1>

          <motion.h1
            variants={titleVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="absolute left-0 top-160 text-[13rem] text-pink-400/80 font-gothic leading-none"
          >
            Team
          </motion.h1>

          {/* Poster Section */}
          <motion.div
            variants={floatVariant}
            animate="animate"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 grid grid-cols-3 gap-16"
          >
            {posterMembers.slice(0, 3).map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </motion.div>

          <motion.div
            variants={floatVariant}
            animate="animate"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-80 left-80 -translate-x-1/2 grid grid-cols-3 gap-16"
          >
            {posterMembers.slice(3, 6).map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </motion.div>

          <motion.div
            variants={floatVariant}
            animate="animate"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute top-160 right-0 grid grid-cols-3 gap-16"
          >
            {posterMembers.slice(6, 9).map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </motion.div>
        </div>

        {/* Remaining Members */}
        {remainingMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-24 place-items-center pb-10"
          >
            {remainingMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}