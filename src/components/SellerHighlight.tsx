import Image from 'next/image';

/**
 * SellerHighlight Component
 * Showcases a featured artisan with their story and background
 */
export default function SellerHighlight() {
  // Featured artisan data
  const featuredArtisan = {
    name: "Elena Morales",
    location: "Antigua, Guatemala",
    craft: "Traditional Weaving & Ceramics",
    story: "For over 20 years, I've been preserving the ancient art of Mayan textile weaving passed down through five generations of women in my family. Every thread tells a story of our heritage, and every pattern carries the wisdom of our ancestors. My ceramic work is inspired by the natural beauty of Guatemala's highlands.",
    speciality: "Hand-woven huipils and ceramic pottery",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    yearsActive: 20,
    totalSales: 350
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Featured Artisan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the story behind the craft and the passion that drives our makers
          </p>
        </div>

        {/* Artisan Spotlight */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-64 lg:h-full min-h-[400px]">
              <Image
                src={featuredArtisan.avatar}
                alt={`${featuredArtisan.name}, artisan specializing in ${featuredArtisan.craft}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay with location */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{featuredArtisan.location}</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Artisan Name & Title */}
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {featuredArtisan.name}
                </h3>
                <p className="text-lg text-blue-600 font-medium mb-4">
                  {featuredArtisan.craft}
                </p>
                
                {/* Stats */}
                <div className="flex gap-6 text-sm text-gray-600">
                  <div>
                    <span className="block font-semibold text-gray-900 text-lg">
                      {featuredArtisan.yearsActive}+
                    </span>
                    <span>Years of Experience</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-900 text-lg">
                      {featuredArtisan.totalSales}+
                    </span>
                    <span>Happy Customers</span>
                  </div>
                </div>
              </div>

              {/* Story */}
              <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6 italic border-l-4 border-blue-500 pl-6">
                "{featuredArtisan.story}"
              </blockquote>

              {/* Specialty */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-2">Specializes in:</h4>
                <p className="text-gray-600">{featuredArtisan.speciality}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
                  aria-label={`View products by ${featuredArtisan.name}`}
                >
                  View Products
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
                
                <button 
                  className="inline-flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  aria-label={`Read full story of ${featuredArtisan.name}`}
                >
                  Read Full Story
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Elements */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Fair Trade Certified</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Community Supported</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">Heritage Craftsmanship</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}