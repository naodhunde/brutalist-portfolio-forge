import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Send, Instagram, Share2 } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/naod-hunde/",
    color: "hsl(200, 100%, 40%)",
  },
  {
    name: "Email",
    icon: Send,
    href: "mailto:naodhunde@gmail.com",
    color: "hsl(189, 94%, 43%)",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/naodhunde/",
    color: "hsl(330, 100%, 45%)",
  },
];

export const FloatingActionMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-center gap-4"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Social Links */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col-reverse gap-3"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 20 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="group relative w-12 h-12 rounded-full border-2 border-foreground bg-background flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 group-hover:text-background transition-colors" />
                  
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-3 px-3 py-1 bg-foreground text-background text-sm font-mono whitespace-nowrap rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </motion.span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        className="w-16 h-16 rounded-full bg-accent text-accent-foreground border-2 border-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        animate={{
          rotate: isExpanded ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Social menu"
      >
        <Share2 className="w-6 h-6" />
      </motion.button>

      {/* Glowing backdrop when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 -z-10 blur-2xl"
            style={{
              background: `radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
