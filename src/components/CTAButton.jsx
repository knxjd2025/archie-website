import { motion } from 'framer-motion';

const base =
  'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-archie-orange/60 focus-visible:ring-offset-2';

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const variants = {
  primary:
    'bg-gradient-cta text-white shadow-lg shadow-archie-orange/25 hover:shadow-xl hover:shadow-archie-orange/35 hover:brightness-110',
  secondary:
    'border-2 border-archie-orange text-archie-orange hover:bg-archie-orange hover:text-white',
  ghost:
    'text-archie-orange hover:bg-archie-orange/10',
};

export default function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconRight: IconRight,
  ...rest
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      {children}
      {IconRight && <IconRight className="w-5 h-5 shrink-0" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...rest}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}
