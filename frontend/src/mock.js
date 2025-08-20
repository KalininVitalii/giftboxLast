// Mock data for gift box catalog - Enhanced with reviews and ratings
// This file contains all the mock data used in the frontend before backend integration

export const mockProducts = [
  {
    id: 1,
    name: "Elegant Rose Gold Collection",
    price: 89.00,
    originalPrice: 120.00,
    images: [
      "https://images.unsplash.com/photo-1625552186152-668cd2f0b707?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1647221598091-880219fa2c8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94fGVufDB8fHx8MTc1MzI5MTk0Nnww&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwYm94fGVufDB8fHx8MTc1MzI5MTk0Nnww&ixlib=rb-4.1.0&q=85"
    ],
    description: "Luxurious gift box with rose gold accents, dried flowers, and premium packaging. Perfect for anniversaries, birthdays, or any special celebration. Includes artisanal chocolates, premium tea selection, and handcrafted items from local Ottawa artisans.",
    category: "Premium",
    inStock: true,
    rating: 4.9,
    totalReviews: 127,
    featured: true,
    bestSeller: false
  },
  {
    id: 2,
    name: "Golden Celebration Box",
    price: 65.00,
    originalPrice: 85.00,
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1702410448780-cbe62c82d55a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxnaWZ0JTIwc2V0c3xlbnwwfHx8fDE3NTMyOTE5NTh8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1732532973406-0a82b447739c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwc2V0c3xlbnwwfHx8fDE3NTMyOTE5NTh8MA&ixlib=rb-4.1.0&q=85"
    ],
    description: "Perfect for celebrations with golden ribbons and festive elements. This curated collection includes gourmet snacks, sparkling beverages, and celebration accessories. Ideal for graduations, promotions, or milestone achievements.",
    category: "Celebration",
    inStock: true,
    rating: 4.7,
    totalReviews: 89,
    featured: false,
    bestSeller: true
  },
  {
    id: 3,
    name: "Surprise Unboxing Experience",
    price: 45.00,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1625552187571-7ee60ac43d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1647221598091-880219fa2c8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94fGVufDB8fHx8MTc1MzI5MTk0Nnww&ixlib=rb-4.1.0&q=85"
    ],
    description: "Transparent design for an exciting unboxing experience with curated surprises. Each box contains mystery items carefully selected to delight and surprise. Perfect for gift exchanges or when you want to add an element of excitement.",
    category: "Experience",
    inStock: true,
    rating: 4.8,
    totalReviews: 73,
    featured: false,
    bestSeller: false
  },
  {
    id: 4,
    name: "Luxury Jewelry Collection",
    price: 150.00,
    originalPrice: 200.00,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0c3xlbnwwfHx8fDE3NTMxMTE3ODR8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwYm94fGVufDB8fHx8MTc1MzI5MTk0Nnww&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1732532973406-0a82b447739c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwc2V0c3xlbnwwfHx8fDE3NTMyOTE5NTh8MA&ixlib=rb-4.1.0&q=85"
    ],
    description: "Premium jewelry gift box with elegant presentation and luxury packaging. Features carefully selected jewelry pieces, velvet presentation boxes, and premium gift wrapping. Perfect for engagements, anniversaries, or special milestones.",
    category: "Luxury",
    inStock: true,
    rating: 4.9,
    totalReviews: 156,
    featured: true,
    bestSeller: false
  },
  {
    id: 5,
    name: "Designer Premium Box",
    price: 175.00,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1700142678566-601b048b39db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnaWZ0c3xlbnwwfHx8fDE3NTMyOTE5NTh8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1625552186152-668cd2f0b707?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85"
    ],
    description: "High-end designer gift box with premium black packaging and luxury appeal. Curated with exclusive designer items, premium accessories, and artisanal products. Limited edition collection perfect for VIP clients and special occasions.",
    category: "Designer",
    inStock: false,
    rating: 5.0,
    totalReviews: 45,
    featured: true,
    bestSeller: false
  },
  {
    id: 6,
    name: "Festive Holiday Special",
    price: 55.00,
    originalPrice: 75.00,
    images: [
      "https://images.unsplash.com/photo-1640061511626-9fbba9044f9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwc2V0c3xlbnwwfHx8fDE3NTMyOTE5NTh8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1702410448780-cbe62c82d55a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxnaWZ0JTIwc2V0c3xlbnwwfHx8fDE3NTMyOTE5NTh8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1625552187571-7ee60ac43d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxnaWZ0JTIwYm94ZXN8ZW58MHx8fHwxNzUzMTQwMzA5fDA&ixlib=rb-4.1.0&q=85"
    ],
    description: "Perfect holiday gift with red bow and festive greeting card included. Contains seasonal treats, holiday-themed items, and festive decorations. Ideal for Christmas, New Year, or any winter celebration in Ottawa.",
    category: "Holiday",
    inStock: true,
    rating: 4.6,
    totalReviews: 98,
    featured: false,
    bestSeller: false
  },
  // NEW PRODUCTS ADDED
  {
    id: 7,
    name: "Canadian Breakfast Box",
    price: 32.00,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1581701391276-63c3bcef7036?w=500&h=500&fit=crop&crop=center"
    ],
    description: "A delightful Canadian breakfast experience featuring maple syrup, artisanal pancake mix, premium coffee beans, and local honey. Perfect for breakfast lovers and anyone wanting to experience true Canadian flavors.",
    category: "Food & Beverage",
    inStock: true,
    rating: 4.5,
    totalReviews: 132,
    featured: false,
    bestSeller: true
  },
  {
    id: 8,
    name: "Spa Day Relaxation",
    price: 100.00,
    originalPrice: 125.00,
    images: [
      "https://images.unsplash.com/photo-1556909114-4ba7e6d49b97?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Indulge in the ultimate relaxation experience with luxury bath salts, essential oils, scented candles, and premium skincare products. Transform any home into a personal spa retreat.",
    category: "Wellness",
    inStock: true,
    rating: 4.8,
    totalReviews: 246,
    featured: true,
    bestSeller: true
  },
  {
    id: 9,
    name: "BBQ Sizzler Set",
    price: 108.00,
    originalPrice: 135.00,
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Fire up the grill with this comprehensive BBQ collection! Includes premium spice rubs, gourmet sauces, grilling tools, and specialty marinades. Perfect for the BBQ enthusiast in your life.",
    category: "Food & Beverage",
    inStock: true,
    rating: 4.6,
    totalReviews: 189,
    featured: false,
    bestSeller: false
  },
  {
    id: 10,
    name: "My Moment Basket",
    price: 28.00,
    originalPrice: 35.00,
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop&crop=center"
    ],
    description: "A personal self-care collection designed for those precious me-time moments. Features herbal teas, cozy accessories, inspirational books, and comfort treats for ultimate relaxation.",
    category: "Lifestyle",
    inStock: true,
    rating: 4.4,
    totalReviews: 95,
    featured: false,
    bestSeller: false
  },
  {
    id: 11,
    name: "Coffee Connoisseur Collection",
    price: 78.00,
    originalPrice: 95.00,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Premium coffee experience with single-origin beans, artisan roasts, specialty brewing equipment, and gourmet accompaniments. A perfect gift for coffee aficionados.",
    category: "Food & Beverage",
    inStock: true,
    rating: 4.7,
    totalReviews: 203,
    featured: false,
    bestSeller: true
  },
  {
    id: 12,
    name: "Artisan Chocolate Paradise",
    price: 68.00,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1549210545-ca3f9e7b5e9a?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Indulge in handcrafted chocolates from local Ottawa chocolatiers. Features dark, milk, and white chocolate varieties, truffles, and unique flavor combinations that will delight any chocolate lover.",
    category: "Food & Beverage",
    inStock: true,
    rating: 4.9,
    totalReviews: 167,
    featured: true,
    bestSeller: false
  },
  {
    id: 13,
    name: "Wine & Cheese Connoisseur",
    price: 125.00,
    originalPrice: 155.00,
    images: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574873215628-43ea19e05bf6?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Sophisticated pairing of premium wines with artisanal cheeses, crackers, and accompaniments. Perfect for wine enthusiasts and romantic occasions.",
    category: "Food & Beverage",
    inStock: true,
    rating: 4.8,
    totalReviews: 134,
    featured: false,
    bestSeller: false
  },
  {
    id: 14,
    name: "New Mom Care Package",
    price: 85.00,
    originalPrice: 110.00,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Thoughtfully curated care package for new mothers featuring comfort items, wellness products, healthy snacks, and pampering essentials to support during this special time.",
    category: "Wellness",
    inStock: true,
    rating: 4.7,
    totalReviews: 78,
    featured: false,
    bestSeller: false
  },
  {
    id: 15,
    name: "Gourmet Tea Experience",
    price: 48.00,
    originalPrice: 62.00,
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Discover the world of premium teas with this curated selection of loose-leaf varieties, tea accessories, honey, and brewing guides. Perfect for tea enthusiasts and meditation moments.",
    category: "Food & Beverage",
    inStock: true,
    rating: 4.6,
    totalReviews: 112,
    featured: false,
    bestSeller: false
  },
  {
    id: 16,
    name: "Game Night Champions",
    price: 72.00,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1611694440675-96c9b8dc59bb?w=500&h=500&fit=crop&crop=center"
    ],
    description: "Everything needed for the perfect game night including board games, card games, premium snacks, and fun accessories. Great for families, friends, and entertainment lovers.",
    category: "Lifestyle",
    inStock: true,
    rating: 4.5,
    totalReviews: 89,
    featured: false,
    bestSeller: false
  }
];

// Mock reviews data
export const mockReviews = {
  1: [ // Reviews for Elegant Rose Gold Collection
    {
      id: 1,
      productId: 1,
      rating: 5,
      title: "Absolutely Beautiful Gift Box!",
      review: "I ordered this for my sister's birthday and she was absolutely thrilled! The rose gold accents are stunning and the quality of items inside exceeded my expectations. The packaging was elegant and the dried flowers were a lovely touch. Will definitely order again!",
      reviewerName: "Sarah M.",
      reviewerEmail: "sarah@example.com",
      date: "2025-01-20T10:30:00Z",
      verified: true,
      helpful: 12,
      notHelpful: 0,
      photos: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1625552186152-668cd2f0b707?w=400&h=400&fit=crop&crop=center",
          name: "unboxing-photo.jpg",
          alt: "Unboxing the elegant rose gold gift box"
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1647221598091-880219fa2c8f?w=400&h=400&fit=crop&crop=center",
          name: "contents-photo.jpg", 
          alt: "Beautiful contents of the gift box"
        }
      ]
    },
    {
      id: 2,
      productId: 1,
      rating: 5,
      title: "Perfect for Anniversary Gift",
      review: "My wife loved this gift box for our 10th anniversary. The artisanal chocolates were delicious and the tea selection was premium quality. The presentation was flawless and delivery was right on time. Highly recommend for special occasions!",
      reviewerName: "Michael R.",
      reviewerEmail: "michael@example.com",
      date: "2025-01-18T14:45:00Z",
      verified: true,
      helpful: 8,
      notHelpful: 1,
      photos: [
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?w=400&h=400&fit=crop&crop=center",
          name: "anniversary-gift.jpg",
          alt: "Anniversary gift presentation"
        }
      ]
    },
    {
      id: 3,
      productId: 1,
      rating: 4,
      title: "High Quality But Pricey",
      review: "The gift box is beautiful and well-crafted. The recipient loved everything in it, especially the local Ottawa artisan items. My only complaint is that it's a bit expensive, but I guess you pay for quality. The rose gold theme was executed perfectly.",
      reviewerName: "Jennifer L.",
      reviewerEmail: "jennifer@example.com",
      date: "2025-01-15T09:20:00Z",
      verified: false,
      helpful: 6,
      notHelpful: 2
    },
    {
      id: 4,
      productId: 1,
      rating: 5,
      title: "Exceeded Expectations",
      review: "I was hesitant to order online but this completely exceeded my expectations. The attention to detail is incredible - from the packaging to the individual items inside. The dried flowers were still beautiful when it arrived. Fast shipping to Ottawa too!",
      reviewerName: "David K.",
      reviewerEmail: "david@example.com",
      date: "2025-01-12T16:15:00Z",
      verified: true,
      helpful: 9,
      notHelpful: 0
    }
  ],
  2: [ // Reviews for Golden Celebration Box
    {
      id: 5,
      productId: 2,
      rating: 5,
      title: "Perfect Graduation Gift!",
      review: "Ordered this for my daughter's university graduation. The golden theme was perfect for the celebration and she loved all the gourmet snacks inside. The sparkling beverage was a nice touch. Great value for money!",
      reviewerName: "Patricia W.",
      reviewerEmail: "patricia@example.com",
      date: "2025-01-19T11:00:00Z",
      verified: true,
      helpful: 7,
      notHelpful: 0,
      photos: [
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop&crop=center",
          name: "graduation-celebration.jpg",
          alt: "Golden celebration box for graduation"
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1702410448780-cbe62c82d55a?w=400&h=400&fit=crop&crop=center",
          name: "inside-contents.jpg",
          alt: "Contents of the golden celebration box"
        }
      ]
    },
    {
      id: 6,
      productId: 2,
      rating: 4,
      title: "Good Quality, Fast Delivery",
      review: "Nice gift box with quality items. The presentation was elegant and delivery was faster than expected. The only reason I'm giving 4 stars instead of 5 is that I wish there were more variety in the snacks included.",
      reviewerName: "Robert H.",
      reviewerEmail: "robert@example.com",
      date: "2025-01-16T13:30:00Z",
      verified: true,
      helpful: 5,
      notHelpful: 1
    }
  ],
  3: [ // Reviews for Surprise Unboxing Experience
    {
      id: 7,
      productId: 3,
      rating: 5,
      title: "So Much Fun to Unbox!",
      review: "This was such a unique gift idea! The transparent design made it exciting to see what was inside, and the surprise elements were delightful. My friend absolutely loved the mystery aspect. Great for anyone who loves surprises!",
      reviewerName: "Amanda C.",
      reviewerEmail: "amanda@example.com",
      date: "2025-01-17T10:15:00Z",
      verified: true,
      helpful: 11,
      notHelpful: 0
    }
  ],
  4: [ // Reviews for Luxury Jewelry Collection
    {
      id: 8,
      productId: 4,
      rating: 5,
      title: "Stunning Jewelry Pieces",
      review: "The jewelry in this collection is absolutely gorgeous! The velvet presentation boxes are a nice touch and everything feels very premium. Perfect for my wife's birthday - she hasn't stopped wearing the necklace since!",
      reviewerName: "James T.",
      reviewerEmail: "james@example.com",
      date: "2025-01-21T15:45:00Z",
      verified: true,
      helpful: 14,
      notHelpful: 0,
      photos: [
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
          name: "jewelry-pieces.jpg",
          alt: "Beautiful jewelry pieces from the luxury collection"
        },
        {
          id: 7,
          url: "https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?w=400&h=400&fit=crop&crop=center",
          name: "velvet-boxes.jpg",
          alt: "Elegant velvet presentation boxes"
        },
        {
          id: 8,
          url: "https://images.unsplash.com/photo-1732532973406-0a82b447739c?w=400&h=400&fit=crop&crop=center",
          name: "wearing-necklace.jpg",
          alt: "Wife wearing the beautiful necklace"
        }
      ]
    },
    {
      id: 9,
      productId: 4,
      rating: 4,
      title: "Beautiful but Expensive",
      review: "The jewelry is beautiful and the packaging is luxury quality. The pieces are well-made and elegant. However, it is quite pricey. Worth it for special occasions like anniversaries or milestones, but not an everyday purchase.",
      reviewerName: "Lisa P.",
      reviewerEmail: "lisa@example.com",
      date: "2025-01-14T12:20:00Z",
      verified: false,
      helpful: 8,
      notHelpful: 3
    }
  ],
  5: [ // Reviews for Designer Premium Box
    {
      id: 10,
      productId: 5,
      rating: 5,
      title: "Premium Quality Everything",
      review: "This is definitely a luxury item! Every single thing in the box screams quality and elegance. The black packaging is sophisticated and the designer items are authentic. Worth every penny for VIP clients or very special occasions.",
      reviewerName: "Victoria S.",
      reviewerEmail: "victoria@example.com",
      date: "2025-01-13T14:00:00Z",
      verified: true,
      helpful: 6,
      notHelpful: 0
    }
  ],
  6: [ // Reviews for Festive Holiday Special
    {
      id: 11,
      productId: 6,
      rating: 5,
      title: "Perfect Holiday Spirit!",
      review: "Ordered this for Christmas and it was perfect! The red bow was beautiful and the festive items really captured the holiday spirit. The seasonal treats were delicious and the decorations were high quality. Great value!",
      reviewerName: "Karen B.",
      reviewerEmail: "karen@example.com",
      date: "2025-01-10T16:30:00Z",
      verified: true,
      helpful: 9,
      notHelpful: 1
    },
    {
      id: 12,
      productId: 6,
      rating: 4,
      title: "Nice Holiday Gift",
      review: "Good selection of holiday-themed items. The packaging was festive and the greeting card was a nice touch. Items were fresh and well-presented. Only minor complaint is that I wish there were more treats included for the price.",
      reviewerName: "Thomas N.",
      reviewerEmail: "thomas@example.com",
      date: "2025-01-08T11:45:00Z",
      verified: true,
      helpful: 4,
      notHelpful: 2
    }
  ]
};

export const mockCategories = [
  { id: 1, name: "Premium", count: 2 },
  { id: 2, name: "Celebration", count: 1 },
  { id: 3, name: "Experience", count: 1 },
  { id: 4, name: "Luxury", count: 1 },
  { id: 5, name: "Designer", count: 1 },
  { id: 6, name: "Holiday", count: 1 }
];

// Mock cart operations
export const mockCartOperations = {
  addToCart: (product, quantity = 1) => {
    console.log(`Mock: Added ${quantity} of ${product.name} to cart`);
    return {
      success: true,
      message: `${product.name} has been added to your cart.`
    };
  },
  
  removeFromCart: (productId) => {
    console.log(`Mock: Removed product ${productId} from cart`);
    return {
      success: true,
      message: "Item removed from cart"
    };
  },
  
  updateQuantity: (productId, quantity) => {
    console.log(`Mock: Updated product ${productId} quantity to ${quantity}`);
    return {
      success: true,
      message: "Cart updated"
    };
  }
};

// Mock order operations
export const mockOrderOperations = {
  createOrder: (cartItems, customerInfo) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log(`Mock: Creating order with total $${total.toFixed(2)}`);
    return {
      success: true,
      orderId: `ORDER-${Date.now()}`,
      total: total,
      message: "Order placed successfully!"
    };
  },
  
  getOrderStatus: (orderId) => {
    console.log(`Mock: Getting status for order ${orderId}`);
    return {
      orderId: orderId,
      status: "processing",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
  }
};

// Mock wishlist operations
export const mockWishlistOperations = {
  addToWishlist: (productId) => {
    console.log(`Mock: Added product ${productId} to wishlist`);
    return {
      success: true,
      message: "Added to wishlist"
    };
  },
  
  removeFromWishlist: (productId) => {
    console.log(`Mock: Removed product ${productId} from wishlist`);
    return {
      success: true,
      message: "Removed from wishlist"
    };
  }
};