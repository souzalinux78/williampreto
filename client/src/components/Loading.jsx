import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-primary-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-16 h-16 rounded-full border-t-2 border-primary-800"
      />
    </div>
  );
};

export default Loading;
