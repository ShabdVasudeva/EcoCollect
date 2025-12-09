import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Recycle, Biohazard, Gem } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AwarenessStat {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

const stats: AwarenessStat[] = [
  {
    title: 'Global Generation',
    value: '50 Million Tonnes',
    description: 'Of e-waste are generated globally each year, equivalent to discarding 1000 laptops every second.',
    icon: Globe,
  },
  {
    title: 'Recycling Rate',
    value: 'Only 17.4%',
    description: 'Of this massive amount is formally documented and properly recycled, leading to vast environmental pollution.',
    icon: Recycle,
  },
  {
    title: 'Hazardous Materials',
    value: 'Toxic Substances',
    description: 'E-waste contains harmful materials like lead, mercury, and cadmium that can contaminate soil and water.',
    icon: Biohazard,
  },
  {
    title: 'Valuable Resources',
    value: '$62.5 Billion',
    description: 'Is the estimated value of recoverable materials like gold, silver, and copper lost in e-waste annually.',
    icon: Gem,
  },
];

export function AwarenessSection() {
  return (
    <section id="awareness" className="py-16 sm:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">The Global E-Waste Challenge</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Understanding the scale of the problem is the first step towards a solution. Here are the facts.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {stats.map((stat) => (
            <Card key={stat.title} className="flex flex-col text-center items-center p-6 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="bg-primary/10 rounded-full p-4 mb-4 inline-flex">
                   <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">{stat.title}</p>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
