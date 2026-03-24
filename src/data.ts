export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Safari Leather Boots",
    price: 4500,
    category: "Footwear",
    image: "https://picsum.photos/seed/boots/400/500",
    description: "Durable handcrafted leather boots perfect for the Kenyan terrain."
  },
  {
    id: 2,
    name: "Maasai Pattern Blanket",
    price: 2200,
    category: "Home",
    image: "https://picsum.photos/seed/blanket/400/500",
    description: "Warm and vibrant traditional Maasai shuka blanket."
  },
  {
    id: 3,
    name: "Premium Kenyan Coffee",
    price: 1200,
    category: "Groceries",
    image: "https://picsum.photos/seed/coffee/400/500",
    description: "Freshly roasted AA grade coffee beans from the highlands."
  },
  {
    id: 4,
    name: "Handwoven Sisal Basket",
    price: 1800,
    category: "Accessories",
    image: "https://picsum.photos/seed/basket/400/500",
    description: "Beautifully crafted Kiondo basket, perfect for shopping or decor."
  },
  {
    id: 5,
    name: "Beaded Leather Belt",
    price: 1500,
    category: "Accessories",
    image: "https://picsum.photos/seed/belt/400/500",
    description: "Authentic beaded leather belt with traditional patterns."
  },
  {
    id: 6,
    name: "Savannah Sun Hat",
    price: 950,
    category: "Accessories",
    image: "https://picsum.photos/seed/hat/400/500",
    description: "Stylish and practical sun protection for your outdoor adventures."
  },
  {
    id: 7,
    name: "Wooden Carved Elephant",
    price: 3500,
    category: "Decor",
    image: "https://picsum.photos/seed/elephant/400/500",
    description: "Intricately carved ebony wood elephant sculpture."
  },
  {
    id: 8,
    name: "Organic Tea Selection",
    price: 850,
    category: "Groceries",
    image: "https://picsum.photos/seed/tea/400/500",
    description: "A collection of the finest organic teas from Kericho."
  }
];
