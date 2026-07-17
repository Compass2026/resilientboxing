import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ShopLayout from "../../components/ShopLayout";
import ProductDetailView from "../../components/ProductDetailView";
import { getProductBySlug, products, getRelatedProducts } from "../../data/products";

// Tell Next.js to pre-render all dynamic slugs at build-time
export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate unique metadata and SEO tags per product page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found | Resilient Boxing",
    };
  }

  return {
    title: `${product.name} | Resilient Boxing Apparel | O'Fallon, MO`,
    description: `Shop ${product.name} (${product.category}) from Resilient Boxing in O'Fallon, Missouri. ${product.shortDescription}`,
    alternates: {
      canonical: `https://www.resilientboxing.com/shop/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Resilient Boxing Apparel`,
      description: product.shortDescription,
      url: `https://www.resilientboxing.com/shop/${product.slug}`,
      siteName: "Resilient Boxing",
      type: "website",
      images: [
        {
          url: product.images[0] || "https://www.resilientboxing.com/favicon.ico",
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Resilient Boxing Apparel`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Render product missing 404 state if product doesn't exist
  if (!product) {
    return (
      <ShopLayout>
        <div className="noise bg-[#080808] min-h-screen text-white flex flex-col justify-between">
          {/* Background glow spotlights */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-[20%] w-[500px] h-[300px] glow-gold opacity-25 rounded-full blur-3xl" />
          </div>

          <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-32 px-5 pt-[220px]">
            <div className="w-16 h-16 rounded-2xl glass border border-white/5 flex items-center justify-center text-zinc-500 mb-6">
              ⚠️
            </div>
            <h1 className="font-bebas text-4xl md:text-6xl uppercase italic tracking-wide text-white mb-4">
              Product Not Found
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm font-light max-w-sm mb-8 leading-relaxed">
              The gear or apparel item you are looking for does not exist in our catalog or may have been removed.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3.5 bg-[#C5A059] text-black hover:bg-white transition-colors duration-300 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/40"
            >
              Back to Shop
            </Link>
          </main>
        </div>
      </ShopLayout>
    );
  }

  // Get 4 related products
  const related = getRelatedProducts(product, 4);

  // Generate Structured Data Schema (JSON-LD) for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.shortDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Resilient Boxing",
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.resilientboxing.com/shop/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock", // Mark as in-stock as confirmed wix storefront status
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.resilientboxing.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://www.resilientboxing.com/shop",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `https://www.resilientboxing.com/shop?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `https://www.resilientboxing.com/shop/${product.slug}`,
      },
    ],
  };

  return (
    <div className="noise bg-[#080808] min-h-screen text-white relative">
      {/* Dynamic structured data schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background glow spotlights */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] glow-white opacity-25 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] glow-gold opacity-20 rounded-full blur-3xl" />
      </div>

      <ShopLayout>
        <main className="relative z-10">
          <ProductDetailView product={product} relatedProducts={related} />
        </main>
      </ShopLayout>
    </div>
  );
}
