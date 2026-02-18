export function WishDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Decorative frame - positioned behind content with responsive opacity */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 sm:opacity-20">
        <img
          src="/assets/generated/wish-frame.dim_1600x900.png"
          alt=""
          role="presentation"
          className="w-full h-full object-contain"
          style={{ maxWidth: '1600px', maxHeight: '900px' }}
        />
      </div>
      
      {/* Floating stickers - corners with responsive positioning and sizing */}
      <div 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 animate-bounce opacity-70 sm:opacity-80" 
        style={{ animationDuration: '3s' }}
      >
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          role="presentation"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 animate-bounce opacity-70 sm:opacity-80" 
        style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}
      >
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          role="presentation"
          className="w-full h-full object-contain transform scale-x-[-1]"
        />
      </div>
      
      <div 
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 animate-bounce opacity-60 sm:opacity-70" 
        style={{ animationDuration: '4s', animationDelay: '1s' }}
      >
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          role="presentation"
          className="w-full h-full object-contain transform rotate-45"
        />
      </div>
      
      <div 
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 animate-bounce opacity-60 sm:opacity-70" 
        style={{ animationDuration: '3.8s', animationDelay: '0.8s' }}
      >
        <img
          src="/assets/generated/wish-stickers.dim_512x512.png"
          alt=""
          role="presentation"
          className="w-full h-full object-contain transform scale-x-[-1] rotate-[-45deg]"
        />
      </div>
      
      {/* Subtle gradient glow overlays - responsive sizing */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-celebration-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-celebration-primary/10 rounded-full blur-3xl" />
    </div>
  );
}
