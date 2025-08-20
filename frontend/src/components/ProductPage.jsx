import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, ChevronLeft, ChevronRight, Calendar, MessageSquare, Package, ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { mockProducts, mockReviews } from '../mock';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { StarRating, ReviewForm, ReviewsList, ReviewSummary } from './ReviewSystem';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedDay, setSelectedDay] = useState('2');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Load reviews for this product
      setReviews(mockReviews[parseInt(id)] || []);
      
      // Set SEO meta tags
      document.title = `${foundProduct.name} - Ottawa Gift Boxes | Premium Gift Baskets Ottawa`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${foundProduct.description} - Premium gift boxes and baskets delivery in Ottawa, Ontario. $${foundProduct.price}`);
      }
    }
  }, [id]);

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

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const getOrdinalSuffix = (day) => {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const deliveryDate = `${selectedYear} ${selectedMonth} ${selectedDay}${getOrdinalSuffix(selectedDay)}`;
    
    addToCart(product, quantity, deliveryDate, giftMessage);
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} (Qty: ${quantity}) has been added to your cart.`,
      variant: "default",
    });
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist! 💖",
      description: isWishlisted ? "Item removed from your wishlist." : "Item added to your wishlist.",
      variant: "default",
    });
  };

  const handleBuyNow = () => {
    const deliveryDate = `${selectedYear} ${selectedMonth} ${selectedDay}${getOrdinalSuffix(selectedDay)}`;
    
    // Add to cart first
    addToCart(product, quantity, deliveryDate, giftMessage);
    
    // Show success message
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Thank you! Your order for ${product.name} (Qty: ${quantity}) totaling $${(product.price * quantity * 1.13).toFixed(2)} (including HST) has been placed. Delivery date: ${deliveryDate}.`,
      variant: "default",
    });
    
    // Redirect to catalog after a short delay
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  };

  const handleReviewSubmit = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    // Update product rating
    const allReviews = [newReview, ...reviews];
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
    setProduct(prev => ({ ...prev, rating: avgRating, totalReviews: allReviews.length }));
  };

  const handleHelpfulClick = (reviewId, isHelpful) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            [isHelpful ? 'helpful' : 'notHelpful']: review[isHelpful ? 'helpful' : 'notHelpful'] + 1 
          }
        : review
    ));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text--text-light mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')} style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : product.rating;

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
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setWishlist([])}
              >
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
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Gift Baskets</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Corporate Gifts</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">About Us</a>
                <a href="#" className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2">Contact</a>
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
            Shop
          </button>
          <span>›</span>
          <span className="text-text--text-light">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {product.originalPrice && (
                <Badge 
                  className="absolute top-4 left-4 text-white"
                  style={{ backgroundColor: 'var(--color--identity--red)' }}
                >
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </Badge>
              )}
            </div>
            
            {/* Thumbnail images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex 
                        ? 'border-accent--ui-accent' 
                        : 'border-color--accent--line hover:border-accent--ui-accent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant="outline" 
                  className="text-sm"
                  style={{ borderColor: 'var(--color--accent--line)', color: 'var(--text--text-subtle-light)' }}
                >
                  {product.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddToWishlist}
                  className={`${isWishlisted ? 'text-red-500' : 'text-gray-600'}`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text--text-light)', fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' }}>
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold" style={{ color: 'var(--accent--ui-accent)' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-text--text-subtle-light line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <StarRating rating={Math.round(averageRating)} readonly size="md" />
                  <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-text--text-subtle-light">
                    ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
              
              <p className="text-text--text-subtle-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Delivery Date Selection */}
            <Card className="border-color--accent--line">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent--ui-accent" />
                  <h3 className="font-semibold" style={{ color: 'var(--text--text-light)' }}>
                    Requested Delivery Date (Monday-Friday): *
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jan">Jan</SelectItem>
                      <SelectItem value="Feb">Feb</SelectItem>
                      <SelectItem value="Mar">Mar</SelectItem>
                      <SelectItem value="Apr">Apr</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="Jun">Jun</SelectItem>
                      <SelectItem value="Jul">Jul</SelectItem>
                      <SelectItem value="Aug">Aug</SelectItem>
                      <SelectItem value="Sep">Sep</SelectItem>
                      <SelectItem value="Oct">Oct</SelectItem>
                      <SelectItem value="Nov">Nov</SelectItem>
                      <SelectItem value="Dec">Dec</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Gift Message */}
            <Card className="border-color--accent--line">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-accent--ui-accent" />
                  <h3 className="font-semibold" style={{ color: 'var(--text--text-light)' }}>
                    Gift Message (Includes Standard Greeting Card): *
                  </h3>
                </div>
                <Textarea
                  placeholder="Enter your personalized gift message here..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="min-h-[100px] border-color--accent--line"
                />
              </CardContent>
            </Card>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-accent--ui-accent" />
                <label className="font-semibold" style={{ color: 'var(--text--text-light)' }}>
                  Quantity:
                </label>
              </div>
              <Select value={String(quantity)} onValueChange={(value) => setQuantity(parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--text--text-light)',
                  color: 'var(--text--text-dark)'
                }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                ADD TO CART
              </Button>
              
              <Button 
                className="w-full py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color--identity--red)',
                  color: 'var(--text--text-dark)'
                }}
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                BUY NOW
              </Button>
            </div>

            {/* Product Info */}
            <Card className="border-color--accent--line">
              <CardContent className="p-6">
                <div className="space-y-3 text-sm text-text--text-subtle-light">
                  <div className="flex justify-between">
                    <span>Delivery Area:</span>
                    <span className="font-medium">Ottawa & Surrounding Areas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-medium">1-2 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Free Shipping:</span>
                    <span className="font-medium">Orders over $100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability:</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-color--accent--line mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'details'
                  ? 'border-accent--ui-accent text-accent--ui-accent'
                  : 'border-transparent text-text--text-subtle-light hover:text-text--text-light hover:border-gray-300'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'border-accent--ui-accent text-accent--ui-accent'
                  : 'border-transparent text-text--text-subtle-light hover:text-text--text-light hover:border-gray-300'
              }`}
            >
              Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('write-review')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'write-review'
                  ? 'border-accent--ui-accent text-accent--ui-accent'
                  : 'border-transparent text-text--text-subtle-light hover:text-text--text-light hover:border-gray-300'
              }`}
            >
              Write Review
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'details' && (
            <Card className="border-color--accent--line">
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text--text-light)' }}>
                    Product Details
                  </h3>
                  <p className="text-text--text-subtle-light leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: 'var(--text--text-light)' }}>
                        What's Included
                      </h4>
                      <ul className="space-y-2 text-text--text-subtle-light">
                        <li>• Premium gift items carefully curated by our team</li>
                        <li>• Beautiful presentation packaging</li>
                        <li>• Personalized greeting card with your message</li>
                        <li>• Eco-friendly protective materials</li>
                        <li>• Care instructions for delicate items</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: 'var(--text--text-light)' }}>
                        Perfect For
                      </h4>
                      <ul className="space-y-2 text-text--text-subtle-light">
                        <li>• Birthday celebrations</li>
                        <li>• Anniversaries and special occasions</li>
                        <li>• Thank you gifts</li>
                        <li>• Corporate appreciation</li>
                        <li>• Holiday gifting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <div>
              <ReviewSummary reviews={reviews} averageRating={averageRating} />
              <ReviewsList reviews={reviews} onHelpfulClick={handleHelpfulClick} />
            </div>
          )}

          {activeTab === 'write-review' && (
            <ReviewForm productId={product.id} onReviewSubmit={handleReviewSubmit} />
          )}
        </div>
      </main>

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

export default ProductPage;