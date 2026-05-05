import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Category = 'Entrées' | 'Entrées chaudes' | 'Volailles' | 'Pâtes' | 'Brochettes' | 'Grillades & Autres';

const MENU_DATA = {
  'Entrées': [
    { id: 'e1', name: 'Salade César (Poulet, Crevettes)', price: 7000, isPopular: true, image: '/images/menu-entrees.png' },
    { id: 'e2', name: 'Salade Composée', price: 5000, isPopular: false, image: '/images/menu-entrees.png' },
    { id: 'e3', name: 'Salade Niçoise', price: 4000, isPopular: false, image: '/images/menu-entrees.png' },
    { id: 'e4', name: 'Salade Maraîchère', price: 4000, isPopular: false, image: '/images/menu-entrees.png' },
    { id: 'e5', name: 'Nems', price: 3000, isPopular: false, image: '/images/menu-entrees.png' },
  ],
  'Entrées chaudes': [
    { id: 'ec1', name: 'Soupe de Capitaine', price: 5000, isPopular: false, image: '/images/menu-entrees-chaudes.png' },
    { id: 'ec2', name: 'Soupe de Vermicelle', price: 3000, isPopular: false, image: '/images/menu-entrees-chaudes.png' },
    { id: 'ec3', name: 'Beignets (Crevettes)', price: 6000, isPopular: false, image: '/images/menu-entrees-chaudes.png' },
    { id: 'ec4', name: 'Soupe aux Fruits de Mer', price: 7500, isPopular: true, image: '/images/menu-entrees-chaudes.png' },
  ],
  'Volailles': [
    { id: 'v1', name: 'Poulet grillé entier', price: 10000, isPopular: false, image: '/images/menu-volailles.png' },
    { id: 'v2', name: 'Poulet grillé demi', price: 6000, isPopular: true, image: '/images/menu-volailles.png' },
  ],
  'Pâtes': [
    { id: 'p1', name: 'Spaghetti Bolognaise', price: 5000, isPopular: false, image: '/images/menu-pates.png' },
    { id: 'p2', name: 'Spaghetti Carbonara', price: 7000, isPopular: false, image: '/images/menu-pates.png' },
    { id: 'p3', name: 'Spaghetti aux crevettes', price: 7000, isPopular: true, image: '/images/menu-pates.png' },
  ],
  'Brochettes': [
    { id: 'b1', name: 'Bœuf', price: 6000, isPopular: false, image: '/images/menu-brochettes.png' },
    { id: 'b2', name: 'Poulet', price: 7000, isPopular: false, image: '/images/menu-brochettes.png' },
    { id: 'b3', name: 'Capitaine', price: 9000, isPopular: false, image: '/images/menu-brochettes.png' },
    { id: 'b4', name: 'Gambas', price: 13000, isPopular: true, image: '/images/menu-brochettes.png' },
    { id: 'b5', name: 'Rognon', price: 7000, isPopular: false, image: '/images/menu-brochettes.png' },
    { id: 'b6', name: 'Kana', price: 6000, isPopular: false, image: '/images/menu-brochettes.png' },
    { id: 'b7', name: 'Foie de bœuf', price: 6000, isPopular: false, image: '/images/menu-brochettes.png' },
  ],
  'Grillades & Autres': [
    { id: 'g1', name: 'Pavé de bœuf', price: 9000, isPopular: true, image: '/images/menu-grillades.png' },
    { id: 'g2', name: 'Pavé de capitaine', price: 10000, isPopular: false, image: '/images/menu-grillades.png' },
    { id: 'g3', name: 'Côte de bœuf', price: 12000, isPopular: true, image: '/images/menu-grillades.png' },
    { id: 'g4', name: 'Côte d\'agneau', price: 12000, isPopular: false, image: '/images/menu-grillades.png' },
    { id: 'g5', name: 'Crevettes provençales', price: 12000, isPopular: false, image: '/images/menu-grillades.png' },
    { id: 'g6', name: 'Gambas provençales', price: 15000, isPopular: true, image: '/images/menu-grillades.png' },
    { id: 'g7', name: 'Émincé de bœuf (crème)', price: 8000, isPopular: false, image: '/images/menu-grillades.png' },
    { id: 'g8', name: 'Émincé blanc de poulet (crème)', price: 8000, isPopular: false, image: '/images/menu-grillades.png' },
  ]
};

const CATEGORIES = Object.keys(MENU_DATA) as Category[];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>('Entrées');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { addToCart } = useCart();

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    // Prevent event bubbling if needed
    e.stopPropagation();
    
    // Add micro-animation effect to the button itself
    const button = e.currentTarget as HTMLButtonElement;
    button.classList.add('scale-90');
    setTimeout(() => button.classList.remove('scale-90'), 150);

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  return (
    <section id="menu" className="py-24 bg-card relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">La Carte</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-foreground">Menu Gastronomique</h3>
          <div className="w-16 h-1 bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-12 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:justify-center gap-2 md:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-sans text-sm tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-background font-medium shadow-[0_0_15px_rgba(201,161,74,0.3)]'
                  : 'bg-transparent border border-border text-foreground/70 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {MENU_DATA[activeCategory].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-background rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,161,74,0.08)] hover:-translate-y-1 relative"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                    
                    {item.isPopular && (
                      <div className="absolute top-3 left-3 bg-primary text-background text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                        Populaire
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
                    <h4 className="font-serif text-xl text-foreground mb-2 pr-4">{item.name}</h4>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="font-sans text-primary font-semibold text-lg">
                        {item.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      
                      <button
                        onClick={(e) => handleAddToCart(item, e)}
                        className="bg-card hover:bg-primary text-foreground hover:text-background border border-border hover:border-primary p-3 rounded-full transition-all duration-200 flex items-center justify-center group/btn"
                        aria-label="Ajouter au panier"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
