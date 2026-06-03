'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface GalleryItem {
  title: string;
  category: string;
  color?: string;
  span?: string;
  src: string;
}

interface ImageGalleryProps {
  items: GalleryItem[];
  onImageClick?: (item: GalleryItem) => void;
}

export function ImageGallery({ items, onImageClick }: ImageGalleryProps) {
	return (
		<div className="relative flex w-full flex-col items-center justify-center pb-10">
			<div className="mx-auto w-full columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
				{items.map((item, index) => {
					// Determine ratio based on index for variety
					const isPortrait = index % 2 === 0;
					const width = isPortrait ? 1080 : 1920;
					const height = isPortrait ? 1920 : 1080;
					const ratio = isPortrait ? 9 / 16 : 16 / 9;

					return (
						<div 
							key={index}
							className="break-inside-avoid group cursor-pointer relative mb-4 md:mb-6"
							onClick={() => onImageClick?.(item)}
						>
							<AnimatedImage
								alt={item.title}
								src={item.src}
								ratio={ratio}
								placeholder={`https://placehold.co/${width}x${height}/2a2a35/ffffff?text=Loading...`}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-2 md:p-5">
								<span className="text-[10px] md:text-xs text-primary font-semibold uppercase tracking-wider mb-1">
									{item.category}
								</span>
								<h3 className="font-heading text-sm md:text-lg font-semibold text-white">
									{item.title}
								</h3>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

interface AnimatedImageProps {
	alt: string;
	src: string;
	className?: string;
	placeholder?: string;
	ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder, className }: AnimatedImageProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);
	const [imgSrc, setImgSrc] = React.useState(src);

	// Update image source if prop changes
	React.useEffect(() => {
		setImgSrc(src);
		setIsLoading(true);
	}, [src]);

	const handleError = () => {
		if (placeholder) {
			setImgSrc(placeholder);
		}
	};

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className={cn("bg-card relative size-full rounded-lg border border-border/50 overflow-hidden", className)}
		>
			<img
				alt={alt}
				src={imgSrc}
				className={cn(
					'size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out',
					{
						'opacity-100': isInView && !isLoading,
					},
				)}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
				onError={handleError}
			/>
		</AspectRatio>
	);
}
