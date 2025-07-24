import ProductCard from '@/components/ProductCard';

// Datos de ejemplo para los productos
const sampleProducts = [
  {
    id: 1,
    title: "Handwoven Ceramic Bowl",
    description: "Beautiful ceramic bowl handcrafted by local artisans. Perfect for serving or decoration.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Wooden Cutting Board",
    description: "Premium oak cutting board with natural finish. Sustainably sourced and carefully crafted.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Knitted Wool Scarf",
    description: "Soft merino wool scarf in beautiful earth tones. Hand-knitted with love and care.",
    price: 35.50,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Hand-blown Glass Vase",
    description: "Elegant glass vase with unique patterns. Each piece is one-of-a-kind.",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    title: "Leather Journal",
    description: "Genuine leather journal with handmade paper. Perfect for writing and sketching.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    title: "Artisan Candles Set",
    description: "Set of 3 soy candles with natural scents. Hand-poured in small batches.",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-blue-900">Our Products</h1>
          <p className="text-gray-600 mt-2">
            Discover unique handcrafted items made with love by local artisans
          </p>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}