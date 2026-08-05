import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  children,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group rounded-3xl border border-zinc-800/70 bg-zinc-900/70 p-6 backdrop-blur-xl shadow-xl transition"
    >
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-sm text-zinc-400">
        {description}
      </p>

      <div className="mt-6 text-violet-400 group-hover:text-violet-300 transition">
        {children}
      </div>
    </motion.div>
  );
}