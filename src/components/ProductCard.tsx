'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ProductCardProps {
  id?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  seller?: string;
  className?: string;
}

export default function ProductCard({ 
  id = Math.floor(Math.random() * 1000), // ID temporal si no se proporciona
  title, 
  description, 
  price, 
  image, 
  seller,
  className = ""
}: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation();
    
    addItem({
      id,
      title,
      description,
      price,
      image,
      seller
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite({
      id,
      title,
      description,
      price,
      image,
      seller
    });
  };

  const itemQuantity = getItemQuantity(id);
  const isItemFavorite = isFavorite(id);

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm group relative ${className}`}>
      {/* Mensaje de agregado al carrito */}
      {showAddedMessage && (
        <div className="absolute top-2 left-2 right-2 bg-green-500 text-white text-xs py-2 px-3 rounded-lg z-10 animate-fade-in">
          ¡Agregado al carrito!
        </div>
      )}

      <Link href={`/products/${id}`} className="block">
        {/* Imagen del producto */}
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Skeleton mientras carga */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Botón de favoritos */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 ${
              isItemFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:text-red-500'
            } hover:scale-110`}
            aria-label={isItemFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <svg 
              className="w-4 h-4" 
              fill={isItemFavorite ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>

          {/* Indicador de cantidad en carrito */}
          {itemQuantity > 0 && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
              {itemQuantity} en carrito
            </div>
          )}
        </div>
        
        {/* Contenido de la tarjeta */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Información del vendedor */}
          {seller && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-semibold">
                  {seller.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-gray-500">Por: {seller}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-600">
                ${price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                Envío gratis +$50
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              aria-label={`Agregar ${title} al carrito`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline">Agregar</span>
              </div>
            </button>
          </div>
        </div>
      </Link>

      {/* Indicadores adicionales */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Hecho a mano</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Calidad premium</span>
          </div>
        </div>
      </div>
    </div>
  );
}