import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À Propos', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Localisation', href: '#localisation' },
    { name: 'Contact', href: '#footer' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-border/50 shadow-md'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => scrollToSection(e, '#home')}
              className="text-2xl md:text-3xl font-serif text-primary tracking-wider uppercase font-bold"
            >
              King Aqua
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-sans tracking-widest text-foreground/80 hover:text-primary transition-colors uppercase"
                >
                  {link.name}
                </a>
              ))}
              
              <a
                href="#commander"
                onClick={(e) => scrollToSection(e, '#commander')}
                className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-sans font-medium tracking-tighter text-background bg-primary rounded-sm group hover:bg-primary/90 transition-all uppercase text-sm"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative">Commander</span>
              </a>
            </div>

            {/* Mobile Toggle & Cart */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Cart Badge (Sticky) */}
      <motion.a
        href="#commander"
        onClick={(e) => scrollToSection(e, '#commander')}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-24 right-4 md:top-28 md:right-8 z-40 bg-card border border-primary/30 p-3 rounded-full shadow-lg flex items-center justify-center group"
      >
        <ShoppingBag className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={totalItems}
            className="absolute -top-1 -right-1 bg-primary text-background text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.a>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl md:hidden pt-24"
          >
            <div className="flex flex-col items-center justify-center space-y-8 h-full pb-20">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-serif text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#commander"
                onClick={(e) => scrollToSection(e, '#commander')}
                className="mt-8 px-8 py-4 bg-primary text-background font-sans font-medium tracking-widest uppercase rounded-sm"
              >
                Commander Maintenant
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
