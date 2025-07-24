import Image from 'next/image';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface SellerProfileProps {
  name: string;
  avatar: string;
  biography: string;
  products: Product[];
  joinedDate?: string;
  rating?: number;
  totalSales?: number;
}

export default function SellerProfile({
  name,
  avatar,
  biography,
  products,
  joinedDate,
  rating,
  totalSales
}: SellerProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Seller Header */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <Image
              src={avatar}
              alt={`${name}'s profile picture`}
              fill
              className="rounded-full object-cover ring-4 ring-blue-100"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>

          {/* Seller Info */}
          <div className="flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              {rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{rating.toFixed(1)}</span>
                  <span>rating</span>
                </div>
              )}
              {totalSales && (
                <div>
                  <span className="font-medium">{totalSales}</span>
                  <span> sales</span>
                </div>
              )}
              {joinedDate && (
                <div>
                  <span>Joined {joinedDate}</span>
                </div>
              )}
            </div>

            {/* Biography */}
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              {biography}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Products by {name}
          </h2>
          <span className="text-gray-600 text-sm">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-500">
              This seller hasn't listed any products yet.
            </p>
          </div>
        )}
      </div>

      {/* Contact/Action Section */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Interested in custom work?
        </h3>
        <p className="text-gray-600 mb-4">
          Contact {name} directly for custom orders and special requests.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
          Contact Seller
        </button>
      </div>
    </div>
  );
}