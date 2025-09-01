import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, Building2, Users, Award, Clock, MessageSquare, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';
import { mockProducts } from '../mock';

const CorporateGiftsPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    budget: '',
    occasion: '',
    message: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart();

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
        variant: "default",
      });
    } else {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to Wishlist!",
        description: "Item has been added to your wishlist.",
        variant: "default",
      });
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted! 📋",
      description: "Thank you for your interest! Our corporate team will contact you within 24 hours with a custom quote.",
      variant: "default",
    });
    setQuoteForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      quantity: '',
      budget: '',
      occasion: '',
      message: ''
    });
    setShowQuoteForm(false);
  };

  const handleQuoteFormChange = (field, value) => {
    setQuoteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Filter products suitable for corporate gifts (higher price point or professional appearance)
  const corporateProducts = mockProducts.filter(product => 
    product.price >= 75 || 
    product.category.toLowerCase().includes('premium') ||
    product.category.toLowerCase().includes('luxury') ||
    product.name.toLowerCase().includes('executive') ||
    product.name.toLowerCase().includes('professional')
  );

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
              <a href="#" onClick={() => navigate('/corporate-gifts')} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer font-semibold">Corporate Gifts</a>
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
                <a href="#" onClick={() => navigate('/corporate-gifts')} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer font-semibold">Corporate Gifts</a>
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
          <span className="text-text--text-light">Corporate Gifts</span>
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
            Corporate Gifts & Employee Appreciation
          </h1>
          <p className="text-xl text-text--text-subtle-light max-w-3xl mx-auto mb-8 leading-relaxed">
            Strengthen business relationships and show appreciation with our premium corporate gift solutions. From client appreciation to employee recognition, we help you make lasting impressions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="px-8 py-3 text-lg"
              style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
              onClick={() => setShowQuoteForm(true)}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Get Custom Quote
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Speak with Our Team
            </Button>
          </div>
        </div>

        {/* Corporate Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg border border-color--accent--line p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text--text-light)' }}>
            Why Choose Our Corporate Gift Solutions?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <Building2 className="w-8 h-8" style={{ color: 'var(--color--identity--on-blue)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Volume Discounts</h3>
              <p className="text-sm text-text--text-subtle-light">
                Special pricing for bulk orders starting at 10+ items. The more you order, the more you save.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <Users className="w-8 h-8" style={{ color: 'var(--color--identity--on-yellow)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Custom Branding</h3>
              <p className="text-sm text-text--text-subtle-light">
                Add your company logo, colors, and custom messages to create branded gift experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--cyan)' }}>
                <Clock className="w-8 h-8" style={{ color: 'var(--color--identity--on-cyan)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Dedicated Support</h3>
              <p className="text-sm text-text--text-subtle-light">
                Personal account manager to handle all your corporate gifting needs and deadlines.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--red)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--color--identity--on-red)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Premium Quality</h3>
              <p className="text-sm text-text--text-subtle-light">
                Carefully selected premium items that reflect your company's commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Occasions Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text--text-light)' }}>
            Perfect for Every Business Occasion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-color--accent--line">
              <CardContent className="p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop" 
                  alt="Client appreciation" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Client Appreciation</h3>
                <p className="text-sm text-text--text-subtle-light">
                  Thank valued clients and strengthen business relationships with thoughtful gifts that show you care.
                </p>
              </CardContent>
            </Card>
            <Card className="border-color--accent--line">
              <CardContent className="p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop" 
                  alt="Employee recognition" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Employee Recognition</h3>
                <p className="text-sm text-text--text-subtle-light">
                  Celebrate achievements, milestones, and show appreciation for your team's hard work and dedication.
                </p>
              </CardContent>
            </Card>
            <Card className="border-color--accent--line">
              <CardContent className="p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop" 
                  alt="Holiday gifting" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Holiday & Seasonal</h3>
                <p className="text-sm text-text--text-subtle-light">
                  Spread joy during holidays and special occasions with carefully curated seasonal gift collections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Corporate Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text--text-light)' }}>
            Featured Corporate Gift Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateProducts.slice(0, 6).map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-color--accent--line cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <Badge 
                        className="absolute top-3 left-3 text-white"
                        style={{ backgroundColor: 'var(--color--identity--red)' }}
                      >
                        Save ${(product.originalPrice - product.price).toFixed(0)}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white ${
                        wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                      Corporate Suitable
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ borderColor: 'var(--color--accent--line)', color: 'var(--text--text-subtle-light)' }}
                    >
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text--text-light)' }}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-text--text-subtle-light mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold" style={{ color: 'var(--accent--ui-accent)' }}>
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-text--text-subtle-light line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-text--text-subtle-light">
                      ⭐ {product.rating}
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-text--text-subtle-light text-center">
                    Volume discounts available
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-color--accent--line">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text--text-light)' }}>
                    Request Corporate Quote
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowQuoteForm(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <form onSubmit={handleQuoteSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Contact Name *
                    </label>
                    <Input
                      required
                      value={quoteForm.name}
                      onChange={(e) => handleQuoteFormChange('name', e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Company Name *
                    </label>
                    <Input
                      required
                      value={quoteForm.company}
                      onChange={(e) => handleQuoteFormChange('company', e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => handleQuoteFormChange('email', e.target.value)}
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={quoteForm.phone}
                      onChange={(e) => handleQuoteFormChange('phone', e.target.value)}
                      placeholder="(613) 555-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Estimated Quantity *
                    </label>
                    <Input
                      required
                      value={quoteForm.quantity}
                      onChange={(e) => handleQuoteFormChange('quantity', e.target.value)}
                      placeholder="e.g., 25-50 gifts"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                      Budget Range *
                    </label>
                    <Input
                      required
                      value={quoteForm.budget}
                      onChange={(e) => handleQuoteFormChange('budget', e.target.value)}
                      placeholder="e.g., $75-$150 per gift"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                    Occasion/Purpose *
                  </label>
                  <Input
                    required
                    value={quoteForm.occasion}
                    onChange={(e) => handleQuoteFormChange('occasion', e.target.value)}
                    placeholder="e.g., Client appreciation, Employee recognition, Holiday gifts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                    Additional Requirements
                  </label>
                  <Textarea
                    value={quoteForm.message}
                    onChange={(e) => handleQuoteFormChange('message', e.target.value)}
                    placeholder="Please describe any special requirements, branding needs, dietary restrictions, or other important details..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit"
                    className="flex-1"
                    style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
                  >
                    Submit Quote Request
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowQuoteForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
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

export default CorporateGiftsPage;