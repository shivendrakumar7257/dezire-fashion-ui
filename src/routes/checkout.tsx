import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, ArrowRight, Sparkles, CreditCard, Landmark, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import { useStore } from "@/hooks/use-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Dezire Fashion" },
      { name: "description", content: "Complete your luxury curation purchase securely." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMode, setPaymentMode] = useState<"upi" | "card" | "cod">("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "loading" | "success">("idle");
  const [orderNum, setOrderNum] = useState("");
  const [rewardCode] = useState(() => ["DEZIRE30", "ATELIER35", "ROYAL50"][Math.floor(Math.random() * 3)]);

  // Cart pricing math
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountPct = 0;
  if (totalItems === 1) discountPct = 0.15;
  else if (totalItems === 2) discountPct = 0.25;
  else if (totalItems >= 3) discountPct = 0.35;

  const discountVal = subtotal * discountPct;
  const total = subtotal - discountVal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[`card_${name}`]) {
      setFormErrors((prev) => ({ ...prev, [`card_${name}`]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) errors.address = "Delivery address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errors.pincode = "Enter a valid 6-digit PIN code";
    }

    if (paymentMode === "card") {
      if (!cardData.number.trim() || cardData.number.replace(/\s/g, "").length < 16) {
        errors.card_number = "Enter a valid 16-digit card number";
      }
      if (!cardData.expiry.trim() || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
        errors.card_expiry = "Expiry must be in MM/YY format";
      }
      if (!cardData.cvv.trim() || cardData.cvv.length < 3) {
        errors.card_cvv = "Enter a 3-digit CVV number";
      }
    } else if (paymentMode === "upi") {
      if (!upiId.trim() || !upiId.includes("@")) {
        errors.upi = "Please enter a valid UPI ID (e.g. name@upi)";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(formErrors)[0];
      const errorEl = document.getElementsByName(firstError)[0];
      if (errorEl) errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setCheckoutStep("loading");
    setTimeout(() => {
      const num = "DEZ-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNum(num);
      setCheckoutStep("success");
      clearCart();
    }, 2000);
  };

  if (checkoutStep === "success") {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center space-y-8 animate-fade-up">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold mx-auto border border-gold/30">
          <CheckCircle2 className="h-12 w-12 animate-bounce" />
        </div>
        <div className="space-y-3">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-wide text-ink">Order Curated Successfully</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Thank you for curating your signature style with DeZire. Your bespoke premium garment shipment has been registered.
          </p>
        </div>

        {/* Invoice Summary and Loyalty Scratch Card */}
        <div className="max-w-md mx-auto space-y-6">
          {/* Invoice Summary Card */}
          <div className="bg-[#F9F9F9] border border-border rounded-3xl p-6 text-left space-y-4">
            <div className="flex justify-between border-b border-border/60 pb-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Order Reference</span>
              <span className="font-mono text-sm font-bold text-foreground">{orderNum}</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Delivery To:</span> {formData.name}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Address:</span> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Method:</span> {paymentMode === "card" ? "Credit Card" : paymentMode === "upi" ? `UPI (${upiId})` : "Cash on Delivery (COD)"}
              </p>
            </div>
            <div className="border-t border-border/60 pt-3 flex justify-between items-baseline">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Total Paid</span>
              <span className="font-mono text-lg font-bold text-gold">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Mystery Scratch Loyalty Reward Card */}
          <div className="bg-gold/5 border border-gold/20 rounded-3xl p-6 space-y-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-gold">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Mystery Scratch Reward</span>
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Scratch away the golden plate below with your cursor or finger to unlock an exclusive mystery discount coupon code for your next curation!
            </p>
            <ScratchCard code={rewardCode} />
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-ink hover:bg-charcoal text-cream px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-all font-semibold rounded-full cursor-pointer shadow-soft"
          >
            Return Home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20 animate-fade-up">
      <div className="flex flex-col gap-3 pb-8 border-b border-border/60">
        <h1 className="font-display text-4xl lg:text-6xl tracking-wide text-ink">Bespoke Checkout</h1>
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-bold">Secure Luxury Payment Portal</p>
      </div>

      {checkoutStep === "loading" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/45 backdrop-blur-md">
          <div className="w-full max-w-sm bg-background border border-border p-8 rounded-3xl text-center space-y-4 shadow-luxe flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Authenticating gateway...</p>
              <p className="text-[10px] text-muted-foreground mt-1 max-w-[240px] mx-auto leading-relaxed">
                Do not refresh or close this connection. Packing your luxury silhouettes...
              </p>
            </div>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium">No items ready for checkout</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-xs">
              Your curations bag is currently empty. Explore our pieces to populate checkout.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-ink hover:bg-charcoal text-cream px-6 py-3.5 text-xs uppercase tracking-[0.25em] transition-all font-semibold rounded-full cursor-pointer shadow-soft"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Shipping & Billing form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-10">
            {/* Delivery address details */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-gold font-bold pb-2 border-b border-border/60">
                01. Delivery Coordinates
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Shivam Sharma"
                    className={`w-full bg-muted border ${formErrors.name ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. shivam@example.com"
                    className={`w-full bg-muted border ${formErrors.email ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-muted border ${formErrors.phone ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.phone}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Shipping Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Building name, street, locality"
                    className={`w-full bg-muted border ${formErrors.address ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.address && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.address}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className={`w-full bg-muted border ${formErrors.city ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.city && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.city}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Maharashtra"
                    className={`w-full bg-muted border ${formErrors.state ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.state && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.state}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit zip code"
                    maxLength={6}
                    className={`w-full bg-muted border ${formErrors.pincode ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-3 text-xs outline-none transition-colors`}
                  />
                  {formErrors.pincode && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {formErrors.pincode}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment options */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-gold font-bold pb-2 border-b border-border/60">
                02. Payment Architecture
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {/* Credit/Debit Card selector */}
                <button
                  type="button"
                  onClick={() => setPaymentMode("card")}
                  className={`flex flex-col items-center justify-center p-5 border rounded-2xl gap-2 transition-all cursor-pointer ${
                    paymentMode === "card"
                      ? "border-ink bg-ink text-cream"
                      : "border-border hover:border-ink text-muted-foreground"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Credit Card</span>
                </button>

                {/* UPI selector */}
                <button
                  type="button"
                  onClick={() => setPaymentMode("upi")}
                  className={`flex flex-col items-center justify-center p-5 border rounded-2xl gap-2 transition-all cursor-pointer ${
                    paymentMode === "upi"
                      ? "border-ink bg-ink text-cream"
                      : "border-border hover:border-ink text-muted-foreground"
                  }`}
                >
                  <Landmark className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">UPI Option</span>
                </button>

                {/* COD selector */}
                <button
                  type="button"
                  onClick={() => setPaymentMode("cod")}
                  className={`flex flex-col items-center justify-center p-5 border rounded-2xl gap-2 transition-all cursor-pointer ${
                    paymentMode === "cod"
                      ? "border-ink bg-ink text-cream"
                      : "border-border hover:border-ink text-muted-foreground"
                  }`}
                >
                  <Truck className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Cash on Delivery</span>
                </button>
              </div>

              {/* Dynamic sub-forms */}
              <div className="bg-[#F9F9F9] border border-border/80 rounded-2xl p-5 mt-4">
                {paymentMode === "card" && (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Credit/Debit Card Data</p>
                    <div className="grid gap-3 sm:grid-cols-4">
                      <div className="col-span-4 space-y-1">
                        <input
                          type="text"
                          name="number"
                          value={cardData.number}
                          onChange={handleCardChange}
                          placeholder="Card Number (16-digit)"
                          maxLength={19}
                          className={`w-full bg-background border ${formErrors.card_number ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-2.5 text-xs outline-none`}
                        />
                        {formErrors.card_number && <span className="text-[9px] text-red-500">{formErrors.card_number}</span>}
                      </div>
                      <div className="col-span-2 space-y-1">
                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          placeholder="Expiry (MM/YY)"
                          maxLength={5}
                          className={`w-full bg-background border ${formErrors.card_expiry ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-2.5 text-xs outline-none`}
                        />
                        {formErrors.card_expiry && <span className="text-[9px] text-red-500">{formErrors.card_expiry}</span>}
                      </div>
                      <div className="col-span-2 space-y-1">
                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="CVV (3-digit)"
                          maxLength={3}
                          className={`w-full bg-background border ${formErrors.card_cvv ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-2.5 text-xs outline-none`}
                        />
                        {formErrors.card_cvv && <span className="text-[9px] text-red-500">{formErrors.card_cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMode === "upi" && (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Unified Payments Interface (UPI)</p>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="upiId"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          if (formErrors.upi) setFormErrors((prev) => ({ ...prev, upi: "" }));
                        }}
                        placeholder="Enter UPI VPA (e.g. name@paytm)"
                        className={`w-full bg-background border ${formErrors.upi ? "border-red-500" : "border-border/60"} focus:border-ink rounded-xl px-4 py-2.5 text-xs outline-none`}
                      />
                      {formErrors.upi && <span className="text-[10px] text-red-500 block">{formErrors.upi}</span>}
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Verify address and complete verification in your BHIM, Google Pay, PhonePe, or paytm banking app.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMode === "cod" && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Cash On Delivery Confirmation</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your order total is <span className="font-bold text-foreground">₹{total.toLocaleString("en-IN")}</span>. An SMS confirmation code will be sent to <span className="font-semibold text-foreground">{formData.phone || "your number"}</span> upon packaging. Ensure cash is available at execution delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Secure Action */}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-ink hover:bg-charcoal text-cream py-4 text-xs uppercase tracking-[0.3em] transition-all font-semibold rounded-full shadow-luxe cursor-pointer"
              >
                Place Curated Order <ArrowRight className="h-4 w-4 text-gold" />
              </button>
            </div>
          </form>

          {/* Right Column - Cart checkout summary panel */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gold font-bold pb-2 border-b border-border/60">
              03. Order Summary
            </h2>

            {/* Cart Items list */}
            <div className="bg-[#F9F9F9] border border-border/80 rounded-3xl p-5 divide-y divide-border/60">
              <div className="space-y-4 pb-4">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 items-center">
                    <div className="h-16 w-12 bg-muted border border-border rounded-md overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-ink line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase mt-0.5 tracking-wider">
                        Size: <span className="font-bold font-mono text-gold uppercase">{item.size}</span> · Qty: <span className="font-bold text-foreground font-mono">{item.quantity}</span>
                      </p>
                    </div>
                    <div className="shrink-0 font-mono text-xs font-bold text-foreground">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reward and totals block */}
              <div className="pt-4 space-y-3.5 text-xs">
                <div className="rounded-xl bg-gold/10 border border-gold/20 p-3 text-ink flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span className="text-[10px] font-medium leading-normal">
                    Multi-Buy Discount applied: <span className="font-mono font-bold text-gold bg-ink rounded px-1 ml-0.5">{(discountPct * 100)}% OFF</span>
                  </span>
                </div>

                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gold">
                    <span>Curated Savings ({(discountPct * 100)}%)</span>
                    <span className="font-mono">- ₹{discountVal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Shipping</span>
                    <span className="uppercase text-[9px] font-bold text-emerald-600 tracking-wider">Free</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 flex justify-between items-baseline font-bold">
                  <span className="text-sm">Final Curated Amount</span>
                  <span className="font-mono text-gold text-lg">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ScratchCard({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratchedFully, setScratchedFully] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Golden luxury gradient
    const grad = ctx.createLinearGradient(0, 0, 320, 160);
    grad.addColorStop(0, "#E5C158");
    grad.addColorStop(0.3, "#C5A059");
    grad.addColorStop(0.7, "#E5C158");
    grad.addColorStop(1, "#9C7A3C");
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 320, 160);

    // Golden noise texture
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(Math.random() * 320, Math.random() * 160, 1.5, 1.5);
    }

    // Text Overlay
    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("DEZIRE LOYALTY CLUB", 160, 48);
    
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(26, 26, 26, 0.7)";
    ctx.fillText("★ ★ ★ ★ ★", 160, 70);

    ctx.font = "bold 9px sans-serif";
    ctx.fillStyle = "#1A1A1A";
    ctx.fillText("SCRATCH WITH MOUSE OR TOUCH FINGER", 160, 100);
    ctx.font = "8px sans-serif";
    ctx.fillText("TO REVEAL SECRET DISCOUNTS", 160, 115);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || scratchedFully) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e, canvas);
    if (!coords) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check percent cleared
    const imageData = ctx.getImageData(0, 0, 320, 160);
    const pixels = imageData.data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) cleared++;
    }
    const percentCleared = (cleared / (320 * 160)) * 100;
    if (percentCleared > 45) {
      ctx.clearRect(0, 0, 320, 160);
      setScratchedFully(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-[320px] h-[160px] mx-auto overflow-hidden rounded-2xl border border-gold/30 bg-[#161616] flex flex-col items-center justify-center select-none shadow-soft">
      {/* Revealed layer */}
      <div className="text-center space-y-2 p-4 animate-fade-in flex flex-col items-center justify-center h-full w-full">
        <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold">Mystery Tier Reward Unlocked!</span>
        <h4 className="font-mono text-2xl font-black text-white tracking-widest">{code}</h4>
        
        {code === "ROYAL50" && (
          <p className="text-[9px] text-gold font-semibold uppercase tracking-wider animate-pulse">
            ★ Grand Sovereign Tier (50% Off Next Drop!) ★
          </p>
        )}
        {code !== "ROYAL50" && (
          <p className="text-[9px] text-white/50 uppercase tracking-wider">
            Mystery discount verified for your next checkout.
          </p>
        )}

        <button
          onClick={handleCopy}
          className={`mt-2 px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            copied 
              ? "bg-emerald-600 text-cream" 
              : "bg-gold text-ink hover:bg-[#D4B26F] shadow-soft"
          }`}
        >
          {copied ? "Copied Successfully!" : "Copy Coupon Code"}
        </button>
      </div>

      {/* Gold canvas cover overlay */}
      {!scratchedFully && (
        <canvas
          ref={canvasRef}
          width={320}
          height={160}
          onMouseDown={() => setIsDrawing(true)}
          onMouseMove={draw}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onTouchStart={() => setIsDrawing(true)}
          onTouchMove={draw}
          onTouchEnd={() => setIsDrawing(false)}
          className="absolute inset-0 z-10 w-full h-full cursor-pointer touch-none"
        />
      )}
    </div>
  );
}

