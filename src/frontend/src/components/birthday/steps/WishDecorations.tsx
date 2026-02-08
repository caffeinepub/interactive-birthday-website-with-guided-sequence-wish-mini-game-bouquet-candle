export function WishDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Decorative frame - positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <img
          src="/assets/generated/wish-frame.dim_1600x900.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ maxWidth: '1600px', maxHeight: '900px' }}
        />
      </div>
      
      {/* Floating stickers - corners */}
      <div className="absolute top-8 left-8 w-24 h-24 md:w-32 md:h-32 animate-bounce opacity-80" style={{ animationDuration: '3s' }}>
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="absolute top-8 right-8 w-24 h-24 md:w-32 md:h-32 animate-bounce opacity-80" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          className="w-full h-full object-contain transform scale-x-[-1]"
        />
      </div>
      
      <div className="absolute bottom-8 left-8 w-20 h-20 md:w-28 md:h-28 animate-bounce opacity-70" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          className="w-full h-full object-contain transform rotate-45"
        />
      </div>
      
      <div className="absolute bottom-8 right-8 w-20 h-20 md:w-28 md:h-28 animate-bounce opacity-70" style={{ animationDuration: '3.8s', animationDelay: '0.8s' }}>
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          className="w-full h-full object-contain transform scale-x-[-1] rotate-[-45deg]"
        />
      </div>
      
      {/* Subtle gradient glow overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-celebration-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-celebration-primary/10 rounded-full blur-3xl" />
    </div>
  );
}
