import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Smartphone, BatteryCharging, Tv2, Printer, Cable } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BackgroundPattern } from './background-pattern';

interface EwasteCategory {
  title: string;
  description: string;
  icon: LucideIcon;
}

const categories: EwasteCategory[] = [
  {
    title: 'Smartphones & Tablets',
    description: 'Mobile phones, tablets, and e-readers contain valuable materials that can be recovered.',
    icon: Smartphone,
  },
  {
    title: 'Laptops & Computers',
    description: 'Desktops, laptops, and peripherals like keyboards and mice are accepted.',
    icon: Laptop,
  },
  {
    title: 'Batteries',
    description: 'All types of batteries, including AA, AAA, lithium-ion, and car batteries.',
    icon: BatteryCharging,
  },
  {
    title: 'TVs & Monitors',
    description: 'CRT, LED, LCD, and plasma televisions and computer monitors of all sizes.',
    icon: Tv2,
  },
  {
    title: 'Printers & Scanners',
    description: 'Inkjet and laser printers, scanners, fax machines, and cartridges.',
    icon: Printer,
  },
  {
    title: 'Cables & Chargers',
    description: 'All kinds of electronic cables, chargers, and power adapters.',
    icon: Cable,
  },
];

export function EwasteGuide() {
  return (
    <section id="guide" className="py-16 sm:py-24 bg-background relative overflow-hidden">
       <BackgroundPattern className="absolute inset-0 z-0 opacity-[0.03]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">What Can You Recycle?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            E-waste is any discarded electronic device. Proper disposal is crucial for environmental safety. Here are some common items we collect.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Card key={category.title} className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
              <CardHeader className="p-0">
                <div className="bg-primary/10 rounded-full p-4 mb-4 inline-flex">
                   <category.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-muted-foreground text-sm sm:text-base">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}