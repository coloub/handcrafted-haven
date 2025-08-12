import ProductCard from '@/components/ProductCard';

// Datos de ejemplo para los productos con IDs únicos
const sampleProducts = [
  {
    id: 1,
    title: "Artisan Ceramic Mug",
    description: "Handcrafted ceramic mug with unique glaze patterns. Perfect for your morning coffee.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Elena Morales"
  },
  {
    id: 2,
    title: "Woven Basket Set",
    description: "Beautiful set of 3 handwoven baskets made from sustainable materials.",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "María González"
  },
  {
    id: 3,
    title: "Hand-carved Wooden Spoon",
    description: "Elegant wooden spoon carved from premium oak wood with smooth finish.",
    price: 18.75,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Carlos Mendoza"
  },
  {
    id: 4,
    title: "Hand-blown Glass Vase",
    description: "Elegant glass vase with unique patterns. Each piece is one-of-a-kind.",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Ana Rodríguez"
  },
  {
    id: 5,
    title: "Leather Journal",
    description: "Genuine leather journal with handmade paper. Perfect for writing and sketching.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Diego Torres"
  },
  {
    id: 6,
    title: "Artisan Candles Set",
    description: "Set of 3 soy candles with natural scents. Hand-poured in small batches.",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Sofía Herrera"
  },
  {
    id: 7,
    title: "Handwoven Textile Scarf",
    description: "Soft merino wool scarf in beautiful earth tones. Hand-knitted with love and care.",
    price: 35.50,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Isabel Vargas"
  },
  {
    id: 8,
    title: "Ceramic Dinnerware Set",
    description: "Beautiful ceramic dinnerware set with traditional patterns. Service for 4 people.",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    seller: "Roberto Silva"
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Productos Artesanales
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre tesoros únicos hechos a mano por artesanos apasionados de todo el mundo. 
              Cada pieza cuenta una historia de tradición, arte y dedicación.
            </p>
          </div>

          {/* Filtros y búsqueda (placeholder para futuras mejoras) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">
                {sampleProducts.length} productos encontrados
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Búsqueda simple */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Ordenamiento */}
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Categorías rápidas */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {['Todos', 'Cerámica', 'Textiles', 'Madera', 'Vidrio', 'Joyería', 'Decoración'].map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              seller={product.seller}
              className="w-full max-w-sm"
            />
          ))}
        </div>

        {/* Paginación placeholder */}
        <div className="mt-16 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors duration-200">
              Anterior
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Siguiente
            </button>
          </nav>
        </div>
      </main>

      {/* Sección de información adicional */}
      <section className="bg-blue-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir productos artesanales?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hecho con Amor</h3>
              <p className="text-gray-600">
                Cada producto es creado con pasión y dedicación por artesanos que aman su oficio
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sostenible</h3>
              <p className="text-gray-600">
                Producción responsable con materiales naturales y técnicas tradicionales
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Único</h3>
              <p className="text-gray-600">
                Cada pieza es única y especial, no encontrarás otra igual en ningún lugar
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}