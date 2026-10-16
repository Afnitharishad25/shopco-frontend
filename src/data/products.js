const newArrivals = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "/images/products/tshirt-tape.jpeg",
    rating: 4.5,
    price: 120,
    category: "T-shirts",
    colors: ["Black", "White", "Red"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Casual",
    description:
      "A comfortable everyday T-shirt with stylish tape details, designed for a modern casual look.",
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "/images/products/skinny-jeans.jpeg",
    rating: 3.5,
    price: 240,
    oldPrice: 260,
    discount: 20,
    category: "Jeans",
    colors: ["Black", "Blue"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Casual",
    description:
      "Slim-fitting jeans designed with comfortable stretch fabric for a modern everyday look.",
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: "/images/products/checkered-shirt.jpeg",
    rating: 4.5,
    price: 180,
    category: "Shirts",
    colors: ["Red", "Blue"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Casual",
    description:
      "A classic checkered shirt that works well for both casual outings and everyday wear.",
  
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "/images/products/striped-tshirt.jpeg",
    rating: 4.5,
    price: 130,
    oldPrice: 160,
    discount: 30,
    category: "T-shirts",
    colors: ["Black", "Orange"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Casual",
    description:
      "A stylish striped T-shirt featuring comfortable fabric and a clean everyday design.",
  },
];

const topSelling = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    image: "/images/products/vertical-striped-shirt.jpeg",
    rating: 5,
    price: 212,
    oldPrice: 232,
    discount: 20,
    category: "Shirts",
    colors: ["Black","Red","Blue","White"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Formal",
    description:
      "A smart vertical striped shirt with a clean silhouette, perfect for polished outfits.",
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    image: "/images/products/courage-tshirt.jpeg",
    rating: 4,
    price: 145,
    category: "T-shirts",
    colors: ["Black","Red","Blue","White"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Party",
    description:
      "A graphic T-shirt with a bold design that adds personality to your casual wardrobe.",
  
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    image: "/images/products/bermuda-shorts.jpeg",
    rating: 3,
    price: 80,
    category: "Shorts",
    colors: ["Black", "Blue"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Casual",
    description:
      "Relaxed-fit Bermuda shorts designed for comfortable everyday and summer wear.",
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    image: "/images/products/faded-jeans.jpeg",
    rating: 4.5,
    price: 210,
    category: "Jeans",
    colors: ["Black", "Blue"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    dressStyle: "Casual",
    description:
      "Faded skinny-fit jeans with a modern silhouette and comfortable everyday feel.",
  },
];

const dressStyles = [
  {
    id: 1,
    name: "Casual",
    image: "/images/styles/casual.jpeg",
  },
  {
    id: 2,
    name: "Formal",
    image: "/images/styles/formal.jpeg",
  },
  {
    id: 3,
    name: "Party",
    image: "/images/styles/party.jpeg",
  },
  {
    id: 4,
    name: "Gym",
    image: "/images/styles/gym.jpeg",
  },
];

export { newArrivals, topSelling, dressStyles };
