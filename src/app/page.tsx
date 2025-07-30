import FeaturedProducts from '@/components/FeaturedProducts';
import CustomerReview from '@/components/CustomerReview';

/**
 * Home Page Component
 * Main landing page for Handcrafted Haven showcasing featured products and customer reviews
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 leading-tight">
            Welcome to Handcrafted Haven
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the art of handmade treasures. Explore unique, artisan-crafted items 
            from local creators who pour their heart into every piece.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/products"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg"
            >
              Shop Now
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </a>
            
            <a
              href="/seller"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Meet Our Artisans
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <svg className="w-16 h-16 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 opacity-20">
          <svg className="w-20 h-20 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      </main>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Customer Reviews Section */}
      <CustomerReview />

      {/* Newsletter Signup Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Connected with Our Artisan Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get notified about new arrivals, exclusive collections, and stories from our makers
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}