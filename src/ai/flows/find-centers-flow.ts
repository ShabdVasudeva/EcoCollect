'use server';
/**
 * @fileOverview An AI flow to find nearby e-waste recycling centers.
 *
 * - findNearbyCenters - A function that finds recycling centers based on location.
 * - FindNearbyCentersInput - The input type for the findNearbyCenters function.
 * - Center - The type for a single recycling center.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FindNearbyCentersInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user'),
  longitude: z.number().describe('The longitude of the user'),
});
export type FindNearbyCentersInput = z.infer<typeof FindNearbyCentersInputSchema>;

const CenterSchema = z.object({
  id: z.number().describe('A unique identifier for the center'),
  name: z.string().describe('The name of the recycling center'),
  address: z.string().describe('The full address of the center'),
  hours: z.string().describe('The operating hours of the center (e.g., "Mon-Fri: 9am - 5pm")'),
  lat: z.number().describe('The latitude of the center'),
  lng: z.number().describe('The longitude of the center'),
});
export type Center = z.infer<typeof CenterSchema>;

const FindNearbyCentersOutputSchema = z.object({
  centers: z.array(CenterSchema).describe('A list of nearby e-waste recycling centers.'),
});


export async function findNearbyCenters(input: FindNearbyCentersInput): Promise<Center[]> {
  const result = await findNearbyCentersFlow(input);
  return result.centers;
}

const prompt = ai.definePrompt({
  name: 'findNearbyCentersPrompt',
  input: { schema: FindNearbyCentersInputSchema },
  output: { schema: FindNearbyCentersOutputSchema },
  prompt: `You are a local search expert. Your task is to find e-waste recycling centers near the user's location.
  
  User's location:
  Latitude: {{{latitude}}}
  Longitude: {{{longitude}}}
  
  Please generate a list of 5 realistic, but fictional, e-waste recycling centers within a 50-mile radius of the user's location.
  Provide details for each center including a name, full address, operating hours, and precise latitude/longitude coordinates.
  The centers should sound plausible for the given geographic area.
  Ensure the IDs for the centers are unique.`,
});

const findNearbyCentersFlow = ai.defineFlow(
  {
    name: 'findNearbyCentersFlow',
    inputSchema: FindNearbyCentersInputSchema,
    outputSchema: FindNearbyCentersOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        return { centers: [] };
    }
    return output;
  }
);
