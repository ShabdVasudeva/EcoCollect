import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          Give Your E-Waste a New Life
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-md">
          Join us in building a sustainable future. Responsibly recycle your old electronics with EcoCollect.
        </p>
        <a href="#guide" className="mt-8">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full">
            Learn More
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>
    </section>
  );
}
