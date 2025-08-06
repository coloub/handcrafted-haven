// Datos simulados para reseñas de clientes
const customerReviewsData = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    reviewText: "Absolutely love my handwoven ceramic bowl! The craftsmanship is incredible and you can really feel the love and care that went into making it. It&apos;s become my favorite piece in the kitchen.",
    rating: 5,
    location: "Seattle, WA"
  },
  {
    id: 2,
    customerName: "Michael Chen",
    reviewText: "The wooden cutting board I purchased exceeded my expectations. The quality is outstanding and it&apos;s clear that this was made by a true artisan. Highly recommend Handcrafted Haven!",
    rating: 5,
    location: "Portland, OR"
  }
];

/**
 * StarRating Component
 * Renders star rating based on the provided rating number
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * ReviewCard Component
 * Individual review card component
 */
function ReviewCard({ 
  customerName, 
  reviewText, 
  rating, 
  location 
}: {
  customerName: string;
  reviewText: string;
  rating: number;
  location: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-full">
      {/* Star Rating */}
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>

      {/* Review Text */}
      <blockquote className="text-gray-700 text-base leading-relaxed mb-4">
        &quot;{reviewText}&quot;
      </blockquote>

      {/* Customer Info */}
      <div className="border-t border-gray-100 pt-4">
        <cite className="block font-semibold text-gray-900 not-italic">
          {customerName}
        </cite>
        <p className="text-sm text-gray-500 mt-1">
          {location}
        </p>
      </div>
    </div>
  );
}

/**
 * CustomerReview Component
 * Displays customer testimonials in a responsive card layout
 */
export default function CustomerReview() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our community of craft lovers who have discovered unique treasures
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {customerReviewsData.map((review) => (
            <ReviewCard
              key={review.id}
              customerName={review.customerName}
              reviewText={review.reviewText}
              rating={review.rating}
              location={review.location}
            />
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">500+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Handmade with Love</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}