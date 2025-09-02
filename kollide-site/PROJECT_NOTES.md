# KOLLIDE Website — Project Notes

## Overview
- Company: KOLLIDE
- Divisions: K3D (football helmets, 3D printed lattices), MTL3D (on‑demand 3D printing in Montreal)
- Tech stack: Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP (+ ScrollTrigger), Lenis

## Goals (from client questionnaire)
- Present KOLLIDE and clearly introduce K3D & MTL3D
- Drive users to K3D site and to the MTL3D page; generate leads for MTL3D
- Modern, dynamic, visually original design; avoid rigid boxes; fluid transitions
- Maximize visibility and SEO

## Branding
- KOLLIDE site base: black background, light foreground
- MTL3D accent: red (`--accent: #e10600`)
- Style: modern, dynamic, bold; fluid/"fondu" visuals
- Inspirations: RE ZRO, MIPS, Specialized, Alpine, Apple, Revolut, Wealthsimple, Omnitrans

## Pages
- `/` — KOLLIDE home, mission, quick intros + CTAs to K3D and MTL3D
- `/k3d` — K3D intro (helmet innovation, VT #1 rating note)
- `/mtl3d` — MTL3D intro with CTA to request quote/lead form

## Animations
- Framer Motion: page/section fades and reveals
- GSAP + ScrollTrigger: advanced scroll scenes (parallax, pinning) [to add]
- Lenis: smooth scrolling enabled globally

## SEO (to implement)
- Metadata: titles, descriptions per page; OpenGraph/Twitter
- Robots + sitemap
- Content structure with headings

## Lead Generation (MTL3D)
- Initial CTA button; replace with form (name, email, file upload, message)
- Potential integrations: form backend (e.g., Formspree), or Next API route + email

## Next Steps
1. Flesh out content and visuals per brand
2. Add scroll-based animations with GSAP/ScrollTrigger
3. Implement lead form for MTL3D
4. Add SEO metadata and sitemap

## Notes
- Questionnaire file referenced: `../questionnaire.txt`
- Avoid user confusion between KOLLIDE, K3D, MTL3D via clear IA and visual separation
