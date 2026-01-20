# Font Installation Guide

## NuClear Typography: The Seasons & Roboto

This document describes the typography system for the Nuclear-Nextjs application using The Seasons (serif) for headings and Roboto (sans-serif) for body text.

## Overview

The NuClear brand uses a dual-typeface system:
- **The Seasons (Serif)**: Used for the NuClear logo and major headings to express authority, credibility, and a refined scientific presence
- **Roboto (Sans-Serif)**: Used for subheadings, body text, instructions, and regulatory content to ensure clarity, readability, and pharmaceutical compliance

## Installation Steps

### 1. Roboto Font (Currently Active)

Roboto is loaded via Google Fonts and is configured in `/app/layout.tsx`:

```tsx
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet" />
```

**Font Weights Available:**
- Regular (400): Body text
- Medium (500): Emphasis
- Semibold (600): Strong emphasis

### 2. The Seasons Font (Premium - Requires License)

The Seasons is a premium serif typeface that needs to be obtained from a licensed source.

#### Obtaining The Seasons Font

1. Purchase a web license for "The Seasons" typeface from an authorized font distributor
2. Supported formats needed:
   - `.woff2` (recommended for best performance and browser support)
   - `.woff` (fallback for older browsers)
   - `.ttf` (optional fallback)

#### Place Font Files

Place The Seasons font files in the `/public/fonts` directory:
```
public/
  fonts/
    the-seasons.woff2
    the-seasons.woff
    the-seasons.ttf (optional)
```

#### Add @font-face Declaration

Add the following to `/styles/globals.css` (after the existing CSS, before the `:root` section):

```css
@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons.woff2') format('woff2'),
       url('/fonts/the-seasons.woff') format('woff');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
```

### 3. Font Configuration

The fonts are configured in:
- **Google Fonts**: Loaded in `/app/layout.tsx` (Roboto)
- **Tailwind Config**: Extended in `/tailwind.config.ts` with custom font families
- **CSS Variables**: Can be defined in `/styles/globals.css` for The Seasons

## Usage

### In Components

```tsx
// Logo and major headings - serif (The Seasons with fallback to Georgia)
<h1 className="font-heading text-4xl">NuClear Supply Chain</h1>

// Body text, subheadings, instructions - sans-serif (Roboto)
<p className="font-sans">Comprehensive nuclear supply chain management platform</p>

// All body text uses Roboto by default (applied to body element)
<div className="text-base">This text uses Roboto automatically</div>
```

### Font Families Available

```typescript
// From tailwind.config.ts
fontFamily: {
  sans: ['Roboto', ...systemFonts],    // Body text, subheadings, instructions
  heading: ['The Seasons', 'Georgia', 'Times New Roman', 'serif']  // Logo, major headings
}
```

### Fallback Fonts

**The Seasons fallback stack:**
```
'The Seasons', Georgia, 'Times New Roman', serif
```

**Roboto fallback stack:**
```
'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif
```

## Typography Guidelines

### When to Use Each Font

**The Seasons (Serif) - `font-heading`:**
- NuClear logo
- Page titles (H1)
- Section headings (H2)
- Major feature headings
- Marketing/branding content

**Roboto (Sans-Serif) - `font-sans` (default):**
- All body text
- Subheadings (H3-H6)
- Navigation menus
- Form labels and inputs
- Instructions and help text
- Regulatory content
- Data tables
- Button labels
- UI components

## Accessibility Considerations

- **Font Size**: Minimum 16px for body text to meet WCAG 2.1 AA standards
- **Line Height**: 1.5 or greater for body text for readability
- **Font Weight**: Regular (400) for body, medium (500-600) for emphasis
- **Contrast**: All text meets WCAG 2.1 AA contrast ratios with NuClear brand colors:
  - Clinical Navy Blue (#153057) on Soft Clinical White (#F7F9FC)
  - Refined Gold (#c69c6d) for accents only (not primary text)

## Performance Optimization

- **Font Display**: Uses `font-display: swap` to prevent invisible text during loading
- **Preload**: Roboto is preloaded via Google Fonts
- **WOFF2**: Primary format provides excellent compression
- **Subsetting**: Consider subsetting The Seasons to include only needed characters

## Troubleshooting

### The Seasons Font Not Loading

1. Verify font files are in `/public/fonts/`
2. Check file names match the `@font-face` declaration exactly
3. Open browser DevTools → Network tab to check for 404 errors
4. Verify MIME types (should be `font/woff2` and `font/woff`)
5. Check that `@font-face` is declared before `:root` in `globals.css`

### Roboto Not Loading

1. Check internet connectivity (Roboto loads from Google Fonts CDN)
2. Verify Google Fonts link in `/app/layout.tsx`
3. Check browser console for CORS or network errors

### Font Rendering Issues

1. Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Test in incognito/private browsing mode
3. Verify `@font-face` syntax in `globals.css`
4. Check font file integrity (re-download if needed)
5. Test in multiple browsers

## License Requirements

### Roboto
- Licensed under Apache License 2.0
- Free for commercial and personal use
- No attribution required

### The Seasons
- Premium font requiring purchase
- Ensure compliance with web license terms
- May require attribution depending on license
- Verify usage restrictions (pageviews, domains, etc.)

## Resources

- [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)
- [The Seasons Font](https://www.myfonts.com/collections/the-seasons-font-latinotype) - Premium serif typeface
- [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator) - For converting font formats
- [MDN @font-face Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
