'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface OrderData {
  orderId: string;
  items: Array<{
    id: string | number;
    title: string;
    description: string;
    price: number;
    image: string;
    seller?: string;
    quantity: number;
  }>;
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentInfo: {
    method: string;
    cardNumber: string;
  };
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  orderDate: string;
  status: string;
}

export default function OrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!orderId) {
      router.push('/');
      return;
    }

    // Buscar la orden en localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      const order = orders.find((o: OrderData) => o.orderId === orderId);
      
      if (order) {
        setOrderData(order);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error al cargar la orden:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Orden no encontrada</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de confirmación */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-600 text-lg">
            Gracias por tu compra. Hemos recibido tu pedido y lo estamos preparando.
          </p>
        </div>

        {/* Información del pedido */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Pedido #{orderData.orderId}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Realizado el {new Date(orderData.orderDate).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Confirmado
                </span>
              </div>
            </div>
          </div>

          {/* Productos ordenados */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos</h3>
            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                    {item.seller && (
                      <p className="text-sm text-blue-600">Por: {item.seller}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-bold text-blue-600">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información de envío y pago */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Información de envío */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Envío</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                {orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}
              </p>
              <p>{orderData.shippingInfo.address}</p>
              <p>
                {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}
              </p>
              <p>{orderData.shippingInfo.country}</p>
              <p className="text-gray-600">Email: {orderData.shippingInfo.email}</p>
              <p className="text-gray-600">Teléfono: {orderData.shippingInfo.phone}</p>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Tiempo de entrega</h4>
                  <p className="text-sm text-blue-600">
                    Estimado: 5-7 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de pago */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Pago</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${orderData.totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className={`font-medium ${orderData.totals.shipping === 0 ? 'text-green-600' : ''}`}>
                  {orderData.totals.shipping === 0 ? 'Gratis' : `$${orderData.totals.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Impuestos</span>
                <span className="font-medium">${orderData.totals.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">${orderData.totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">Método de pago</p>
                  <p className="text-sm text-gray-500">
                    Tarjeta terminada en {orderData.paymentInfo.cardNumber.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Qué sigue?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Confirmación por email</h4>
                <p className="text-sm text-gray-500">Recibirás un email de confirmación en {orderData.shippingInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Preparación del pedido</h4>
                <p className="text-sm text-gray-500">Los artesanos comenzarán a preparar tus productos</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Seguimiento de envío</h4>
                <p className="text-sm text-gray-500">Te enviaremos información de seguimiento cuando tu pedido sea enviado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Seguir Comprando
          </Link>
          
          <Link
            href="/orders"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ver Mis Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
