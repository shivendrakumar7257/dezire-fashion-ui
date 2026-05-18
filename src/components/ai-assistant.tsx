import { useState, useEffect, useRef } from "react";
import { MessageSquareCode, X, Send, Sparkles, User, Bot } from "lucide-react";

interface Message {
  sender: "user" | "assistant";
  text: string;
  time: string;
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hello! Welcome to DeZire. I am your premium AI Stylist. Ask me anything about our collections, sizing, current orders, or exclusive offers!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes("shipping") || lower.includes("delivery") || lower.includes("track") || lower.includes("order")) {
        reply = "We offer premium shipping across India. Standard orders are processed instantly and delivered in 3-5 business days. You will receive real-time updates and tracking links directly via SMS, WhatsApp, and email.";
      } else if (lower.includes("discount") || lower.includes("offer") || lower.includes("sale") || lower.includes("coupon") || lower.includes("buy")) {
        reply = "Our current seasonal exclusive offer is live: \n• Buy 1 item: get 15% OFF\n• Buy 2 items: get 25% OFF\n• Buy 3+ items: get 35% OFF!\n\nThis premium discount is automatically calculated at checkout.";
      } else if (lower.includes("size") || lower.includes("sizing") || lower.includes("fit")) {
        reply = "Our clothing features a refined, slightly relaxed luxury drape. For perfect fitting, we recommend checking the detailed Size Chart on each product page. If you are between sizes, go for your usual size for a structured look, or size up for a relaxed streetwear fit.";
      } else if (lower.includes("trend") || lower.includes("latest") || lower.includes("popular") || lower.includes("best")) {
        reply = "Our current hot items include the Pleated Linen Trousers, Seamless Heavy-weight Cotton Tees, and structured box-fit Overshirts. You can browse these immediately in the 'Trending Now' section on our homepage!";
      } else if (lower.includes("material") || lower.includes("fabric") || lower.includes("cotton") || lower.includes("linen")) {
        reply = "DeZire uses only premium textiles: 100% long-staple combed cotton (240+ GSM for streetwear), breathable high-twist linen, and luxury wool blends. Each garment is pre-washed and treated for ultimate skin comfort and shape retention.";
      } else if (lower.includes("return") || lower.includes("exchange") || lower.includes("refund")) {
        reply = "We offer a luxurious, hassle-free 7-day return and exchange policy. Items must be unworn and in original packaging. You can easily initiate your request via our customer portal or by reaching out to support.";
      } else {
        reply = "That's a great question! As your personal virtual stylist, I recommend pairing our seamless heavy-weight neutral t-shirts with our tailored pleat trousers for an elevated, effortless look. Is there a specific style, fabric, or sizing detail you'd like me to look up?";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const quickPrompts = [
    { label: "📦 Offers & Sales", text: "What discounts or offers are currently active?" },
    { label: "🔥 Trending Items", text: "What are the latest trending styles right now?" },
    { label: "📏 Sizing & Fits", text: "Can you help me choose the right size?" },
    { label: "🚚 Shipping Times", text: "How long does shipping take?" },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold shadow-luxe transition-all duration-300 hover:scale-110 hover:bg-charcoal active:scale-95 border border-gold/30 cursor-pointer"
        aria-label="DeZire AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 animate-spin-slow" />
        ) : (
          <div className="relative">
            <MessageSquareCode className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-ink animate-pulse">
              AI
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 lg:bottom-24 right-4 lg:right-6 z-50 flex h-[500px] w-[350px] sm:w-[380px] flex-col rounded-3xl overflow-hidden bg-ink text-cream shadow-luxe animate-fade-up border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-charcoal px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-charcoal border border-gold/30">
                <Sparkles className="h-5 w-5 text-gold animate-pulse" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-ink" />
              </div>
              <div>
                <h4 className="font-display text-base tracking-wide font-semibold text-gold">DEZIRE AI</h4>
                <p className="text-[10px] text-cream/60 tracking-wider">Virtual Stylist & Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-cream/70 hover:bg-white/10 hover:text-cream transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border text-xs ${
                    msg.sender === "user"
                      ? "bg-gold border-gold text-ink"
                      : "bg-charcoal border-white/10 text-gold"
                  }`}
                >
                  {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gold/90 text-ink font-medium rounded-tr-none"
                        : "bg-white/10 text-cream rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 block text-[9px] text-cream/40 px-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal border border-white/10 text-gold">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-gold/70 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-gold/70 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-gold/70 animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 pt-1 border-t border-white/5 bg-ink/10">
              <p className="text-[10px] text-cream/40 uppercase tracking-widest mb-2 px-1">Common Questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.text)}
                    className="text-[10.5px] bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 hover:border-gold/30 rounded-full px-3 py-1.5 transition-all text-cream/80 text-left font-medium cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 border-t border-white/10 bg-charcoal">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask DeZire anything..."
                className="w-full bg-white/5 text-cream border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-xs sm:text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all placeholder-cream/30"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink disabled:bg-white/10 disabled:text-cream/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
