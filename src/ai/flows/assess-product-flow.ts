'use server';
/**
 * @fileOverview An AI flow to assess if a product is e-waste.
 *
 * - assessProduct - A function that assesses a product based on its details.
 * - AssessProductInput - The input type for the assessProduct function.
 * - AssessProductOutput - The return type for the assessProduct function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssessProductInputSchema = z.object({
  productName: z.string().describe('The name of the electronic device.'),
  purchaseYear: z.number().describe('The year the product was purchased.'),
  conditionDescription: z
    .string()
    .describe("A description of the product's current condition."),
});
export type AssessProductInput = z.infer<typeof AssessProductInputSchema>;

const AssessProductOutputSchema = z.object({
  isEwaste: z
    .boolean()
    .describe(
      'Whether the product is considered e-waste (true) or still usable (false).'
    ),
  assessment: z
    .string()
    .describe('A brief explanation for the assessment.'),
});
export type AssessProductOutput = z.infer<typeof AssessProductOutputSchema>;

export async function assessProduct(
  input: AssessProductInput
): Promise<AssessProductOutput> {
  return await assessProductFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessProductPrompt',
  input: { schema: AssessProductInputSchema },
  output: { schema: AssessProductOutputSchema },
  prompt: `You are an expert in electronics lifecycle and recycling. Your task is to assess if a given electronic product is likely e-waste based on its name, age, and condition.

  Current Year: ${new Date().getFullYear()}

  Product Details:
  - Name: {{{productName}}}
  - Purchased In: {{{purchaseYear}}}
  - Condition: {{{conditionDescription}}}
  
  Assessment Criteria:
  - **Age:** Products older than 7-10 years are often obsolete, unsupported, or inefficient, making them likely e-waste unless they are in perfect working order or are a high-value vintage item.
  - **Functionality:** If the item is broken, non-functional, or requires a costly repair that exceeds its current value, it is e-waste.
  - **Condition:** Significant physical damage (cracked screens, broken casings) that impairs function points towards e-waste.
  - **Repairability:** Consider if it's a common item that is easily repaired vs. one that is difficult or impossible to get parts for.

  Based on these criteria, determine if the product is e-waste. Provide a concise, helpful assessment explaining your reasoning. For example, if it's an old but working device, you might suggest it's still usable but nearing the end of its life. If it's broken, confirm it is e-waste and should be recycled.
  `,
});

const assessProductFlow = ai.defineFlow(
  {
    name: 'assessProductFlow',
    inputSchema: AssessProductInputSchema,
    outputSchema: AssessProductOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid assessment.');
    }
    return output;
  }
);
