import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, Award, Truck, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';

const AboutPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white">
      {/* Header - Same as main page */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-color--accent--line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 
                className="text-2xl font-bold cursor-pointer" 
                style={{ color: 'var(--accent--ui-accent)', fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' }}
                onClick={() => navigate('/')}
              >
                Ottawa Gift Boxes
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" onClick={() => navigate('/')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Shop</a>
              <a href="#" onClick={() => navigate('/gift-baskets')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Gift Baskets</a>
              <a href="#" onClick={() => navigate('/corporate-gifts')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Corporate Gifts</a>
              <a href="#" onClick={() => navigate('/about')} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer font-semibold">About Us</a>
              <a href="#" onClick={() => navigate('/contact')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Contact</a>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Heart className={`h-4 w-4 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs" style={{ backgroundColor: 'var(--color--identity--red)' }}>
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-color--accent--line">
              <nav className="flex flex-col space-y-2">
                <a href="#" onClick={() => navigate('/')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">Shop</a>
                <a href="#" onClick={() => navigate('/gift-baskets')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">Gift Baskets</a>
                <a href="#" onClick={() => navigate('/corporate-gifts')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">Corporate Gifts</a>
                <a href="#" onClick={() => navigate('/about')} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer font-semibold">About Us</a>
                <a href="#" onClick={() => navigate('/contact')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-text--text-subtle-light">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-accent--ui-accent transition-colors duration-200"
          >
            Home
          </button>
          <span>›</span>
          <span className="text-text--text-light">About Us</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            About Ottawa Gift Boxes
          </h1>
          <p className="text-xl text-text--text-subtle-light max-w-3xl mx-auto leading-relaxed">
            We're passionate about creating meaningful connections through thoughtfully curated gift boxes and baskets, delivering joy throughout Ottawa and surrounding areas since 2020.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>
              Our Story
            </h2>
            <div className="prose text-text--text-subtle-light">
              <p className="mb-4">
                Ottawa Gift Boxes was founded with a simple mission: to help people express their feelings and strengthen relationships through the art of thoughtful gifting. What started as a small local business has grown into Ottawa's premier destination for premium gift boxes and baskets.
              </p>
              <p className="mb-4">
                We believe that every gift tells a story, and every recipient deserves to feel truly special. That's why we carefully curate each box with premium items from local Ottawa artisans and trusted brands, ensuring every unboxing experience is memorable.
              </p>
              <p>
                From corporate appreciation gifts to personal celebrations, we've had the privilege of being part of thousands of special moments throughout the National Capital Region.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop" 
              alt="Gift box preparation" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=290&h=190&fit=crop" 
                alt="Local artisan products" 
                className="w-full h-32 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1607344645866-009c7d0868e4?w=290&h=190&fit=crop" 
                alt="Gift wrapping" 
                className="w-full h-32 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text--text-light)' }}>
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--color--identity--on-blue)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Quality First</h3>
              <p className="text-sm text-text--text-subtle-light">
                We never compromise on quality, sourcing only the finest products for our gift boxes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <Users className="w-8 h-8" style={{ color: 'var(--color--identity--on-yellow)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Local Support</h3>
              <p className="text-sm text-text--text-subtle-light">
                We proudly support Ottawa-area businesses and artisans in every box we create.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--cyan)' }}>
                <Truck className="w-8 h-8" style={{ color: 'var(--color--identity--on-cyan)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Reliable Service</h3>
              <p className="text-sm text-text--text-subtle-light">
                On-time delivery and exceptional customer service are our top priorities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--red)' }}>
                <Shield className="w-8 h-8" style={{ color: 'var(--color--identity--on-red)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Trust & Care</h3>
              <p className="text-sm text-text--text-subtle-light">
                We handle every order with care and attention to detail, as if it were our own.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-color--accent--line">
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent--ui-accent)' }}>5,000+</div>
              <div className="text-text--text-subtle-light">Happy Customers</div>
            </CardContent>
          </Card>
          <Card className="text-center border-color--accent--line">
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent--ui-accent)' }}>50+</div>
              <div className="text-text--text-subtle-light">Local Partners</div>
            </CardContent>
          </Card>
          <Card className="text-center border-color--accent--line">
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent--ui-accent)' }}>4.9/5</div>
              <div className="text-text--text-subtle-light">Customer Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text--text-light)' }}>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-color--accent--line">
              <CardContent className="p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b172e5f1?w=150&h=150&fit=crop&crop=face" 
                  alt="Sarah Johnson" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Sarah Johnson</h3>
                <p className="text-sm text-accent--ui-accent mb-2">Founder & CEO</p>
                <p className="text-sm text-text--text-subtle-light">
                  Passionate about creating meaningful connections through gifting. Sarah brings 10+ years of retail experience to Ottawa Gift Boxes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-color--accent--line">
              <CardContent className="p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="Michael Chen" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Michael Chen</h3>
                <p className="text-sm text-accent--ui-accent mb-2">Head of Curation</p>
                <p className="text-sm text-text--text-subtle-light">
                  Expert in product sourcing and local partnerships. Michael ensures every item in our boxes meets our high standards.
                </p>
              </CardContent>
            </Card>
            <Card className="border-color--accent--line">
              <CardContent className="p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                  alt="Emma Williams" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Emma Williams</h3>
                <p className="text-sm text-accent--ui-accent mb-2">Customer Experience Manager</p>
                <p className="text-sm text-text--text-subtle-light">
                  Dedicated to ensuring every customer interaction is exceptional. Emma leads our customer service and delivery teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>
            Ready to Create Something Special?
          </h2>
          <p className="text-text--text-subtle-light mb-6 max-w-2xl mx-auto">
            Whether you're celebrating a milestone, expressing gratitude, or just thinking of someone special, we're here to help you create the perfect gift experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="px-8 py-3"
              style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
              onClick={() => navigate('/')}
            >
              Shop Gift Boxes
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface--background-dark text-text--text-dark py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ottawa Gift Boxes</h3>
              <p className="text-text--text-subtle-dark mb-4">
                Premium gift boxes and baskets delivered fresh throughout Ottawa, Ontario. Perfect for corporate gifts, special occasions, and showing someone you care.
              </p>
              <p className="text-sm text-text--text-subtle-dark">
                Serving Ottawa, Gatineau, Kanata, Orleans, Nepean, and surrounding areas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text--text-subtle-dark">
                <li><a href="#" onClick={() => navigate('/')} className="hover:text-white transition-colors cursor-pointer">Gift Boxes</a></li>
                <li><a href="#" onClick={() => navigate('/corporate-gifts')} className="hover:text-white transition-colors cursor-pointer">Corporate Gifts</a></li>
                <li><a href="#" onClick={() => navigate('/shipping')} className="hover:text-white transition-colors cursor-pointer">Shipping Information</a></li>
                <li><a href="#" onClick={() => navigate('/returns')} className="hover:text-white transition-colors cursor-pointer">Returns & Exchanges</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-text--text-subtle-dark">
                <li><a href="#" onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" onClick={() => navigate('/faq')} className="hover:text-white transition-colors cursor-pointer">FAQ</a></li>
                <li><a href="#" onClick={() => navigate('/track-order')} className="hover:text-white transition-colors cursor-pointer">Track Your Order</a></li>
                <li><a href="#" onClick={() => navigate('/corporate-accounts')} className="hover:text-white transition-colors cursor-pointer">Corporate Accounts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-text--text-subtle-dark space-y-2">
                <p>📧 hello@ottawagiftboxes.ca</p>
                <p>📞 (613) 555-GIFT (4438)</p>
                <p>📍 Ottawa, Ontario, Canada</p>
                <p>🕒 Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-color--accent--line text-center text-text--text-subtle-dark">
            <p>&copy; 2025 Ottawa Gift Boxes. All rights reserved. | Premium gift delivery throughout Ottawa, Ontario</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default AboutPage;