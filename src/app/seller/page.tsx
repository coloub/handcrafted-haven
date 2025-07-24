import SellerProfile from '@/components/SellerProfile';

// Datos simulados del vendedor
const sellerData = {
  name: "María Elena González",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  biography: "I'm a passionate artisan with over 15 years of experience in traditional crafts. Based in the beautiful mountains of Guatemala, I specialize in handwoven textiles, ceramic pottery, and sustainable home goods. Each piece I create tells a story of cultural heritage and environmental consciousness. My work is inspired by ancient Mayan techniques passed down through generations, combined with contemporary design sensibilities.",
  joinedDate: "March 2020",
  rating: 4.8,
  totalSales: 247,
  products: [
    {
      id: 1,
      title: "Traditional Huipil Blouse",
      description: "Handwoven cotton blouse with intricate geometric patterns inspired by Mayan designs.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Ceramic Coffee Mug Set",
      description: "Set of 4 handcrafted ceramic mugs with earthy glazes. Perfect for your morning coffee ritual.",
      price: 52.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Woven Market Bag",
      description: "Durable and stylish market bag made from organic cotton. Great for shopping or beach trips.",
      price: 28.50,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Hand-painted Ceramic Vase",
      description: "Beautiful ceramic vase with traditional floral motifs. Each one is unique and signed by the artist.",
      price: 75.00,
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "Alpaca Wool Throw Blanket",
      description: "Luxuriously soft alpaca wool blanket in natural colors. Perfect for cozy evenings.",
      price: 125.00,
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      title: "Carved Wooden Jewelry Box",
      description: "Intricately carved jewelry box made from sustainable hardwood with traditional patterns.",
      price: 65.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]
};

export default function SellerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-600">
            <a 
              href="/" 
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <span className="mx-2">/</span>
            <a 
              href="/products" 
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {sellerData.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Seller Profile */}
      <SellerProfile
        name={sellerData.name}
        avatar={sellerData.avatar}
        biography={sellerData.biography}
        products={sellerData.products}
        joinedDate={sellerData.joinedDate}
        rating={sellerData.rating}
        totalSales={sellerData.totalSales}
      />
    </div>
  );
}