import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle, Truck, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { useCart } from './CartContext';


const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
    orderNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.message) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Optimized navigation handlers
  const handleNavigateHome = useCallback(() => navigate('/'), [navigate]);
  const handleNavigateCorporateGifts = useCallback(() => navigate('/corporate-gifts'), [navigate]);
  const handleNavigateAbout = useCallback(() => navigate('/about'), [navigate]);
  const handleNavigateContact = useCallback(() => navigate('/contact'), [navigate]);
  
  // Optimized modal handlers
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully! 📧",
        description: `Thank you ${formData.firstName}! We've received your message and will respond within 24 hours.`,
        variant: "default",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: '',
        message: '',
        orderNumber: ''
      });
      
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "There was an issue sending your message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our gift specialists",
      contact: "(613) 555-GIFT (4438)",
      subtext: "Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      contact: "hello@ottawagiftboxes.ca",
      subtext: "We respond within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help online",
      contact: "Chat Now",
      subtext: "Available during business hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "See our gift boxes in person",
      contact: "Ottawa, Ontario",
      subtext: "By appointment only"
    }
  ];

  const faqItems = [
    {
      question: "What are your delivery areas?",
      answer: "We deliver throughout Ottawa, Gatineau, Kanata, Orleans, Nepean, and surrounding areas within 50km of downtown Ottawa."
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes! Orders placed before 2 PM Monday-Friday are eligible for same-day delivery. Weekend deliveries are available by special arrangement."
    },
    {
      question: "Can I customize a gift box?",
      answer: "Absolutely! We offer custom gift boxes tailored to your preferences, budget, and occasion. Contact us to discuss your requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal for secure online payments."
    },
    {
      question: "Do you offer corporate gift solutions?",
      answer: "Yes, we specialize in corporate gifts for employee appreciation, client gifts, and special events. Volume discounts are available."
    },
    {
      question: "What is your return policy?",
      answer: "We stand behind our products. If you're not completely satisfied, contact us within 48 hours of delivery for a resolution."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-color--accent--coconut to-white">
      {/* Header - Same as other pages */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-color--accent--line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 
                className="text-2xl font-bold cursor-pointer" 
                style={{ color: 'var(--accent--ui-accent)', fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' }}
                onClick={handleNavigateHome}
              >
                Ottawa Gift Boxes
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={handleNavigateHome} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Shop</button>
              <button onClick={handleNavigateCorporateGifts} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">Corporate Gifts</button>
              <button onClick={handleNavigateAbout} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 cursor-pointer">About Us</button>
              <button className="text-accent--ui-accent font-medium transition-colors duration-200">Contact</button>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
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
                <button onClick={handleNavigateHome} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">Shop</button>
                <button onClick={handleNavigateCorporateGifts} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">Corporate Gifts</button>
                <button onClick={handleNavigateAbout} className="text-text--base hover:text-accent--ui-accent transition-colors duration-200 py-2 cursor-pointer text-left w-full">About Us</button>
                <button className="text-accent--ui-accent font-medium transition-colors duration-200 py-2 text-left w-full">Contact</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
            color: 'var(--text--text-light)', 
            fontFamily: 'Dbsharpgroteskvariable Vf, Arial, sans-serif' 
          }}>
            Contact Us
          </h2>
          <p className="text-lg text-text--text-subtle-light max-w-2xl mx-auto mb-8">
            Have questions about our gift boxes? Need help with an order? We're here to help! 
            Reach out to our friendly team and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-color--accent--line">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color--identity--blue)' }}>
                  <method.icon className="w-6 h-6" style={{ color: 'var(--color--identity--on-blue)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text--text-light)' }}>
                  {method.title}
                </h3>
                <p className="text-sm text-text--text-subtle-light mb-3">
                  {method.description}
                </p>
                <p className="font-medium" style={{ color: 'var(--accent--ui-accent)' }}>
                  {method.contact}
                </p>
                <p className="text-xs text-text--text-subtle-light mt-1">
                  {method.subtext}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-color--accent--line">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Send Us a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(613) 555-0123"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <Label htmlFor="inquiryType">Inquiry Type *</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                    <SelectTrigger className={errors.inquiryType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="delivery">Delivery Question</SelectItem>
                      <SelectItem value="custom">Custom Gift Box</SelectItem>
                      <SelectItem value="corporate">Corporate Gifts</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="compliment">Compliment</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType}</p>}
                </div>

                {/* Order Number (conditional) */}
                {(formData.inquiryType === 'order' || formData.inquiryType === 'delivery' || formData.inquiryType === 'complaint') && (
                  <div>
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                      placeholder="ORDER-1234567890"
                    />
                  </div>
                )}

                {/* Subject */}
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={errors.subject ? 'border-red-500' : ''}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl rounded-xl border-0 relative overflow-hidden group"
                  style={{ 
                    background: 'linear-gradient(135deg, #61525a 0%, #8b7d87 50%, #61525a 100%)',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(97, 82, 90, 0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-bold tracking-wide">Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span className="font-bold tracking-wide">Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Business Information */}
            <Card className="border-color--accent--line">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text--text-light font-medium">Monday - Friday</span>
                    <span className="text-text--text-subtle-light">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text--text-light font-medium">Saturday - Sunday</span>
                    <span className="text-text--text-subtle-light">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text--text-light font-medium">Holidays</span>
                    <span className="text-text--text-subtle-light">Limited Hours</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-color--accent--line">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Same-Day Delivery</span>
                  </div>
                  <p className="text-xs text-text--text-subtle-light">
                    Orders placed before 2 PM Monday-Friday qualify for same-day delivery in Ottawa area.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border-color--accent--line">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b border-color--accent--line pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium mb-2" style={{ color: 'var(--text--text-light)' }}>
                        {faq.question}
                      </h4>
                      <p className="text-sm text-text--text-subtle-light">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-color--accent--coconut rounded-lg">
                  <p className="text-sm text-text--text-subtle-light text-center">
                    Can't find what you're looking for? 
                    <span className="font-medium" style={{ color: 'var(--accent--ui-accent)' }}> Send us a message</span> and we'll help you out!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Special Services */}
            <Card className="border-color--accent--line">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Special Services</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: 'var(--text--text-light)' }}>
                      Custom Gift Boxes
                    </h4>
                    <p className="text-xs text-text--text-subtle-light">
                      Personalized gift boxes tailored to your recipient's preferences
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: 'var(--text--text-light)' }}>
                      Corporate Packages
                    </h4>
                    <p className="text-xs text-text--text-subtle-light">
                      Volume discounts and branded packaging for business gifts
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: 'var(--text--text-light)' }}>
                      Event Planning
                    </h4>
                    <p className="text-xs text-text--text-subtle-light">
                      Consultation for weddings, parties, and special events
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;