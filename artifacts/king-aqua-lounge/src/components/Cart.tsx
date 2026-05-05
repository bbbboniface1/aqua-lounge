import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', phone: '', address: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="commander" className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-primary mb-4">Commander</h2>
          <h3 className="text-4xl font-serif text-foreground">Votre Sélection</h3>
          <div className="w-12 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-border bg-background/50">
                <h4 className="font-serif text-2xl flex items-center gap-3">
                  <ShoppingBag className="text-primary" /> Panier
                </h4>
              </div>
              
              <div className="p-6">
                {cart.length === 0 && !isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-xl font-serif text-foreground/80 mb-2">Votre panier est vide</p>
                    <p className="text-muted-foreground font-sans">Explorez notre menu pour commencer votre commande.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0, scale: 0.9 }}
                          className="flex flex-col sm:flex-row gap-4 items-center bg-background p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          
                          <div className="flex-1 text-center sm:text-left">
                            <h5 className="font-serif text-lg">{item.name}</h5>
                            <p className="text-primary font-sans font-medium">{item.price.toLocaleString('fr-FR')} FCFA</p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-card border border-border rounded-full p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background text-foreground/80 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-sans font-medium">{item.qty}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background text-foreground/80 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-2"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {cart.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-border flex justify-between items-end">
                        <span className="text-lg font-sans text-muted-foreground">Total</span>
                        <span className="text-3xl font-serif text-primary">{totalPrice.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
              
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-card z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
                    >
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <h4 className="text-2xl font-serif mb-2 text-foreground">Commande Envoyée !</h4>
                    <p className="text-muted-foreground font-sans">Merci pour votre confiance. Notre équipe vous contactera dans quelques minutes.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h4 className="font-serif text-2xl mb-6">Informations</h4>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-sans text-foreground/80 ml-1">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={cart.length === 0}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 font-sans text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-sans text-foreground/80 ml-1">Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    disabled={cart.length === 0}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 font-sans text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                    placeholder="+223 00 00 00 00"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-sans text-foreground/80 ml-1">Adresse de livraison (Optionnel)</label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    disabled={cart.length === 0}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 font-sans text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 resize-none"
                    placeholder="Quartier, rue, indications..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0 || isSubmitting}
                  className="w-full mt-6 bg-primary text-background font-sans font-medium uppercase tracking-wider py-4 rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                  ) : (
                    'Valider la commande'
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
