import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-black pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          <button 
            onClick={scrollToTop}
            className="text-3xl md:text-4xl font-serif text-primary uppercase tracking-widest mb-8 hover:text-primary/80 transition-colors"
          >
            King Aqua<br />Lounge
          </button>
          
          <p className="text-muted-foreground font-sans max-w-md mx-auto mb-10">
            L'excellence gastronomique et l'ambiance nocturne de Bamako, réunies au bord du fleuve.
          </p>
          
          <div className="flex items-center gap-6 mb-16">
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300">
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
          
        </div>
        
        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/60 text-sm font-sans">
            &copy; {currentYear} King Aqua Lounge. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm font-sans text-muted-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
