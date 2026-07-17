import productsData from "./products.json";

export interface Selection {
  id: number;
  value: string;
  description: string;
  key: string;
  linkedMediaItems: any;
  displayImage: any;
}

export interface ProductOption {
  id: string;
  title: string;
  optionType: string;
  key: string;
  selections: Selection[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  shortDescription: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  wixProductUrl: string;
  featured?: boolean;
  charityProduct?: boolean;
  notice?: string;
  ribbon?: string;
  rawOptions?: ProductOption[];
}

export const products: Product[] = productsData as Product[];

// Get all unique categories
export function getCategories(): string[] {
  const cats = products.map((p) => p.category);
  return Array.from(new Set(cats));
}

// Get all unique sizes across all products
export function getAllSizes(): string[] {
  const sizes: string[] = [];
  products.forEach((p) => {
    p.sizes.forEach((s) => {
      if (!sizes.includes(s)) sizes.push(s);
    });
  });
  // Sort sizes in a logical order
  const order = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "One Size"];
  return sizes.sort((a, b) => {
    const idxA = order.indexOf(a);
    const idxB = order.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });
}

// Get all unique colors across all products
export function getAllColors(): string[] {
  const colors: string[] = [];
  products.forEach((p) => {
    p.colors.forEach((c) => {
      if (!colors.includes(c)) colors.push(c);
    });
  });
  return colors.sort();
}

// Query products with filtering and sorting
export interface FilterParams {
  search?: string;
  category?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export function queryProducts(params: FilterParams): Product[] {
  let filtered = [...products];

  // Search filter
  if (params.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (params.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === params.category!.toLowerCase()
    );
  }

  // Size filter
  if (params.size) {
    filtered = filtered.filter((p) => p.sizes.includes(params.size!));
  }

  // Color filter
  if (params.color) {
    filtered = filtered.filter((p) => p.colors.includes(params.color!));
  }

  // Price range filters
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }

  // Sorting
  if (params.sort) {
    switch (params.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        // Sort by featured first, then name
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }
  }

  return filtered;
}

// Get related products for a product detail page
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id) // Exclude current product
    .map((p) => {
      // Calculate relevance score
      let score = 0;
      if (p.category === product.category) score += 3;
      if (Math.abs(p.price - product.price) <= 10) score += 1;
      if (p.charityProduct && product.charityProduct) score += 2;
      if (p.featured) score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}

// Get a single product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
