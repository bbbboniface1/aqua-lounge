import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="localisation" className="py-0 relative" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Info Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="bg-background py-20 px-8 md:px-16 lg:px-24 flex flex-col justify-center"
        >
          <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Localisation</h2>
          <h3 className="text-4xl font-serif text-foreground mb-12">Rendez-nous visite</h3>
          
          <div className="space-y-8">
            
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-all shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-foreground mb-1">Adresse</h4>
                <p className="text-muted-foreground font-sans">
                  Situé à Bacodjicoroni ACI, au bord du fleuve<br />
                  Bamako, Mali
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-all shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-foreground mb-1">Téléphone</h4>
                <a href="tel:+22377774777" className="text-muted-foreground hover:text-primary font-sans transition-colors">
                  +223 77 77 74 77
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-all shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-foreground mb-1">Email</h4>
                <a href="mailto:diarralanlux@gmail.com" className="text-muted-foreground hover:text-primary font-sans transition-colors">
                  diarralanlux@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-all shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-foreground mb-1">Heures d'ouverture</h4>
                <p className="text-muted-foreground font-sans">
                  Ouvert tous les jours<br />
                  De 18h00 à l'aube
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Map Side */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[500px] lg:h-auto min-h-[500px] relative grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15570.61367098485!2d-8.026723812841796!3d12.605335099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDM2JzE5LjIiTiA4wrAwMSMzNi4yIlc!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="King Aqua Lounge Location"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}
