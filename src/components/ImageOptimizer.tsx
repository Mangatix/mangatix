import React, { useState, useRef, useEffect } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  placeholder?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  className = '',
  onError,
  placeholder = '/images/characters/placeholder.webp',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate multiple resolution sources for better quality
  const generateSrcSet = (baseSrc: string) => {
    const baseName = baseSrc.replace('.webp', '');
    return [
      `${baseName}.webp 1x`,
      `${baseName}@2x.webp 2x`,
      `${baseName}@3x.webp 3x`
    ].join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(placeholder);
    }
    onError?.(e);
  };

  // Enhanced className with better image rendering
  const enhancedClassName = `
    ${className}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    transition-all duration-300 ease-in-out
    image-enhanced
    progressive-image
    ${isLoaded ? 'loaded' : ''}
  `.trim();

  return (
    <div className="relative overflow-hidden">
      {/* Loading placeholder with shimmer effect */}
      {!isLoaded && (
        <div className={`${className} bg-gray-700 image-loading flex items-center justify-center`}>
          <div className="w-8 h-8 border-2 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Optimized image with enhanced rendering */}
      <img
        ref={imgRef}
        src={currentSrc}
        srcSet={!hasError ? generateSrcSet(currentSrc) : undefined}
        sizes={sizes}
        alt={alt}
        className={enhancedClassName}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: 'contrast(1.15) saturate(1.1) brightness(1.02)',
          transform: 'translateZ(0) scale(1.02)',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          // Enhanced sharpening for larger images
          WebkitFilter: 'contrast(1.15) saturate(1.1) brightness(1.02) unsharp-mask(amount=0.5, radius=0.5, threshold=0)',
        }}
      />
      
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none opacity-30"></div>
    </div>
  );
};