import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, User, Calendar, CheckCircle, Camera, X, Image } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'md' }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} cursor-pointer transition-colors ${
            star <= (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          } ${readonly ? 'cursor-default' : 'hover:text-yellow-400'}`}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    review: '',
    name: '',
    email: '',
    verified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rating) newErrors.rating = 'Please select a rating';
    if (!formData.title) newErrors.title = 'Review title is required';
    if (!formData.review || formData.review.length < 10) newErrors.review = 'Review must be at least 10 characters';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newReview = {
        id: Date.now(),
        productId,
        rating: formData.rating,
        title: formData.title,
        review: formData.review,
        reviewerName: formData.name,
        reviewerEmail: formData.email,
        date: new Date().toISOString(),
        verified: Math.random() > 0.3, // 70% chance of verified purchase
        helpful: Math.floor(Math.random() * 15),
        notHelpful: Math.floor(Math.random() * 3)
      };
      
      onReviewSubmit(newReview);
      
      toast({
        title: "Review Submitted! ⭐",
        description: "Thank you for your feedback! Your review will help other customers.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        rating: 0,
        title: '',
        review: '',
        name: '',
        email: '',
        verified: false
      });
      
    } catch (error) {
      toast({
        title: "Failed to Submit Review",
        description: "There was an issue submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-color--accent--line">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label>Your Rating *</Label>
            <div className="flex items-center space-x-2 mt-2">
              <StarRating 
                rating={formData.rating} 
                onRatingChange={(rating) => handleInputChange('rating', rating)}
                size="lg"
              />
              <span className="text-sm text-text--text-subtle-light ml-2">
                {formData.rating ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="reviewTitle">Review Title *</Label>
            <Input
              id="reviewTitle"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
              placeholder="Summarize your experience"
              maxLength={100}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Review Text */}
          <div>
            <Label htmlFor="reviewText">Your Review *</Label>
            <Textarea
              id="reviewText"
              value={formData.review}
              onChange={(e) => handleInputChange('review', e.target.value)}
              className={`min-h-[100px] ${errors.review ? 'border-red-500' : ''}`}
              placeholder="Tell others about your experience with this gift box..."
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.review && <p className="text-red-500 text-xs">{errors.review}</p>}
              <p className="text-xs text-text--text-subtle-light">
                {formData.review.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Reviewer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reviewerName">Your Name *</Label>
              <Input
                id="reviewerName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="First name or nickname"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="reviewerEmail">Email Address *</Label>
              <Input
                id="reviewerEmail"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              <p className="text-xs text-text--text-subtle-light mt-1">
                Email won't be displayed publicly
              </p>
            </div>
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
                <span className="font-bold tracking-wide">Submitting Review...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <span className="font-bold tracking-wide">Submit Review</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ReviewsList = ({ reviews, onHelpfulClick }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  // Sort and filter reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const filteredReviews = sortedReviews.filter(review => 
    filterRating === 'all' || review.rating === parseInt(filterRating)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <Label className="text-sm">Sort by:</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm">Filter by rating:</Label>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <p className="text-sm text-text--text-subtle-light">
          Showing {filteredReviews.length} of {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8">
            <Star className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-text--text-light mb-2">No reviews found</h3>
            <p className="text-text--text-subtle-light">
              {filterRating !== 'all' ? 'No reviews match your filter criteria.' : 'Be the first to review this product!'}
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id} className="border-color--accent--line">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text--text-light">{review.reviewerName}</h4>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <StarRating rating={review.rating} readonly size="sm" />
                        <span className="text-xs text-text--text-subtle-light">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-text--text-light mb-2">{review.title}</h5>
                  <p className="text-text--text-subtle-light leading-relaxed">{review.review}</p>
                </div>

                {/* Helpful buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-color--accent--line">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => onHelpfulClick(review.id, true)}
                      className="flex items-center space-x-2 text-sm text-text--text-subtle-light hover:text-accent--ui-accent transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button
                      onClick={() => onHelpfulClick(review.id, false)}
                      className="flex items-center space-x-2 text-sm text-text--text-subtle-light hover:text-accent--ui-accent transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>({review.notHelpful})</span>
                    </button>
                  </div>
                  
                  <div className="text-xs text-text--text-subtle-light">
                    {review.helpful + review.notHelpful > 0 && (
                      `${Math.round((review.helpful / (review.helpful + review.notHelpful)) * 100)}% found this helpful`
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const ReviewSummary = ({ reviews, averageRating }) => {
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  return (
    <Card className="border-color--accent--line mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent--ui-accent)' }}>
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} readonly size="lg" />
            <p className="text-text--text-subtle-light mt-2">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm">{rating}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${totalReviews > 0 ? (ratingCounts[index] / totalReviews) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-text--text-subtle-light w-12 text-right">
                  {ratingCounts[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { StarRating, ReviewForm, ReviewsList, ReviewSummary };