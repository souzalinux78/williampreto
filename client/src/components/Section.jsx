import React from 'react';
import { motion } from 'framer-motion';

const Section = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  bgLight = true,
}) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 ${
        bgLight ? 'bg-primary-50' : 'bg-primary-100'
      } ${className}`}
    >
      <div className="container mx-auto px-6 md:px-12">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            {subtitle && (
              <span className="block text-primary-500 font-sans tracking-[0.2em] font-medium uppercase text-sm mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light leading-tight">
                {title}
              </h2>
            )}
            <div className="w-24 h-[1px] bg-primary-300 mx-auto mt-8"></div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
