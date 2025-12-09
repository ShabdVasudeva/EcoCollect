import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { EwasteGuide } from '@/components/ewaste-guide';
import { AwarenessSection } from '@/components/awareness-section';
import { ProductAssessor } from '@/components/product-assessor';
import { RecyclingLocator } from '@/components/recycling-locator';
import { PickupForm } from '@/components/pickup-form';
import { Footer } from '@/components/footer';
import { MotionDiv } from '@/components/ui/motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MotionDiv
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <EwasteGuide />
        </MotionDiv>
        <MotionDiv
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AwarenessSection />
        </MotionDiv>
        <MotionDiv
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductAssessor />
        </MotionDiv>
        <MotionDiv
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RecyclingLocator />
        </MotionDiv>
        <MotionDiv
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PickupForm />
        </MotionDiv>
      </main>
      <Footer />
    </div>
  );
}
