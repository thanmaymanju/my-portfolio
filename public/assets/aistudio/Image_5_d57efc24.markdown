---
name: Editorial Engineering Portfolio
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#58413f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8b716e'
  outline-variant: '#dfbfbc'
  surface-tint: '#a9352f'
  primary: '#570004'
  on-primary: '#ffffff'
  primary-container: '#7a1212'
  on-primary-container: '#ff8378'
  inverse-primary: '#ffb4ab'
  secondary: '#9b433c'
  on-secondary: '#ffffff'
  secondary-container: '#fd8f85'
  on-secondary-container: '#752722'
  tertiary: '#262727'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c3d3d'
  on-tertiary-container: '#a8a7a7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#881d1b'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ac'
  on-secondary-fixed: '#400103'
  on-secondary-fixed-variant: '#7c2c26'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.12em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system merges high-end editorial curation with technical software engineering precision. Built for seasoned engineers targeting elite roles, founders, and selective engineering leadership, the interface presents code architecture, case studies, and career metrics with gallery-grade discipline. 

The aesthetic is Minimalist Editorial: crisp negative space, razor-thin structured dividers, deep burgundy accents, and assertive geometric headlines balanced by approachable humanist body text. Rather than treating technical work as raw terminal output, the system elevates code, system designs, and impact metrics to executive-level artifacts.

Recruiters and hiring managers encounter zero ambiguity: information hierarchy prioritizes rapid scannability, quantifiable outcomes, stack clarity, and immediate access to code artifacts and live demonstrations.

## Colors

The palette establishes an editorial canvas using strict tonal hierarchy:

- **Primary (`#7A1212`)**: Signature burgundy used selectively for key calls to action, high-priority interactive states, and headline accent marks.
- **Secondary (`#4D0808`)**: Deep vintage burgundy applied to active interaction states, prominent badge backgrounds in dark contexts, and emphasized typographic accents.
- **Neutral Surface & Canvas**: Base canvas alternates between pure white (`#FFFFFF`) and warm editorial off-white (`#FAFAFA`) to delineate case study sections and architectural breakdowns.
- **Neutral Text (`#171717`)**: Dense charcoal black for maximum contrast and high-legibility body reading.
- **Muted Supporting Tone (`#737373`)**: Secondary grey reserved for metadata, timestamps, architecture diagrams labels, and secondary links.
- **Structural Borders (`#E5E5E5`)**: Hairline dividers defining data cells, project cards, and structural grid rules.

Color is deployed with restraint: burgundy is never splashed arbitrarily across surfaces, but acts as a purposeful signal of importance and interactive intent.

## Typography

The typographic hierarchy pairs the structured geometry of **Outfit** for editorial titles and section anchors with the organic legibility of **Plus Jakarta Sans** for comprehensive technical documentation and case study narratives.

- **Display & Headings (Outfit)**: Used for major role summaries, case study titles, and key metrics. Headings utilize subtle negative letter-spacing for large sizes, tightening visual density.
- **Section Eyebrows (`label-caps`)**: Rendered in uppercase Outfit with wide letter tracking (`0.12em`) to function as precise editorial markers (e.g., `SYSTEM ARCHITECTURE`, `CORE COMPETENCY`, `IMPACT`).
- **Body & Captions (Plus Jakarta Sans)**: Ensures relaxed reading cadence over complex multi-paragraph technical deep-dives. Line heights are generously spaced to reduce visual fatigue.
- **Monospace Accents**: Inline code, API contracts, and architecture terminal blocks integrate a crisp monospaced font with exact 20px line heights to preserve vertical rhythm.

## Layout & Spacing

The layout model employs a 12-column responsive fluid grid anchored by a maximum desktop container width of 1280px. 

- **Desktop (1024px+)**: 12 columns with `1.5rem` gutters and generous `3rem` section margins. Editorial showcases lean on deliberate asymmetry—such as a 4-column sticky index column alongside an 8-column project breakdown.
- **Tablet (768px - 1023px)**: 8 columns with `1.5rem` gutters and `2rem` margins. Complex side-by-side architecture tables collapse into linear stacked sections.
- **Mobile (<768px)**: 4 columns with `1rem` gutters and `1.25rem` margins. Metrics and badges wrap fluidly, maintaining minimum 44px tap targets.

Component padding adheres strictly to the vertical spacing rhythm: tight internal element relationships utilize `space-xs` and `space-sm`, standard cards utilize `space-md` to `space-lg`, and major thematic editorial shifts demand `space-2xl` to allow readers to digest technical complexity.

## Elevation & Depth

Visual hierarchy eschews heavy skeuomorphism and excessive blur in favor of structured surface layering, tactile ghost borders, and calibrated ambient shadows.

- **Surface Tiers**: Base canvas sits at `#FFFFFF`. Inset containers, data tables, and secondary contextual zones transition to `#FAFAFA`. Interactive dark architecture modules employ a rich `#171717` background with `#4D0808` low-opacity ambient glows.
- **Hairline Borders**: Structural boundaries rely on 1px borders in `#E5E5E5` rather than dropped shadows. This produces an architectural, blueprint-like fidelity.
- **Ambient Shadow Lift**: Interactive floating elements (such as modal case study previews or pinned recruiter quick-actions) utilize a subtle, diffused multi-stop shadow:
  - `0 1px 3px rgba(23, 23, 23, 0.04), 0 8px 24px rgba(122, 18, 18, 0.06)`
- **Depth Transitions**: On hover, interactive cards elevate through a slight border color shift (`#E5E5E5` to `#7A1212`) and a fine 2px y-axis offset rather than high-contrast shadow fills.

## Shapes

The design system standardizes on **Rounded (Level 2)** for core structural geometry, combining balanced structural corners with specialized pill elements for scannable metadata:

- **Core Containers, Panels, and Inputs**: Styled with a disciplined `0.5rem` (`rounded-md`) border radius, preserving the structural, engineer-grade alignment of tables and code blocks.
- **Large Cards & Modals**: Implement `1rem` (`rounded-lg`) to soften expansive surfaces without feeling playful or ungrounded.
- **Badges, Tags, and Pill Elements**: Tech stack chips, availability indicators, and recruiter quick-filters take a fully rounded pill style (`9999px`), creating an organic visual contrast against rectilinear case study grids.

## Components

### Buttons
- **Primary**: Solid burgundy (`#7A1212`) fill with pure white typography, `0.5rem` corner radius, `space-sm` vertical and `space-lg` horizontal padding. On hover, background shifts to `#4D0808` with a 150ms smooth transition.
- **Secondary / Ghost**: Hairline border (`1px solid #E5E5E5`) on transparent canvas, charcoal typography (`#171717`). On hover, border transitions to `#7A1212` with text shifting to `#7A1212`.
- **Recruiter Quick-Action**: Floating pill-shaped variant (`9999px`) featuring a subtle live beacon dot indicating availability for hire.

### Chips & Badges
- **Tech Stack Badges**: Pill-shaped (`9999px`), rendered with `#FAFAFA` background, `#E5E5E5` border, and `#171717` text (`label-md`).
- **Status / Metric Badges**: Deep burgundy tint background (`rgba(122, 18, 18, 0.08)`) with `#7A1212` text and bold caps tracking.

### Cards & Project Showcases
- **Engineering Case Study Card**: Dual-layered construction. Top half showcases clean technical diagramming or interactive preview; bottom half contains title (`headline-md`), summary paragraph (`body-sm`), quantifiable metrics (e.g., "-42% Latency"), and associated tech pills. Divided internally by a 1px `#E5E5E5` hairline separator.
- **Architecture Terminal Block**: Inverted `#171717` card housing schema definitions and code samples, bordered in subtle dark tone with syntax highlighting mapped to subtle burgundy, ochre, and muted grey.

### Input Fields & Controls
- **Inputs**: Solid `#FAFAFA` background, 1px `#E5E5E5` border, `0.5rem` border radius, padding `space-sm` `space-md`. Focus state features a crisp 1px ring in `#7A1212` with zero blurry outline.
- **Checkboxes & Radios**: Minimal 16px geometric boxes with `#7A1212` fill when selected, maintaining structural precision.

### Lists & Timelines
- **Experience Timeline**: Vertical rule in `#E5E5E5` punctuated by `0.5rem` solid burgundy node indicators. Role titles utilize `headline-sm`, supported by secondary grey company metadata and bullet points formatted with generous vertical breathing room (`space-sm`).