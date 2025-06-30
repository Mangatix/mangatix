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

  // Generate multiple resolution sources
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

  // Apply image sharpening and enhancement via CSS
  const enhancedClassName = `
    ${className}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    transition-all duration-300 ease-in-out
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    filter: contrast(1.1) saturate(1.05) sharpen(0.5px);
    transform: translateZ(0);
    backface-visibility: hidden;
  `.trim();

  return (
    <div className="relative overflow-hidden">
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className={`${className} bg-gray-700 animate-pulse flex items-center justify-center`}>
          <div className="w-8 h-8 border-2 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Optimized image */}
      <img
        ref={imgRef}
        src={currentSrc}
        srcSet={generateSrcSet(currentSrc)}
        sizes={sizes}
        alt={alt}
        className={enhancedClassName}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: 'contrast(1.1) saturate(1.05)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};