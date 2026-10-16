import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  /** Retraso en segundos antes de animarse */
  delay?: number;
  /** Desplazamiento inicial en píxeles */
  y?: number;
  className?: string;
}

/**
 * Contenedor que revela su contenido con un fundido y desplazamiento
 * cuando entra en el viewport. (Para re-animar en listas filtradas,
 * pásale `key` desde el componente padre).
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 28, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
