import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const pages = defineCollection({
	// Load Markdown and MDX files in the `src/content/pages/` directory.
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// URL-Pfad (optional, Standard: Dateiname)
			slug: z.string().optional(),
			// Hero-Bild (optional)
			heroImage: image().optional(),
			// Seiten-Typ für unterschiedliche Layouts
			pageType: z.enum(['standard', 'contact', 'legal']).default('standard'),
			// In Navigation anzeigen
			showInNav: z.boolean().default(false),
			// Sortierreihenfolge für Navigation
			navOrder: z.number().optional(),
			// Zuletzt aktualisiert
			updatedDate: z.coerce.date().optional(),
		}),
});

export const collections = { blog, pages };
