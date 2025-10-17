# Retto uPVC Tangerang Website

Static company profile website for Retto uPVC Tangerang showcasing uPVC door and window solutions. Built with semantic HTML5, modern CSS, and vanilla JavaScript with lightweight libraries for animations and integrations.

## Features
- Responsive multi-page layout (Home, About, Products, Projects, Contact)
- Sticky navigation with smooth scrolling and scroll-to-top shortcut
- Animated hero, timeline, product highlights, and gallery using AOS
- Product tabs with technical specifications and quick quotation links
- Filterable project gallery with lightbox previews
- Contact form integrated with EmailJS and Google reCAPTCHA v3 (configure credentials)
- SEO-friendly metadata, Open Graph tags, structured data, sitemap, and robots directives

## Structure
```
├── index.html
├── about.html
├── products.html
├── projects.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── favicon.svg
│   ├── hero-visual.svg
│   ├── product-*.svg
│   └── project*/team*.svg
├── sitemap.xml
└── robots.txt
```

## Setup
1. Replace placeholder IDs in `js/main.js` and inline scripts:
   - `PUBLIC_KEY`, `service_id`, `template_id` for EmailJS
   - `RECAPTCHA_SITE_KEY` for Google reCAPTCHA v3
   - `G-XXXXXXXXXX` with your Google Analytics Measurement ID
2. Update external asset URLs (logo, OG image) if hosting under a different domain.
3. Optimize and replace placeholder SVG images with actual project/product photos for production.
4. Upload the entire folder to your hosting server (e.g., `public_html` on Hostinger).

## Deployment Tips
- Enable gzip compression and browser caching via hosting control panel for faster load times.
- Use descriptive file names for product/project images and provide proper `alt` text when replacing placeholders.
- Validate the sitemap and robots.txt after deployment to ensure correct indexing.
