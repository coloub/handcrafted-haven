import ProductCard from './ProductCard';

// Datos simulados para productos destacados
const featuredProductsData = [
  {
    id: 1,
    title: "Artisan Ceramic Mug",
    description: "Handcrafted ceramic mug with unique glaze patterns. Perfect for your morning coffee.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Woven Basket Set",
    description: "Beautiful set of 3 handwoven baskets made from sustainable materials.",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Hand-carved Wooden Spoon",
    description: "Elegant wooden spoon carved from premium oak wood with smooth finish.",
    price: 18.75,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

/**
 * FeaturedProducts Component
 * Displays a curated selection of handcrafted products in a responsive grid layout
 */
export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Unique Handcrafted Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each piece tells a story of craftsmanship, tradition, and artistic passion
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {featuredProductsData.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="View all handcrafted products"
          >
            View All Products
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}