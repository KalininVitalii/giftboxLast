import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, Package, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';

const TrackOrderPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart();

  const handleCheckout = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13;
    const grandTotal = subtotal + tax;
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Thank you! Your order totaling $${grandTotal.toFixed(2)} has been placed. You'll receive a confirmation email shortly.`,
      variant: "default",
    });
    
    clearCart();
    setIsCartOpen(false);
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock tracking data - in real app, this would come from your backend
      const mockTrackingData = {
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: 'Tomorrow, Jan 15th by 5:00 PM',
        recipient: 'Sarah Johnson',
        address: '123 Main Street, Ottawa, ON K1A 0A9',
        items: [
          { name: 'Premium Gourmet Gift Box', quantity: 1, price: 89.99 },
          { name: 'Artisan Chocolate Collection', quantity: 2, price: 45.00 }
        ],
        timeline: [
          {
            status: 'Order Placed',
            timestamp: 'Jan 12th, 2:30 PM',
            description: 'Your order has been confirmed and payment processed.',
            completed: true
          },
          {
            status: 'Processing',
            timestamp: 'Jan 13th, 9:15 AM',
            description: 'Your gift box is being carefully prepared and packaged.',
            completed: true
          },
          {
            status: 'Out for Delivery',
            timestamp: 'Jan 14th, 8:00 AM',
            description: 'Your package is on the delivery truck and heading to the recipient.',
            completed: true
          },
          {
            status: 'Delivered',
            timestamp: 'Estimated: Jan 15th by 5:00 PM',
            description: 'Package will be delivered to the specified address.',
            completed: false
          }
        ]
      };
      
      setTrackingResult(mockTrackingData);
      setIsTracking(false);
      toast({
        title: "Order Found! 📦",
        description: "Your order tracking information has been loaded.",
        variant: "default",
      });
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600';
      case 'out for delivery':
      case 'in transit':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      case 'order placed':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
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
                <a href="#" onClick={() => navigate('/gift-baskets')} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer">Gift Baskets</a>
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
          <span className="text-text--text-light">Track Your Order</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            Track Your Order
          </h1>
          <p className="text-xl text-text--text-subtle-light max-w-2xl mx-auto">
            Enter your order details below to get real-time updates on your gift delivery status.
          </p>
        </div>

        {/* Tracking Form */}
        {!trackingResult && (
          <Card className="border-color--accent--line mb-12">
            <CardContent className="p-8">
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Order Number *
                    </label>
                    <Input
                      required
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g., OGB-2025-001234"
                      className="text-lg"
                    />
                    <p className="text-sm text-text--text-subtle-light mt-1">
                      Found in your confirmation email
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="text-lg"
                    />
                    <p className="text-sm text-text--text-subtle-light mt-1">
                      Email used when placing the order
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isTracking}
                  className="w-full py-3 text-lg"
                  style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
                >
                  {isTracking ? 'Tracking...' : 'Track Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-8">
            {/* Order Summary */}
            <Card className="border-color--accent--line">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text--text-light)' }}>
                      Order #{trackingResult.orderNumber}
                    </h2>
                    <p className="text-text--text-subtle-light">Delivering to {trackingResult.recipient}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={`text-lg px-4 py-2 ${getStatusColor(trackingResult.status)}`}
                      style={{ backgroundColor: 'var(--color--accent--coconut)' }}
                    >
                      {trackingResult.status}
                    </Badge>
                    <p className="text-sm text-text--text-subtle-light mt-1">
                      ETA: {trackingResult.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text--text-light)' }}>Delivery Address</h3>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-text--text-subtle-light" />
                      <p className="text-text--text-subtle-light">{trackingResult.address}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--text--text-light)' }}>Order Items</h3>
                    <div className="space-y-2">
                      {trackingResult.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-text--text-light">{item.quantity}x {item.name}</span>
                          <span className="text-text--text-subtle-light">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card className="border-color--accent--line">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>
                  Order Timeline
                </h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {trackingResult.timeline.map((step, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                          step.completed 
                            ? 'bg-green-100 border-green-500' 
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        
                        <div className="ml-6 flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold ${
                              step.completed ? 'text-text--text-light' : 'text-text--text-subtle-light'
                            }`}>
                              {step.status}
                            </h3>
                            <span className="text-sm text-text--text-subtle-light">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="text-text--text-subtle-light">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setTrackingResult(null);
                  setOrderNumber('');
                  setEmail('');
                }}
                variant="outline"
              >
                Track Another Order
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
              >
                Contact Support
              </Button>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!trackingResult && (
          <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>
              Need Help Finding Your Order?
            </h2>
            <p className="text-text--text-subtle-light mb-6 max-w-2xl mx-auto">
              Can't find your order number or having trouble tracking? Our customer service team is here to help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                  <span className="text-lg">📞</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Call Us</h3>
                <p className="text-text--text-subtle-light">(613) 555-GIFT (4438)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                  <span className="text-lg">📧</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Email Us</h3>
                <p className="text-text--text-subtle-light">hello@ottawagiftboxes.ca</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--cyan)' }}>
                  <span className="text-lg">❓</span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>FAQ</h3>
                <p className="text-text--text-subtle-light">Common questions</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
              >
                Contact Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/faq')}
              >
                View FAQ
              </Button>
            </div>
          </div>
        )}
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

export default TrackOrderPage;