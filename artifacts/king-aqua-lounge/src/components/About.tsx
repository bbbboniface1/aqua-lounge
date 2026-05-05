import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img
                src="/images/about.png"
                alt="Intérieur du King Aqua Lounge"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -inset-4 border border-primary/20 rounded-sm -z-10 transform translate-x-2 translate-y-2" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
            <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Notre Histoire</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
              L'art de vivre <br/>
              <span className="text-primary italic">à la malienne.</span>
            </h3>
            
            <div className="w-12 h-1 bg-primary mb-8" />
            
            <blockquote className="text-xl md:text-2xl font-serif text-foreground/90 italic leading-relaxed mb-8 border-l-2 border-primary pl-6">
              "King Aqua Lounge est un espace unique où gastronomie, musique et ambiance se rencontrent pour offrir une expérience inoubliable."
            </blockquote>
            
            <p className="text-muted-foreground font-sans leading-relaxed mb-8 font-light">
              Situé au bord du fleuve à Bamako, notre lounge vous invite dans un univers où le luxe se marie à la convivialité. Que ce soit pour un dîner romantique, un verre entre amis ou une célébration spéciale, chaque détail a été pensé pour éveiller vos sens.
            </p>
            
            <div>
              <div className="font-serif text-2xl text-primary/80 italic">— King Aqua Lounge</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
