import { X } from "lucide-react";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  if (!isOpen) return null;

  const sizes = [
    { size: "S", chest: "38 in", shoulder: "17.5 in", length: "27 in", sleeve: "8 in" },
    { size: "M", chest: "40 in", shoulder: "18.0 in", length: "28 in", sleeve: "8.5 in" },
    { size: "L", chest: "42 in", shoulder: "19.0 in", length: "29 in", sleeve: "9.0 in" },
    { size: "XL", chest: "44 in", shoulder: "20.0 in", length: "30 in", sleeve: "9.5 in" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-background border border-border text-foreground shadow-luxe transition-all animate-fade-up z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-[#F9F9F9]">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-wide text-ink">Sizing Matrix</h3>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">How to choose your perfect drape</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Two-Column Content Layout */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Visual SVG Garment Measurement Guide (5/12 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-[#F9F9F9] rounded-2xl border border-border/60 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold text-center">Visual Curation Guide</span>
            
            {/* SVG Garment Visual Outlines */}
            <div className="relative w-full max-w-[200px] aspect-[4/5] flex items-center justify-center">
              <svg viewBox="0 0 200 240" className="w-full h-full text-ink" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* stylized Tee silhouette path outline */}
                <path 
                  d="M 60,25 
                     C 70,37 130,37 140,25 
                     L 185,38 
                     L 170,72 
                     L 152,65 
                     L 152,215 
                     C 152,218 150,220 147,220
                     L 53,220 
                     C 50,220 48,218 48,215
                     L 48,65 
                     L 30,72 
                     L 15,38 
                     Z" 
                  fill="rgba(197, 160, 89, 0.04)" 
                  stroke="rgba(0, 0, 0, 0.12)" 
                  strokeWidth="1.5"
                />
                
                {/* Collar curve detailing */}
                <path d="M 60,25 C 75,40 125,40 140,25" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <path d="M 62,28 C 76,42 124,42 138,28" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="0.8" />
                
                {/* Hemline detail */}
                <path d="M 48,213 L 152,213" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" />
                
                {/* MEASUREMENT A: CHEST LINE */}
                <line x1="48" y1="80" x2="152" y2="80" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="48" cy="80" r="3.5" fill="#C5A059" className="animate-ping" />
                <circle cx="48" cy="80" r="2.5" fill="#C5A059" />
                <circle cx="152" cy="80" r="2.5" fill="#C5A059" />
                <text x="100" y="74" fill="#C5A059" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">A. CHEST LINE</text>

                {/* MEASUREMENT B: SHOULDER LINE */}
                <line x1="22" y1="42" x2="178" y2="42" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="22" cy="42" r="2.5" fill="#C5A059" />
                <circle cx="178" cy="42" r="2.5" fill="#C5A059" />
                <text x="100" y="36" fill="#C5A059" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">B. SHOULDER</text>

                {/* MEASUREMENT C: BODY LENGTH */}
                <line x1="62" y1="25" x2="62" y2="220" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="62" cy="25" r="2.5" fill="#C5A059" />
                <circle cx="62" cy="220" r="2.5" fill="#C5A059" />
                <text x="68" y="130" fill="#C5A059" fontSize="8" fontWeight="bold" textAnchor="start" letterSpacing="0.08em">C. BODY LENGTH</text>
              </svg>
            </div>
            
            <div className="text-center text-[10px] text-muted-foreground leading-relaxed max-w-[180px]">
              Lay your favorite flat shirt down and measure to get the closest visual matching.
            </div>
          </div>

          {/* RIGHT COLUMN: Table Matrix & Details (7/12 cols) */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Measurement Table */}
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#F9F9F9] text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-4 py-3.5 font-semibold text-center">Size</th>
                    <th className="px-4 py-3.5 font-semibold">A. Chest</th>
                    <th className="px-4 py-3.5 font-semibold">B. Shoulder</th>
                    <th className="px-4 py-3.5 font-semibold">C. Length</th>
                    <th className="px-4 py-3.5 font-semibold">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-xs">
                  {sizes.map((row) => (
                    <tr key={row.size} className="hover:bg-gold/5 transition-colors">
                      <td className="px-4 py-3 text-center font-bold text-gold uppercase">{row.size}</td>
                      <td className="px-4 py-3 text-ink font-semibold">{row.chest}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.shoulder}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.length}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Guideline specifications */}
            <div className="space-y-4 bg-[#F9F9F9] border border-border/80 rounded-2xl p-4.5">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink border-b border-border/60 pb-2">How to Measure:</h4>
              <ul className="text-xs space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="bg-gold/15 text-gold font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 uppercase">A</span>
                  <div>
                    <span className="font-bold text-foreground block">Chest Line</span>
                    Measure horizontal across the fullest part of your chest, running exactly under your armpits.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="bg-gold/15 text-gold font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 uppercase">B</span>
                  <div>
                    <span className="font-bold text-foreground block">Shoulder Width</span>
                    Measure straight across from the outer edge of one shoulder bone to the other.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="bg-gold/15 text-gold font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 uppercase">C</span>
                  <div>
                    <span className="font-bold text-foreground block">Body Length</span>
                    Measure straight down vertical from the highest point of your shoulder collar to the bottom hemline.
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
