import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';
import { mockProducts } from '../mock';

const GiftBasketsPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter products for gift baskets (category includes "Basket" or "Gift")
  const basketProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => 
      product.category.toLowerCase().includes('basket') || 
      product.category.toLowerCase().includes('gift') ||
      product.name.toLowerCase().includes('basket')
    );

    // Apply price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [sortBy, priceRange]);

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
              <a href="#" onClick={() => navigate('/gift-baskets')} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer font-semibold">Gift Baskets</a>
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
                <a href="#" onClick={() => navigate('/gift-baskets')} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer font-semibold">Gift Baskets</a>
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
          <span className="text-text--text-light">Gift Baskets</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            Premium Gift Baskets
          </h1>
          <p className="text-lg text-text--text-subtle-light max-w-2xl mx-auto mb-6">
            Thoughtfully curated gift baskets filled with premium local products and artisanal treats. Perfect for any occasion and delivered fresh throughout Ottawa.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white rounded-lg shadow-lg border border-color--accent--line p-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-text--text-subtle-light" />
            <span className="font-medium" style={{ color: 'var(--text--text-light)' }}>
              {basketProducts.length} Gift Baskets Available
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-text--text-subtle-light">Sort by:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-text--text-subtle-light">Price:</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200">$200 & Above</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {basketProducts.map((product) => (
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
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-gray-800 text-white">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  
                  {/* Image counter if multiple images */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      1/{product.images.length}
                    </div>
                  )}
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
                  Click to view details & customize
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {basketProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>
              No gift baskets found
            </h3>
            <p className="text-text--text-subtle-light mb-6">
              Try adjusting your filters or browse all our gift boxes.
            </p>
            <Button 
              onClick={() => navigate('/')}
              style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
            >
              View All Products
            </Button>
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

export default GiftBasketsPage;