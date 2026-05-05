import { motion } from 'framer-motion';

interface SectionHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHero({ eyebrow, title, subtitle }: SectionHeroProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(320px, 52vh, 560px)' }}>
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0"
      >
        <img
          src="/images/interieur_lounge.jpeg"
          alt="King Aqua Lounge intérieur"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'saturate(1.08) contrast(1.04) brightness(0.62)' }}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.32) 46%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4"
           style={{ minHeight: 'inherit', paddingTop: '140px', paddingBottom: '60px' }}>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="uppercase tracking-[0.28em] text-[#e6c778] text-xs font-sans font-semibold mb-4"
        >
          {eyebrow}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-px bg-[#c9a14a] mb-5"
          style={{ width: '48px', transformOrigin: 'center' }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-white mb-5"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 0.95,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textShadow: '0 4px 38px rgba(0,0,0,0.55)',
          }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans max-w-xl mx-auto"
            style={{
              color: 'rgba(247,240,228,0.80)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              lineHeight: 1.65,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
