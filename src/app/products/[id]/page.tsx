'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';

// Datos simulados de productos (en producción vendría de una API)
const allProducts = [
  {
    id: 1,
    title: "Artisan Ceramic Mug",
    description: "Handcrafted ceramic mug with unique glaze patterns. Perfect for your morning coffee.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seller: "Elena Morales",
    sellerLocation: "Antigua, Guatemala",
    category: "Ceramics",
    materials: ["Clay", "Natural Glaze"],
    dimensions: "4\" x 4\" x 4.5\"",
    weight: "12 oz",
    inStock: true,
    stockQuantity: 15,
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Handcrafted by skilled artisans",
      "Unique glaze pattern on each piece",
      "Microwave and dishwasher safe",
      "Perfect size for coffee or tea",
      "Sustainable materials"
    ],
    story: "Each mug is carefully crafted by Elena using traditional techniques passed down through generations. The unique glaze patterns are created using natural minerals from the volcanic soil of Guatemala, making each piece truly one-of-a-kind."
  },
  {
    id: 2,
    title: "Woven Basket Set",
    description: "Beautiful set of 3 handwoven baskets made from sustainable materials.",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seller: "María González",
    sellerLocation: "Oaxaca, Mexico",
    category: "Home Decor",
    materials: ["Pine Needle", "Natural Dyes"],
    dimensions: "Large: 12\" x 8\", Medium: 10\" x 6\", Small: 8\" x 4\"",
    weight: "2 lbs total",
    inStock: true,
    stockQuantity: 8,
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Set of 3 different sizes",
      "Handwoven with traditional techniques",
      "Made from sustainable pine needles",
      "Natural dyes only",
      "Perfect for storage or decoration"
    ],
    story: "These baskets are woven by María using pine needles collected from the forests of Oaxaca. Each basket takes several days to complete, using weaving techniques that have been part of her family's tradition for over 100 years."
  },
  // Agregar más productos según sea necesario...
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const [product, setProduct] = useState<typeof allProducts[0] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const productId = parseInt(params.id as string);

  useEffect(() => {
    // Simular carga de producto (en producción sería una llamada a API)
    const foundProduct = allProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Producto no encontrado, redirigir a 404 o productos
      router.push('/products');
    }
  }, [productId, router]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          seller: product.seller
        });
      }
      
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 3000);
    }
  };

  const handleFavoriteToggle = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFavorite(product.id);
      } else {
        addFavorite({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          seller: product.seller
        });
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentCartQuantity = getItemQuantity(product.id);
  const totalQuantityWouldBe = currentCartQuantity + quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Productos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {showAddedMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>¡Producto agregado al carrito!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Galería de imágenes */}
          <div className="flex flex-col">
            {/* Imagen principal */}
            <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.gallery[selectedImageIndex]}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Imágenes en miniatura */}
            <div className="mt-4 flex space-x-2 overflow-x-auto">
              {product.gallery.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} vista ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="mt-10 lg:mt-0 lg:col-start-2">
            <div className="space-y-6">
              {/* Título y precio */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-3xl font-bold text-blue-600 mt-2">${product.price}</p>
              </div>

              {/* Información del vendedor */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-lg">
                    {product.seller.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Artesano: {product.seller}</p>
                  <p className="text-sm text-gray-600">{product.sellerLocation}</p>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Descripción</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Historia del producto */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Historia del Artesano</h3>
                <p className="mt-2 text-gray-600 leading-relaxed italic">{product.story}</p>
              </div>

              {/* Características */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Características</h3>
                <ul className="mt-2 space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detalles técnicos */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900">Dimensiones</h4>
                  <p className="text-gray-600">{product.dimensions}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Peso</h4>
                  <p className="text-gray-600">{product.weight}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Materiales</h4>
                  <p className="text-gray-600">{product.materials.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Disponibilidad</h4>
                  <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? `En stock (${product.stockQuantity})` : 'Agotado'}
                  </p>
                </div>
              </div>

              {/* Controles de compra */}
              <div className="space-y-4">
                {/* Selector de cantidad */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stockQuantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, parseInt(e.target.value) || 1)))}
                      className="w-20 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-600 ml-2">
                      Disponible: {product.stockQuantity}
                    </span>
                  </div>
                  {currentCartQuantity > 0 && (
                    <p className="text-sm text-blue-600 mt-1">
                      Ya tienes {currentCartQuantity} en el carrito
                    </p>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || totalQuantityWouldBe > product.stockQuantity}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      product.inStock && totalQuantityWouldBe <= product.stockQuantity
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {!product.inStock 
                      ? 'Agotado'
                      : totalQuantityWouldBe > product.stockQuantity
                      ? 'Cantidad no disponible'
                      : 'Agregar al Carrito'
                    }
                  </button>
                  
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-3 border rounded-lg transition-colors ${
                      isFavorite(product.id)
                        ? 'border-red-500 text-red-500 bg-red-50'
                        : 'border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                    }`}
                    aria-label="Agregar a favoritos"
                  >
                    <svg className="w-6 h-6" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Información adicional */}
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Envío gratis en pedidos mayores a $50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span>100% hecho a mano por artesanos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Garantía de satisfacción</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}