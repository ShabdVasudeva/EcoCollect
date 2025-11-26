import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { EwasteGuide } from '@/components/ewaste-guide';
import { ProductAssessor } from '@/components/product-assessor';
import { RecyclingLocator } from '@/components/recycling-locator';
import { PickupForm } from '@/components/pickup-form';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <EwasteGuide />
        <ProductAssessor />
        <RecyclingLocator />
        <PickupForm />
      </main>
      <Footer />
    </div>
  );
}
