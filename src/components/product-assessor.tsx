'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Recycle, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import {
  assessProduct,
} from '@/ai/flows/assess-product-flow';
import type { AssessProductOutput } from '@/ai/flows/assess-product-flow';


const AssessProductInputSchema = z.object({
  productName: z.string({ required_error: 'Product name is required.'}).min(2, 'Product name must be at least 2 characters.'),
  purchaseYear: z.coerce.number().int().min(1980, "Please enter a valid year."),
  conditionDescription: z
    .string({ required_error: 'Condition is required.'})
    .min(1, 'Please provide a more detailed description (at least 1 characters).'),
});

type FormValues = z.infer<typeof AssessProductInputSchema>;

export function ProductAssessor() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [assessmentResult, setAssessmentResult] =
    React.useState<AssessProductOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(AssessProductInputSchema),
    defaultValues: {
      productName: '',
      purchaseYear: new Date().getFullYear(),
      conditionDescription: '',
    },
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setError(null);
    setAssessmentResult(null);

    try {
      const result = await assessProduct(values);
      setAssessmentResult(result);
    } catch (e: any) {
      console.error(e);
      setError('An error occurred while assessing your product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="assessor" className="py-16 sm:py-24 bg-muted/50">
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Is It E-Waste?
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Let our AI help you decide if your item can be reused or needs recycling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Apple iPhone 8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchaseYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Purchase</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="conditionDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Cracked screen, doesn't turn on, battery dies quickly..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full text-base py-6" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Assessing...
                    </>
                  ) : (
                    'Assess My Item'
                  )}
                </Button>
              </form>
            </Form>

            {assessmentResult && (
              <div className="mt-8">
                <Alert variant={assessmentResult.isEwaste ? 'destructive' : 'default'} className="bg-card">
                  {assessmentResult.isEwaste ? (
                     <Recycle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}

                  <AlertTitle className="font-bold text-lg ml-2">
                    {assessmentResult.isEwaste
                      ? 'This is likely E-Waste'
                      : 'Still Usable!'}
                  </AlertTitle>
                  <AlertDescription className="ml-2">
                    {assessmentResult.assessment}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {error && (
                 <div className="mt-8">
                    <Alert variant="destructive">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle className="font-bold text-lg ml-2">Error</AlertTitle>
                        <AlertDescription className="ml-2">{error}</AlertDescription>
                    </Alert>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}