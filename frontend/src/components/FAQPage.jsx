import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useCart } from './CartContext';
import CartModal from './CartModal';
import { useToast } from '../hooks/use-toast';

const FAQPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
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

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqData = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "What areas do you deliver to?",
          answer: "We deliver throughout Ottawa and surrounding areas including Gatineau, Kanata, Orleans, Nepean, Barrhaven, and Stittsville. For specific delivery zones, please contact us with your postal code."
        },
        {
          question: "Do you offer same-day delivery?",
          answer: "Yes! Same-day delivery is available for orders placed before 12:00 PM on weekdays and 10:00 AM on weekends, subject to availability. A rush delivery fee may apply."
        },
        {
          question: "How much does shipping cost?",
          answer: "Delivery fees vary by location. Local Ottawa delivery is typically $15-25. We offer free delivery for orders over $100 within our standard delivery area."
        },
        {
          question: "Can I schedule a delivery for a specific date?",
          answer: "Absolutely! You can select your preferred delivery date during checkout. We deliver Monday through Saturday and can accommodate special delivery timing requests."
        },
        {
          question: "How do I track my order?",
          answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account or contact us directly for order updates."
        }
      ]
    },
    {
      category: "Products & Customization",
      questions: [
        {
          question: "Can I customize the contents of a gift box?",
          answer: "While our gift boxes are carefully curated, we can accommodate special requests for dietary restrictions or allergies. For custom boxes, please contact us directly to discuss options."
        },
        {
          question: "Do you accommodate dietary restrictions?",
          answer: "Yes! We offer options for common dietary needs including gluten-free, vegan, nut-free, and diabetic-friendly items. Please note any restrictions in the gift message section or contact us directly."
        },
        {
          question: "Can I add a personalized message?",
          answer: "Absolutely! Every gift includes a personalized greeting card with your message. You can add your message during the checkout process."
        },
        {
          question: "Are your products locally sourced?",
          answer: "We prioritize local Ottawa-area businesses and artisans whenever possible. Each gift box features a mix of local and premium national brands, clearly identified on our product descriptions."
        },
        {
          question: "What if the recipient doesn't like their gift?",
          answer: "Customer satisfaction is our priority. If there are any issues with your gift, please contact us within 7 days and we'll make it right with a replacement or store credit."
        }
      ]
    },
    {
      category: "Corporate & Bulk Orders",
      questions: [
        {
          question: "Do you offer discounts for bulk orders?",
          answer: "Yes! We offer volume discounts starting at 10+ items, with increasing savings for larger quantities. Contact our corporate team for custom pricing on orders over 25 items."
        },
        {
          question: "Can you add our company branding?",
          answer: "Absolutely! We offer custom branding options including company logo on greeting cards, custom ribbon colors, and branded packaging for corporate orders."
        },
        {
          question: "What's the minimum order for corporate gifts?",
          answer: "There's no minimum order requirement, but volume pricing begins at 10 items. We work with businesses of all sizes from small teams to large corporations."
        },
        {
          question: "How far in advance should I place a corporate order?",
          answer: "For best availability and custom branding options, we recommend placing corporate orders at least 1-2 weeks in advance. Rush orders may be possible depending on quantity and season."
        }
      ]
    },
    {
      category: "Payment & Returns",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for corporate accounts, we can arrange invoicing with net-30 terms."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes! We use industry-standard SSL encryption and PCI-compliant payment processing to ensure your payment information is completely secure."
        },
        {
          question: "Can I return or exchange items?",
          answer: "Due to the perishable nature of many items, we don't accept returns. However, if there's an issue with your order, please contact us within 24 hours and we'll make it right."
        },
        {
          question: "What if my gift arrives damaged?",
          answer: "We package everything carefully, but if your gift arrives damaged, please contact us immediately with photos. We'll arrange a replacement or full refund right away."
        }
      ]
    }
  ];

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
          <span className="text-text--text-light">FAQ</span>
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text--text-subtle-light max-w-2xl mx-auto mb-8">
            Find answers to common questions about our gift boxes, delivery, and services. Can't find what you're looking for? Contact us directly!
          </p>
          <Button 
            onClick={() => navigate('/contact')}
            style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
          >
            Contact Support
          </Button>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text--text-light)' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = `${categoryIndex}-${faqIndex}`;
                  const isExpanded = expandedFAQ === globalIndex;
                  
                  return (
                    <Card key={faqIndex} className="border-color--accent--line">
                      <CardContent className="p-0">
                        <button
                          className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => toggleFAQ(globalIndex)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg pr-8" style={{ color: 'var(--text--text-light)' }}>
                              {faq.question}
                            </h3>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-text--text-subtle-light flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-text--text-subtle-light flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-6">
                            <p className="text-text--text-subtle-light leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg border border-color--accent--line p-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text--text-light)' }}>
            Still Have Questions?
          </h2>
          <p className="text-text--text-subtle-light mb-6 max-w-2xl mx-auto">
            Our friendly customer service team is here to help! Reach out to us through any of the following methods and we'll get back to you promptly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                <span className="text-lg">📞</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Call Us</h3>
              <p className="text-text--text-subtle-light">(613) 555-GIFT (4438)</p>
              <p className="text-sm text-text--text-subtle-light">Mon-Fri: 9AM-6PM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--yellow)' }}>
                <span className="text-lg">📧</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Email Us</h3>
              <p className="text-text--text-subtle-light">hello@ottawagiftboxes.ca</p>
              <p className="text-sm text-text--text-subtle-light">24-48 hour response</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--cyan)' }}>
                <span className="text-lg">💬</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>Live Chat</h3>
              <p className="text-text--text-subtle-light">Available on our website</p>
              <p className="text-sm text-text--text-subtle-light">Mon-Fri: 9AM-5PM</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/contact')}
            style={{ backgroundColor: 'var(--accent--ui-accent)', color: 'var(--text--text-dark)' }}
          >
            Contact Us Now
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

export default FAQPage;