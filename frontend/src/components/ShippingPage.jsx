import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, Truck, Clock, MapPin, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';

const ShippingPage = () => {
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
              <a href="#" onClick={() => navigate('/corporate-gifts')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Corporate Gifts</a>
              <a href="#" onClick={() => navigate('/about')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">About Us</a>
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
                <a href="#" onClick={() => navigate('/corporate-gifts')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">Corporate Gifts</a>
                <a href="#" onClick={() => navigate('/about')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">About Us</a>
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
          <span className="text-text--text-light">Shipping Information</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            Shipping & Delivery Information
          </h1>
          <p className="text-xl text-text--text-subtle-light max-w-2xl mx-auto">
            Fast, reliable delivery throughout Ottawa and surrounding areas. Learn about our delivery options, timing, and coverage areas.
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-color--accent--line text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--red)' }}>
                <Clock className="w-8 h-8" style={{ color: 'var(--color--identity--on-red)' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>Same-Day Delivery</h3>
              <p className="text-text--text-subtle-light mb-4">
                Order before 12:00 PM on weekdays or 10:00 AM on weekends for same-day delivery.
              </p>
              <p className="font-semibold" style={{ color: 'var(--accent--ui-accent)' }}>$25 - $35</p>
              <p className="text-sm text-text--text-subtle-light">Subject to availability</p>
            </CardContent>
          </Card>
          
          <Card className="border-color--accent--line text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <Truck className="w-8 h-8" style={{ color: 'var(--color--identity--on-blue)' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>Standard Delivery</h3>
              <p className="text-text--text-subtle-light mb-4">
                Next business day delivery throughout Ottawa and surrounding areas.
              </p>
              <p className="font-semibold" style={{ color: 'var(--accent--ui-accent)' }}>$15 - $25</p>
              <p className="text-sm text-text--text-subtle-light">1-2 business days</p>
            </CardContent>
          </Card>
          
          <Card className="border-color--accent--line text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--green)' }}>
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>Free Delivery</h3>
              <p className="text-text--text-subtle-light mb-4">
                Complimentary delivery on orders over $100 within our standard delivery area.
              </p>
              <p className="font-semibold" style={{ color: 'var(--accent--ui-accent)' }}>FREE</p>
              <p className="text-sm text-text--text-subtle-light">Orders $100+</p>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Areas */}
        <div className="mb-16">
          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 mr-3" style={{ color: 'var(--accent--ui-accent)' }} />
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text--text-light)' }}>Delivery Areas</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Standard Delivery Zone ($15-$20)</h3>
                  <ul className="space-y-2 text-text--text-subtle-light">
                    <li>• Downtown Ottawa</li>
                    <li>• Centretown</li>
                    <li>• Glebe</li>
                    <li>• Westboro</li>
                    <li>• Hintonburg</li>
                    <li>• Little Italy</li>
                    <li>• ByWard Market</li>
                    <li>• Sandy Hill</li>
                    <li>• New Edinburgh</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Extended Delivery Zone ($20-$25)</h3>
                  <ul className="space-y-2 text-text--text-subtle-light">
                    <li>• Kanata & Stittsville</li>
                    <li>• Orleans & Cumberland</li>
                    <li>• Nepean & Barrhaven</li>
                    <li>• Gatineau & Hull</li>
                    <li>• Rockland & Clarence</li>
                    <li>• Manotick & Richmond</li>
                    <li>• Carp & Dunrobin</li>
                    <li>• Russell & Embrun</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm" style={{ color: 'var(--text--text-light)' }}>
                  <strong>Don't see your area listed?</strong> Contact us with your postal code and we'll let you know if we can deliver to your location. We're always expanding our delivery zones!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Schedule */}
        <div className="mb-16">
          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>Delivery Schedule</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Regular Delivery Hours</h3>
                  <div className="space-y-2 text-text--text-subtle-light">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Sunday:</strong> Limited delivery (by request)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Special Delivery Times</h3>
                  <div className="space-y-2 text-text--text-subtle-light">
                    <p><strong>Morning Delivery:</strong> 9:00 AM - 12:00 PM (+$10)</p>
                    <p><strong>Evening Delivery:</strong> 5:00 PM - 8:00 PM (+$10)</p>
                    <p><strong>Holiday Delivery:</strong> Contact for availability</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-color--accent--line">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>Order Processing</h3>
              <ul className="space-y-2 text-text--text-subtle-light text-sm">
                <li>• All orders are processed within 1-2 business days</li>
                <li>• Custom orders may require additional processing time</li>
                <li>• Orders placed after 3:00 PM are processed next business day</li>
                <li>• Weekend orders are processed on Monday</li>
                <li>• You'll receive confirmation and tracking information</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-color--accent--line">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>Delivery Guidelines</h3>
              <ul className="space-y-2 text-text--text-subtle-light text-sm">
                <li>• Someone must be available to receive the delivery</li>
                <li>• We'll call/text 30 minutes before arrival</li>
                <li>• Contactless delivery available upon request</li>
                <li>• Corporate deliveries can be scheduled in advance</li>
                <li>• Special delivery instructions are accommodated</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Holiday Schedule */}
        <div className="mb-16">
          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>Holiday & Peak Season Information</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text--text-light)' }}>Peak Season Adjustments</h3>
                <p className="text-text--text-subtle-light mb-4">
                  During high-demand periods (Valentine's Day, Mother's Day, Christmas, etc.), delivery times may be extended and advance ordering is highly recommended.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text--text-subtle-light">
                  <div>
                    <p><strong>Valentine's Day:</strong> Order 3-5 days in advance</p>
                    <p><strong>Mother's Day:</strong> Order 5-7 days in advance</p>
                  </div>
                  <div>
                    <p><strong>Christmas Season:</strong> Order 7-10 days in advance</p>
                    <p><strong>Other Holidays:</strong> Check website for updates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Questions */}
        <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>Questions About Delivery?</h2>
          <p className="text-text--text-subtle-light mb-6">
            Our customer service team is here to help with any delivery questions or special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
            >
              Contact Customer Service
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/faq')}
            >
              View FAQ
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

export default ShippingPage;