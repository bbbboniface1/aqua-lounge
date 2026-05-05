import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Menu } from '../components/Menu';
import { Cart } from '../components/Cart';
import { Gallery } from '../components/Gallery';
import { Location } from '../components/Location';
import { Footer } from '../components/Footer';
import { LoadingScreen } from '../components/LoadingScreen';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { CartProvider } from '../context/CartContext';

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background">
        <LoadingScreen />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Menu />
          <Cart />
          <Gallery />
          <Location />
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
