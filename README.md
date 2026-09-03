This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding an architecture project

Create a folder whose name is the project's URL slug:

```text
public/projects/my-new-project/
├── project.json
├── optimized/
│   ├── project_001.webp
│   ├── project_002.webp
│   ├── project_003.webp
│   ├── hero.webp
│   └── blur/
└── card/
    ├── card.webp
    └── blur.webp
```

Use this structure for `project.json`:

```json
{
  "slug": "my-new-project",
  "title": "Project title",
  "tagline": "Short summary",
  "description": "Full project description.",
  "category": "residential",
  "active": true,
  "metadata": {
    "location": "Liberec",
    "year": "2026",
    "architect": "Ing. arch. Pavel Novák",
    "organization": "OMNIARCH"
  }
}
```

Valid categories are `residential`, `commercial`, and `public`. Set `active` to
`false` to hide a project and its generated page. Gallery images are read from the
project's `optimized` folder and ordered by filename, so use zero-padded numbers
such as `_001`, `_002`, and `_003`. `hero.webp` is reserved for the project-page
hero and is not included as a separate gallery item.

The project order is controlled centrally by `public/projects/order.json`. Move
the slug lines in that file to rearrange the portfolio. A new project whose slug
is not listed there is added automatically at the end.

`npm run dev` and `npm run build` automatically validate all metadata, generate
`lib/projects.generated.ts`. Invalid metadata, duplicate or unknown ordered slugs, missing hero
or card assets, or malformed JSON stop the build with a clear error. Do not edit the
generated TypeScript manually.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
