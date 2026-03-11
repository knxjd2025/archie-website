import { motion } from 'framer-motion';

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : align === 'left' ? 'text-left' : 'text-right';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-3xl mb-14 ${alignClass}`}
    >
      {label && (
        <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
          {label}
        </span>
      )}

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ${
          light ? 'text-white' : 'text-archie-dark'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-lg sm:text-xl leading-relaxed ${
            light ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
