import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, RefreshCw, Truck, Sparkles, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/hooks/use-store";
import { SizeChartModal } from "@/components/size-chart-modal";

export const Route = createFileRoute("/products_/$productId")({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    return {
      meta: [
        { title: `${product ? product.name : "Product"} — Dezire Fashion` },
        {
          name: "description",
          content: product
            ? `Buy ${product.name} online. Part of our seasonal curated drop. Premium materials, tailored in Mumbai.`
            : "Product Details Page",
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = useParams({ from: "/products_/$productId" });
  const product = products.find((p) => p.id === productId);
  const navigate = useNavigate();

  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const [selectedSize, setSelectedSize] = useState("M");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "care" | "shipping">("story");

  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Hover/Touch coordinate lens zoom state
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleZoomMove = (clientX: number, clientY: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  // Lightbox Zoom state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-5 py-24">
        <h1 className="font-display text-4xl lg:text-6xl">Piece Not Found</h1>
        <p className="text-muted-foreground mt-4 max-w-sm text-sm">
          The curated item you are looking for is no longer in this season's archive.
        </p>
        <Link
          to="/products"
          className="mt-8 bg-ink text-cream hover:bg-charcoal px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold rounded-full transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const wish = isWishlisted(product.id);
  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Filter 3 similar products excluding the current one
  const similarProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.rating >= 4.8))
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    navigate({ to: "/checkout" });
  };

  // Drag to Pan inside Lightbox
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    // Bounds checking based on scale
    const maxOffset = (zoomScale - 1) * 250; 
    setPanOffset({
      x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset offset when scale goes back to 1
  useEffect(() => {
    if (zoomScale === 1) {
      setPanOffset({ x: 0, y: 0 });
    }
  }, [zoomScale]);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10 animate-fade-up">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <span>/</span>
          <span className="text-gold font-medium">{product.name}</span>
        </div>

        {/* Grid Container */}
        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Side: Premium Interlocking Gallery (5 columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div 
              className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9] rounded-2xl border border-border group cursor-zoom-in shadow-soft select-none"
              onClick={() => {
                setLightboxOpen(true);
                setZoomScale(1.5); // Default start zoom on open
              }}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={(e) => handleZoomMove(e.clientX, e.clientY, e.currentTarget)}
              onTouchStart={() => setIsZooming(true)}
              onTouchEnd={() => setIsZooming(false)}
              onTouchMove={(e) => {
                if (e.touches.length > 0) {
                  handleZoomMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
                }
              }}
            >
              {/* Main Display Image with exact cursor-centered coordinates zoom */}
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-100 ease-out"
                style={{
                  transform: isZooming ? "scale(2.5)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
              
              {/* Floating indicators */}
              <div className="absolute top-4 left-4 bg-ink/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] text-cream font-bold border border-white/10">
                Angle {String.fromCharCode(65 + activeImageIdx)}
              </div>

              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-3 py-3 rounded-full text-ink hover:bg-ink hover:text-cream transition-colors shadow-soft">
                <ZoomIn className="h-4 w-4" />
              </div>
            </div>

            {/* 4 Thumbnails Selector Grid */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[3/4] rounded-xl overflow-hidden border-2 bg-muted transition-all cursor-pointer ${
                    activeImageIdx === idx 
                      ? "border-gold scale-[1.02] shadow-medium" 
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Sizing & Sourcing Guidelines */}
            <div className="grid grid-cols-3 gap-3 border-y border-border py-6 text-center">
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="h-5 w-5 text-gold animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-ink">Bespoke Fabric</span>
              </div>
              <div className="flex flex-col items-center space-y-1 border-x border-border">
                <Truck className="h-5 w-5 text-gold" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-ink">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RefreshCw className="h-5 w-5 text-gold" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-ink">7-Day Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Side: Purchase interface (6 columns) */}
          <div className="lg:col-span-6 flex flex-col space-y-6 lg:space-y-8 lg:sticky lg:top-32 lg:self-start h-fit">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold">{product.category}</p>
                <h1 className="font-display text-4xl lg:text-5xl mt-2 tracking-wide font-semibold text-ink">{product.name}</h1>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    <span className="text-xs font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground font-medium">{product.reviews} customer reviews</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="flex items-baseline gap-4 py-2 border-b border-border/60">
                <span className="font-mono text-2xl font-bold text-gold">₹{product.price.toLocaleString("en-IN")}</span>
                {product.oldPrice && (
                  <>
                    <span className="font-mono text-base text-muted-foreground line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>
                    <span className="bg-gold/15 text-gold border border-gold/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {discountPct}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Sizing Option selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold">
                  <span>Size: <span className="text-gold font-mono font-bold ml-1">{selectedSize}</span></span>
                  <button
                    onClick={() => setSizeChartOpen(true)}
                    className="text-gold hover:text-ink transition-colors cursor-pointer gold-underline"
                  >
                    Size Guideline
                  </button>
                </div>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-12 w-16 border rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer ${
                        selectedSize === sz
                          ? "bg-ink border-ink text-cream"
                          : "border-border hover:border-ink text-muted-foreground"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Buy Discount ribbon */}
              <div className="rounded-2xl bg-gold/10 border border-gold/25 p-3.5 text-xs text-ink flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-gold shrink-0 animate-pulse" />
                <div>
                  <span className="font-bold">Multi-Buy Reward Active:</span> Buy 1 get 15% OFF, Buy 2 get 25% OFF, Buy 3+ get 35% OFF! Discount is calculated instantly during checkout.
                </div>
              </div>
            </div>

            {/* Dynamic CTA blocks */}
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-3">
                {/* Add to bag */}
                <button
                  onClick={() => addToCart(product, selectedSize)}
                  className="col-span-4 flex items-center justify-center gap-2 bg-ink hover:bg-charcoal text-cream py-4 text-xs uppercase tracking-[0.3em] transition-all font-semibold rounded-full shadow-luxe cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4 text-gold" />
                  Add to Bag
                </button>
                {/* Toggle Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="col-span-1 border border-border hover:border-ink hover:text-ink rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`h-5 w-5 transition-colors ${wish ? "fill-gold text-gold" : "text-foreground"}`} />
                </button>
              </div>

              {/* Buy Now Direct */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gold hover:bg-[#D4B26F] text-ink py-4 text-xs uppercase tracking-[0.3em] font-bold rounded-full transition-all cursor-pointer shadow-soft"
              >
                Buy Now
              </button>
            </div>

            {/* Tabbed Specs */}
            <div className="border-t border-border/80 pt-6">
              <div className="flex border-b border-border/60 pb-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground gap-6">
                {(["story", "care", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 border-b-2 transition-all cursor-pointer ${
                      activeTab === tab ? "border-gold text-ink" : "border-transparent hover:text-foreground"
                    }`}
                  >
                    {tab === "story" ? "The Story" : tab === "care" ? "Fabric & Care" : "Shipping & Returns"}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-xs text-muted-foreground leading-relaxed">
                {activeTab === "story" && (
                  <p>
                    Part of our curated seasonal drop. Patterned in our Mumbai studio and sampled in small batches, this piece showcases a relaxed, comfortable cut tailored to stand the test of time. Crafted from high-twist combed cotton to deliver clean structural lines and a luxurious premium feel.
                  </p>
                )}
                {activeTab === "care" && (
                  <ul className="space-y-1.5 list-disc pl-4">
                    <li>100% premium long-staple organic cotton.</li>
                    <li>Heavyweight, structured feel (240+ GSM).</li>
                    <li>Pre-shrunk and pre-washed for zero post-wash shrinkage.</li>
                    <li>Machine wash cold on gentle cycle; hang dry.</li>
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <p>
                    We provide complimentary standard shipping across India. Standard orders are handled instantly and delivered in 3-5 business days. Returns and sizing exchange requests can be easily generated inside our portal within 7 days of package delivery.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Similar Curated Pieces */}
        <div className="mt-24 border-t border-border pt-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold font-bold">Recommendations</p>
            <h2 className="font-display text-4xl mt-3 text-ink">Similar Curated Pieces</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sizing Guideline Chart Overlay Modal */}
      <SizeChartModal isOpen={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />

      {/* LUXURY SLIDER ZOOM LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 text-cream py-6 px-4 select-none animate-fade-in">
          {/* Top Panel Actions */}
          <div className="w-full max-w-5xl flex items-center justify-between z-10 border-b border-white/10 pb-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Fabric Curation Detail</span>
              <span className="text-sm font-semibold tracking-wide text-white">{product.name}</span>
            </div>

            {/* Slider zoom amount indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono">
              <span className="text-white/60">Zoom Scale:</span>
              <span className="text-gold font-bold">{Math.round(zoomScale * 100)}%</span>
            </div>

            <button
              onClick={() => {
                setLightboxOpen(false);
                setZoomScale(1);
              }}
              className="p-2 bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-all cursor-pointer"
              title="Close Magnifier"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Central Panning Viewport */}
          <div
            ref={containerRef}
            className="flex-1 w-full max-w-4xl overflow-hidden relative flex items-center justify-center my-6 cursor-grab active:cursor-grabbing rounded-2xl bg-white/[0.02]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="transition-transform duration-100 ease-out select-none"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                transformOrigin: "center center",
              }}
            >
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                draggable={false}
                className="max-h-[70vh] max-w-full object-contain pointer-events-none rounded-lg"
              />
            </div>
            
            {/* Magnification watermark instructions */}
            {zoomScale <= 1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-xs uppercase tracking-widest text-gold font-semibold animate-pulse">
                  Adjust Slider or Click Zoom in below
                </span>
              </div>
            )}
          </div>

          {/* Bottom Zoom Slider Control */}
          <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
            {/* Scale controller buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale(prev => Math.max(1, prev - 0.25))}
                disabled={zoomScale <= 1}
                className="p-2 hover:bg-white/10 border border-white/10 text-white disabled:opacity-40 rounded-full transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="h-4.5 w-4.5" />
              </button>

              <button
                onClick={() => setZoomScale(prev => Math.min(4, prev + 0.25))}
                disabled={zoomScale >= 4}
                className="p-2 hover:bg-white/10 border border-white/10 text-white disabled:opacity-40 rounded-full transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="h-4.5 w-4.5" />
              </button>

              <button
                onClick={() => {
                  setZoomScale(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                disabled={zoomScale === 1}
                className="p-2 hover:bg-white/10 border border-white/10 text-white disabled:opacity-40 rounded-full transition-all cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* ZOOM SLIDER INPUT */}
            <div className="flex-1 w-full flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold shrink-0">1x (100%)</span>
              <input
                type="range"
                min="1"
                max="4"
                step="0.05"
                value={zoomScale}
                onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-gold outline-none"
              />
              <span className="text-[10px] uppercase tracking-wider text-gold font-bold shrink-0">4x (400%)</span>
            </div>
            
            {/* Visual zoom slider amount indicator */}
            <div className="sm:hidden text-xs font-mono">
              Scale: <span className="text-gold font-bold">{Math.round(zoomScale * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
