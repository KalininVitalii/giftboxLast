import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, RefreshCw, Shield, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';

const ReturnsPage = () => {
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
          <span className="text-text--text-light">Returns & Exchanges</span>
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
            Returns & Exchanges
          </h1>
          <p className="text-xl text-text--text-subtle-light max-w-2xl mx-auto">
            Your satisfaction is our priority. Learn about our return policy and how we handle any issues with your gift orders.
          </p>
        </div>

        {/* Policy Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-color--accent--line text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--green)' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>100% Satisfaction</h3>
              <p className="text-text--text-subtle-light">
                We stand behind every gift. If you're not completely satisfied, we'll make it right.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-color--accent--line text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <RefreshCw className="w-8 h-8" style={{ color: 'var(--color--identity--on-blue)' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>Quick Resolution</h3>
              <p className="text-text--text-subtle-light">
                Contact us within 24 hours of delivery and we'll resolve any issues immediately.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-color--accent--line text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <MessageSquare className="w-8 h-8" style={{ color: 'var(--color--identity--on-yellow)' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>Easy Process</h3>
              <p className="text-text--text-subtle-light">
                Simple contact process - just reach out to our customer service team and we'll handle the rest.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Return Policy Details */}
        <div className="space-y-8">
          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <CheckCircle2 className="w-6 h-6 mr-3 text-green-600" />
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text--text-light)' }}>When We'll Replace or Refund</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Quality Issues</h3>
                  <ul className="space-y-2 text-text--text-subtle-light">
                    <li>• Damaged items upon arrival</li>
                    <li>• Expired or spoiled perishable items</li>
                    <li>• Missing items from your order</li>
                    <li>• Items that don't match the description</li>
                    <li>• Packaging that arrived severely damaged</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Delivery Issues</h3>
                  <ul className="space-y-2 text-text--text-subtle-light">
                    <li>• Order delivered to wrong address (our error)</li>
                    <li>• Significant delivery delays beyond our control</li>
                    <li>• Package not delivered on promised date</li>
                    <li>• Delivery attempted but recipient unavailable (we'll reschedule)</li>
                    <li>• Weather-related delivery issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text--text-light)' }}>Important Considerations</h2>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text--text-light)' }}>Due to the Nature of Our Products</h3>
                <p className="text-text--text-subtle-light mb-4">
                  Since our gift boxes contain perishable items and personalized components, we cannot accept returns for change of mind, incorrect recipient preferences, or buyer's remorse. However, we're committed to resolving any legitimate quality or delivery issues.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>What We Cannot Return</h3>
                  <ul className="space-y-2 text-text--text-subtle-light">
                    <li>• Items consumed or partially consumed</li>
                    <li>• Personalized or custom gift messages</li>
                    <li>• Change of mind after delivery</li>
                    <li>• Recipient doesn't like specific items</li>
                    <li>• Dietary preferences not specified at order time</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>Time Limits</h3>
                  <ul className="space-y-2 text-text--text-subtle-light">
                    <li>• Report issues within 24 hours of delivery</li>
                    <li>• Provide photos for damaged/incorrect items</li>
                    <li>• Contact us before the recipient consumes items</li>
                    <li>• Corporate orders: 48-hour reporting window</li>
                    <li>• Holiday orders: same-day reporting preferred</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resolution Options */}
          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>How We'll Make It Right</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--green)' }}>
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Replacement</h3>
                  <p className="text-sm text-text--text-subtle-light">
                    Send a brand new replacement gift box at no additional charge, often same-day or next-day.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                    <span className="text-white font-bold text-lg">$</span>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Full Refund</h3>
                  <p className="text-sm text-text--text-subtle-light">
                    Process a complete refund to your original payment method within 3-5 business days.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                    <span className="text-black font-bold text-lg">%</span>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Store Credit</h3>
                  <p className="text-sm text-text--text-subtle-light">
                    Provide store credit with a bonus amount that you can use for future purchases.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Report Issues */}
          <Card className="border-color--accent--line">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>How to Report an Issue</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--accent--ui-accent)' }}>1</div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Contact Us Immediately</h3>
                    <p className="text-text--text-subtle-light">
                      Reach out within 24 hours of delivery via phone, email, or our contact form. The sooner you contact us, the faster we can resolve the issue.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--accent--ui-accent)' }}>2</div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Provide Order Details</h3>
                    <p className="text-text--text-subtle-light">
                      Have your order number, recipient details, and delivery date ready. This helps us quickly locate your order and understand the situation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--accent--ui-accent)' }}>3</div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Send Photos (If Applicable)</h3>
                    <p className="text-text--text-subtle-light">
                      For damaged, incorrect, or missing items, please provide clear photos. This helps us process your claim quickly and improve our packaging.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--accent--ui-accent)' }}>4</div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>We'll Resolve It Fast</h3>
                    <p className="text-text--text-subtle-light">
                      Our team will review your case and typically respond within 2-4 hours with a resolution plan. Most issues are resolved the same day.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-8 text-center mt-16">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>Need to Report an Issue?</h2>
          <p className="text-text--text-subtle-light mb-8 max-w-2xl mx-auto">
            Our customer service team is standing by to help resolve any issues with your order quickly and fairly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--red)' }}>
                <span className="text-lg text-white">📞</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Call for Urgent Issues</h3>
              <p className="text-text--text-subtle-light">(613) 555-GIFT (4438)</p>
              <p className="text-sm text-text--text-subtle-light">Mon-Fri: 8AM-7PM | Sat-Sun: 9AM-5PM</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <span className="text-lg text-white">📧</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Email with Photos</h3>
              <p className="text-text--text-subtle-light">support@ottawagiftboxes.ca</p>
              <p className="text-sm text-text--text-subtle-light">2-4 hour response time</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <span className="text-lg">📝</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Online Form</h3>
              <p className="text-text--text-subtle-light">Detailed issue reporting</p>
              <p className="text-sm text-text--text-subtle-light">Include photos and order details</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              style={{ backgroundColor: 'var(--color--identity--red)', color: 'white' }}
            >
              Report an Issue Now
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/faq')}
            >
              Check FAQ First
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

export default ReturnsPage;