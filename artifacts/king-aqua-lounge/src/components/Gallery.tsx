import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SectionHero } from './SectionHero';

const IMAGES = [
  '/images/gallery-1.png',
  '/images/gallery-2.png',
  '/images/gallery-3.png',
  '/images/gallery-4.png',
  '/images/gallery-5.png',
  '/images/gallery-6.png',
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  return (
    <section id="galerie" className="bg-card relative" ref={ref}>
      <SectionHero
        eyebrow="Galerie"
        title="Notre Univers"
        subtitle="Le cadre, la terrasse, le bar et les vues fleuve — une immersion dans l'atmosphère King Aqua Lounge."
      />
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-24">

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {IMAGES.map((src, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-xl cursor-pointer group aspect-square ${
                index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 aspect-[2/1] lg:aspect-[1/2]' : ''
              }`}
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`King Aqua Lounge Gallery ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 z-10" />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
