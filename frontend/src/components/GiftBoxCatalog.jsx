import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { mockProducts } from '../mock';
import CartModal from './CartModal';
import { useCart } from './CartContext';


const GiftBoxCatalog = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart();

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

  // Optimized navigation handlers
  const handleNavigateHome = useCallback(() => navigate('/'), [navigate]);
  const handleNavigateGiftBaskets = useCallback(() => navigate('/gift-baskets'), [navigate]);
  const handleNavigateCorporateGifts = useCallback(() => navigate('/corporate-gifts'), [navigate]);
  const handleNavigateAbout = useCallback(() => navigate('/about'), [navigate]);
  const handleNavigateContact = useCallback(() => navigate('/contact'), [navigate]);
  const handleNavigateShipping = useCallback(() => navigate('/shipping'), [navigate]);
  const handleNavigateReturns = useCallback(() => navigate('/returns'), [navigate]);
  const handleNavigateFAQ = useCallback(() => navigate('/faq'), [navigate]);
  const handleNavigateTrackOrder = useCallback(() => navigate('/track-order'), [navigate]);
  const handleNavigateCorporateAccounts = useCallback(() => navigate('/corporate-accounts'), [navigate]);
  
  // Optimized modal handlers
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
  }, []);
  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Apply price filter
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'bestSelling':
        filtered.sort((a, b) => {
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return b.totalReviews - a.totalReviews;
        });
        break;
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [sortBy, priceFilter, categoryFilter]);

  const categories = [...new Set(mockProducts.map(product => product.category))];

  // Smooth scroll to top when filters change
  useEffect(() => {
    if (sortBy !== 'featured' || priceFilter !== 'all' || categoryFilter !== 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [sortBy, priceFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white">
      {/* Header */}
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
              <button onClick={handleNavigateHome} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer font-semibold">Shop</button>
              <button onClick={handleNavigateGiftBaskets} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Gift Baskets</button>
              <button onClick={handleNavigateCorporateGifts} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Corporate Gifts</button>
              <button onClick={handleNavigateAbout} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">About Us</button>
              <button onClick={handleNavigateContact} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Contact</button>
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
                onClick={handleCartOpen}
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
                onClick={handleMenuToggle}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-color--accent--line">
              <nav className="flex flex-col space-y-2">
                <button onClick={handleNavigateHome} className="text-accent--ui-accent hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer font-semibold text-left w-full">Shop</button>
                <button onClick={handleNavigateGiftBaskets} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">Gift Baskets</button>
                <button onClick={handleNavigateCorporateGifts} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">Corporate Gifts</button>
                <button onClick={handleNavigateAbout} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">About Us</button>
                <button onClick={handleNavigateContact} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">Contact</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            Premium Gift Boxes
          </h1>
          <p className="text-lg text-text--text-subtle-light max-w-2xl mx-auto mb-8">
            Thoughtfully curated gift boxes delivered fresh throughout Ottawa, Ontario. Same-day delivery available for that perfect last-minute gift!
          </p>
        </div>

        {/* Compact Filters and Sort Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-color--accent--line">
          {/* Results Info */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text--text-subtle-light">
              {filteredAndSortedProducts.length} products
            </span>
          </div>

          {/* Compact Filter Controls */}
          <div className="flex items-center space-x-6">
            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-text--text-subtle-light">Sort:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-8 text-sm border-gray-300 min-w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="bestSelling">Best Selling</SelectItem>
                  <SelectItem value="priceLow">Price: Low to High</SelectItem>
                  <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-text--text-subtle-light">Price:</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="h-8 text-sm border-gray-300 min-w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-150">$100 - $150</SelectItem>
                  <SelectItem value="150">$150 & Above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-text--text-subtle-light">Category:</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-8 text-sm border-gray-300 min-w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-color--accent--line cursor-pointer product-card"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onClick={() => handleProductClick(product.id)}
                    loading={index > 6 ? "lazy" : "eager"}
                  />
                  {product.originalPrice && (
                    <Badge 
                      className="absolute top-3 left-3 text-white"
                      style={{ backgroundColor: 'var(--color--identity--red)' }}
                    >
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </Badge>
                  )}
                  {product.bestSeller && (
                    <Badge 
                      className="absolute top-3 right-3 bg-orange-500 text-white"
                    >
                      Best Seller
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-12 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white transition-all duration-200 ${
                      wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <Heart className={`h-4 w-4 transition-all duration-200 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
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
                <div className="flex items-center justify-between mb-4">
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
                    ⭐ {product.rating} ({product.totalReviews})
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      toast({
                        title: "Added to Cart! 🛒",
                        description: `${product.name} has been added to your cart.`,
                        variant: "default",
                      });
                    }}
                    disabled={!product.inStock}
                  >
                    ADD TO CART
                  </Button>
                  <Button 
                    variant="outline" 
                    className="transition-all duration-200 hover:scale-105"
                    onClick={() => handleProductClick(product.id)}
                  >
                    VIEW
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <Filter className="w-16 h-16 mx-auto text-text--text-subtle-light" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>
              No products found
            </h3>
            <p className="text-text--text-subtle-light mb-6">
              Try adjusting your filters or browse all our amazing products.
            </p>
            <Button 
              onClick={() => {
                setSortBy('featured');
                setPriceFilter('all');
                setCategoryFilter('all');
              }}
              style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg border border-color--accent--line p-8">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text--text-light)' }}>
            Why Choose Ottawa Gift Boxes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Fast Delivery</h3>
              <p className="text-sm text-text--text-subtle-light">
                Same-day delivery available throughout Ottawa and surrounding areas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Premium Quality</h3>
              <p className="text-sm text-text--text-subtle-light">
                Carefully curated items from local Ottawa artisans and premium brands.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--cyan)' }}>
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Personalized</h3>
              <p className="text-sm text-text--text-subtle-light">
                Add custom messages and personalized touches to make every gift special.
              </p>
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Special Offer: Free Delivery on Orders Over $100!</h2>
          <p className="text-lg mb-6 opacity-90">
            Treat yourself or someone special with our premium gift boxes. Limited time offer!
          </p>
          <Button 
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
            onClick={() => navigate('/corporate-gifts')}
          >
            Shop Now
          </Button>
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
                <li><button onClick={handleNavigateHome} className="hover:text-white transition-colors cursor-pointer text-left w-full">Gift Boxes</button></li>
                <li><button onClick={handleNavigateCorporateGifts} className="hover:text-white transition-colors cursor-pointer text-left w-full">Corporate Gifts</button></li>
                <li><button onClick={handleNavigateShipping} className="hover:text-white transition-colors cursor-pointer text-left w-full">Same-Day Delivery</button></li>
                <li><button onClick={handleNavigateShipping} className="hover:text-white transition-colors cursor-pointer text-left w-full">Shipping Information</button></li>
                <li><button onClick={handleNavigateReturns} className="hover:text-white transition-colors cursor-pointer text-left w-full">Returns & Exchanges</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-text--text-subtle-dark">
                <li><button onClick={handleNavigateContact} className="hover:text-white transition-colors cursor-pointer text-left w-full">Contact Us</button></li>
                <li><button onClick={handleNavigateFAQ} className="hover:text-white transition-colors cursor-pointer text-left w-full">FAQ</button></li>
                <li><button onClick={handleNavigateTrackOrder} className="hover:text-white transition-colors cursor-pointer text-left w-full">Track Your Order</button></li>
                <li><button onClick={handleNavigateCorporateAccounts} className="hover:text-white transition-colors cursor-pointer text-left w-full">Corporate Accounts</button></li>
                <li><button onClick={handleNavigateCorporateGifts} className="hover:text-white transition-colors cursor-pointer text-left w-full">Bulk Orders</button></li>
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
        onClose={handleCartClose}
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default GiftBoxCatalog;