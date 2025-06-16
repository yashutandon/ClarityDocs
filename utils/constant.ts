export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
} as const;

export const itemVariants = {
  hidden: {
    opacity: 0,
    
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",     
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
} as const;
