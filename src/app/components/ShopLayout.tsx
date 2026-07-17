"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const bookClickUrl = "https://www.wellnessliving.com/signup/resilient_boxing";

  return (
    <>
      <Header onBookClick={() => window.open(bookClickUrl, "_blank")} />
      {children}
      <Footer onBookClick={() => window.open(bookClickUrl, "_blank")} />
    </>
  );
}
