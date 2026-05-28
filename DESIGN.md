---
name: Aura & Form
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c18'
  on-tertiary-container: '#84847f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e4e2dc'
  tertiary-fixed-dim: '#c8c7c0'
  on-tertiary-fixed: '#1b1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e1'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  button:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style

The design system is engineered for a high-end fashion environment that bridges the gap between traditional luxury and future-facing technology. The brand personality is **composed, visionary, and exclusive**. It avoids the clutter of traditional e-commerce in favor of an editorial, gallery-like experience.

The visual style is **Modern Minimalism with a Tactile Tech edge**. It utilizes expansive white space to let high-resolution photography and 3D assets breathe. To satisfy the "tech-forward" requirement, the system incorporates subtle glassmorphic overlays and precision-engineered micro-interactions that respond to user movement, evoking the feeling of a high-end digital atelier.

## Colors

The palette is rooted in a "monochrome-plus" philosophy. 

- **Primary (#000000):** "Ink Black" used for definitive structural elements, primary actions, and high-contrast typography.
- **Secondary (#775A19):** "Heritage Gold" - A muted, sophisticated metallic used sparingly for highlights, premium membership indicators, and subtle call-to-actions.
- **Tertiary (#000000):** "Stone Grey" - A warm, grounded neutral for secondary text and decorative borders.
- **Neutral (#F9F9F7):** "Vellum" - A soft, off-white base that reduces eye strain compared to pure white and provides a more premium, paper-like quality to the digital canvas.

Backgrounds should primarily use the Neutral shade, while the Primary color is reserved for high-impact headers and interactive components.

## Typography

This design system employs a sophisticated typographic pairing to balance editorial elegance with functional clarity.

- **Headlines:** Uses **Bodoni Moda**. Its high stroke contrast conveys luxury and mimics the mastheads of high-fashion magazines. Use wide tracking for display sizes to enhance the premium feel.
- **Body & UI:** Uses **Hanken Grotesk**. A contemporary sans-serif that ensures legibility in product descriptions and complex UI states. Its geometric yet open forms feel "tech-forward" and approachable.

**Usage Note:** Always use `label-caps` for category tags, breadcrumbs, and small UI metadata to create a distinct visual hierarchy against body text.

## Layout & Spacing

The layout philosophy is based on a **Precision Editorial Grid**. It uses a 12-column system for desktop and a 4-column system for mobile.

- **Spaciousness:** Large vertical gaps (`section-gap`) are used between different product stories or editorial modules to prevent visual overwhelm.
- **Asymmetry:** Occasional intentional breakage of the grid (e.g., an image spanning 7 columns and its description spanning 3) is encouraged to create a modern, curated look.
- **3D Integration:** Product detail pages should treat the 3D viewer as the "hero," often occupying 60-70% of the viewport width on desktop, with UI controls floating in a minimalist sidebar.

## Elevation & Depth

To maintain a "high-end" feel, the system avoids heavy drop shadows. Instead, it uses **Atmospheric Depth**:

- **Surface Layers:** The primary canvas is the Neutral base. Overlays (like carts or 3D control panels) use a "Glassmorphism" effect: a high-blur backdrop filter (20px+) with a semi-transparent white tint (80% opacity).
- **Subtle Shadows:** When elevation is required for interactivity (e.g., a hovered card), use a very large, ultra-soft "Ambient Shadow": `0 20px 40px rgba(0,0,0,0.04)`.
- **Z-Axis Hierarchy:** 3D assets should appear to sit "on" the page, while UI text should feel like it's etched "into" the glass overlays.

## Shapes

The shape language is **Soft-Geometric**. By using a `roundedness: 2` (0.5rem base), the UI feels modern and organic without appearing "bubbly" or juvenile.

- **Cards & Containers:** Follow the 0.5rem (8px) standard.
- **Buttons:** Maintain the 8px radius for a structured, professional look.
- **Images:** Photography should always have the same corner radius as containers to ensure a cohesive visual rhythm.
- **Interactive Elements:** Active states (like selected size chips) should transition from the standard radius to a slightly more pronounced roundness to signal selection.

## Components

- **Buttons:** Primary buttons are solid Ink Black with White text. Secondary buttons are outlined in 1px Stone Grey. All buttons feature a 300ms transition on hover, shifting the background to Heritage Gold for a premium touch.
- **Input Fields:** Minimalist "Underline" style or very light Stone Grey borders. Focus states should be indicated by a weight increase in the bottom border rather than a change in color.
- **Chips (Sizes/Colors):** Small, outlined rectangles with `label-caps` typography. The "Selected" state is a solid Primary color fill.
- **Cards:** Product cards should be "borderless." Use whitespace and typography to define the card boundaries. On hover, the image should slightly scale (1.02x) within its container.
- **3D Viewer Controls:** Floating transparent glass icons with thin 1px outlines. These should be placed at the bottom center or bottom right of the 3D viewport.
- **Lists:** Clean, high-contrast rows with ample vertical padding (24px+). Use the Heritage Gold color for price points or "New Arrival" indicators.
