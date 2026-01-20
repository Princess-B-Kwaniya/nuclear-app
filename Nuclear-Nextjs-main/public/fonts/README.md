# Font Files Directory

Place "The Seasons" font files here for the NuClear brand typography.

## Required Files

1. **the-seasons.woff2** (Recommended - Best compression and browser support)
2. **the-seasons.woff** (Fallback for older browsers)
3. **the-seasons.ttf** (Optional - Additional fallback)

## Font Information

- **Font Name**: The Seasons
- **Type**: Serif
- **Format**: Web fonts (WOFF2, WOFF)
- **Usage**: NuClear logo and major headings throughout the application

## NuClear Typography System

### Primary Typeface - The Seasons (Serif)
Used for the NuClear logo and major headings to express authority, credibility, and a refined scientific presence.

### Secondary Typeface - Roboto (Sans-Serif)
Used for subheadings, body text, instructions, and regulatory content to ensure clarity, readability, and pharmaceutical compliance. Roboto is loaded via Google Fonts and does not require local files.

## Installation

1. Obtain licensed copies of The Seasons font files from an authorized distributor
2. Place the font files in this directory
3. Ensure file names match exactly:
   - `the-seasons.woff2`
   - `the-seasons.woff`
4. Add the `@font-face` declaration to `/styles/globals.css`:

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

## Licensing

Ensure you have the appropriate web license for The Seasons font. This is a premium typeface that requires purchase.

## Alternative

If The Seasons font is not available, the application will gracefully fall back to:
- Georgia
- Times New Roman
- System serif font

These fallback fonts are configured in `/tailwind.config.ts` under the `font-heading` family.

## Testing

After adding the font files:
1. Run `npm run build` to verify no errors
2. Check the browser console for any 404 errors related to font files
3. Inspect heading elements to confirm the font is applied
4. Test the logo and major headings to see The Seasons in use

## References

See `/FONT_INSTALLATION_GUIDE.md` for detailed installation and configuration instructions.
