import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={ref} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Extra dark overlay */}
        <img
          src="/images/hero.png"
          alt="King Aqua Lounge Ambience"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary uppercase tracking-widest mb-6 drop-shadow-2xl"
          >
            King Aqua<br />Lounge
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 1, delay: 1 }}
            className="h-[2px] bg-primary mx-auto mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl font-sans text-foreground/90 font-light max-w-2xl mx-auto mb-12"
          >
            Plonge dans l'ambiance — cocktails, vibes et saveurs inoubliables.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={() => scrollTo('#menu')}
              className="px-8 py-4 border border-primary text-primary hover:bg-primary/10 transition-all font-sans uppercase tracking-widest text-sm rounded-sm w-full sm:w-auto"
            >
              Voir le menu
            </button>
            <button
              onClick={() => scrollTo('#commander')}
              className="px-8 py-4 bg-primary text-background hover:bg-primary/90 transition-all font-sans uppercase tracking-widest font-medium text-sm rounded-sm w-full sm:w-auto"
            >
              Commander maintenant
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-widest text-primary/70 mb-2 font-sans">Découvrir</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
