export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4 text-center">
        Handcrafted Haven
      </h1>
      <p className="text-lg text-gray-700 text-center mb-6 max-w-xl">
        Discover the art of handmade treasures. Explore unique, artisan-crafted items from local creators.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        View Products
      </button>
    </main>
  );
}
