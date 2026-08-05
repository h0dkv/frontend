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
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="mt-2 text-zinc-400">
        {description}
      </p>

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}