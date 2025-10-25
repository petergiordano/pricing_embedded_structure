# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Embedded Pricing Calculator** - a React-based interactive tool that helps users determine the most appropriate pricing architecture for their B2B SaaS products. The calculator follows a diagnostic approach based on "Pricing Fundamentals (with AI)", guiding users through problem characteristics to recommend core pricing architectures.

The project is based on a Figma design: https://www.figma.com/design/Y4iCxT9aYkCM62GWXNc5HT/Embedded-Pricing-Calculator

## Development Commands

### Setup
```bash
npm i                    # Install dependencies
```

### Development
```bash
npm run dev             # Start development server (runs on port 3000, auto-opens browser)
```

### Build
```bash
npm run build           # Build for production (outputs to ./build directory)
```

## Tech Stack & Architecture

### Core Technologies
- **React 18** with TypeScript
- **Vite** as the build tool and dev server
- **Tailwind CSS v4** for styling
- **Radix UI** components for accessible, headless UI primitives
- **lucide-react** for icons

### Project Structure

```
src/
├── App.tsx                          # Root component, wraps PricingCalculator
├── main.tsx                         # Entry point
├── index.css                        # Global Tailwind styles and theme config
├── components/
│   ├── PricingCalculator.tsx        # Main calculator logic and UI
│   └── ui/                          # Radix UI component wrappers (shadcn-style)
├── styles/
│   └── globals.css                  # CSS custom properties and theme variables
└── guidelines/
    └── Guidelines.md                # Template for adding custom guidelines
```

### Component Architecture

The application is centered around a single main component: **`PricingCalculator.tsx`**. This component:

1. **Manages state** for user selections (frequency pattern and criticality pattern)
2. **Contains data structures** defining the diagnostic options:
   - `frequencyPatterns`: How often customers experience the problem (Continuous, Burst/Episodic, Project-Oriented)
   - `criticalityPatterns`: How vital the solution is (Mission-Critical, Efficiency, Nice-to-Have)
3. **Implements recommendation logic** via `generateRecommendation()` function that maps user selections to pricing architectures
4. **Renders the UI** using Radix-based components (Card, Button, Badge, etc.)

### Styling System

The project uses **Tailwind CSS v4** with a custom theme defined in `src/styles/globals.css` and `src/index.css`.

**Key styling patterns:**
- CSS custom properties (e.g., `--color-primary`, `--radius`, `--font-weight-medium`) are defined in `globals.css`
- Tailwind theme is configured inline using `@theme` directive
- Typography is handled with base layer styles for h1-h4, p, label, button, input
- **Font:** "Outfit" (imported from Google Fonts)

**Brand Guidelines (per specs/scalevp_branding_guidelines.md):**
The calculator follows Scale Venture Partners branding:

**Color Palette:**
- Dark Green: #224f41, #528577, #7da399, #e5ecea
- Blue: #0d71a9, #3e8dba, #6eaacb, #cfe3ee, #e2eef5
- Gold/Yellow: #e5a819, #efcb75, #faeed1
- Neutrals: #060119 (black), #f6f6f6 (light grey)

**Typography:**
- "Work Sans" (bold only) for headlines and transitions
- "Outfit" for all other text (body, subtext, etc.)
- Use sentence case for all text
- Clean, uncluttered layouts with ample whitespace

## Important Implementation Details

### SaaS-Centric Pricing Logic

Per the specification (`spec.md`), this calculator is designed specifically for **B2B SaaS recurring revenue models**. Key principles:

1. **No "Fixed Fee" recommendations** - the calculator must guide users toward scalable recurring revenue models
2. **Core Pricing Architectures** recommended include:
   - Subscription-driven
   - Usage-driven
   - Outcome-driven Potential
3. **Two-dimensional diagnostic**: Combines Frequency/Continuity with Criticality/Impact to determine the best fit

### Refactoring Guidelines

When modifying `PricingCalculator.tsx`:

1. **Reuse existing React structure** - avoid complete rewrites
2. **Extend Tailwind classes** - don't introduce new CSS files or extensive inline styles
3. **Maintain clear user journey** - the calculator is Layer 1 of a multi-layer diagnostic
4. **Update data structures carefully** - ensure `frequencyPatterns` and `criticalityPatterns` arrays remain properly typed
5. **Keep recommendation logic pure** - `generateRecommendation()` should be a pure function based on inputs

### UI Component Usage

The project uses a **shadcn-style component library** located in `src/components/ui/`. These are pre-built wrappers around Radix UI primitives with Tailwind styling.

Common components used:
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
- `Button` (with variant and size props)
- `Badge` (for displaying tags and recommendations)
- Icons from `lucide-react` (Clock, Zap, Target, Shield, Settings, Heart)

**Do not modify** these UI components unless specifically needed - they are designed to be reusable primitives.

## Key Files Reference

- **`spec.md`**: Comprehensive refactoring specification for the pricing calculator, including data structure definitions, recommendation logic mapping, and UI requirements
- **`src/components/PricingCalculator.tsx`**: Main calculator component (current implementation may need updates per spec.md)
- **`src/styles/globals.css`**: Theme variables and custom properties
- **`vite.config.ts`**: Build configuration with path aliases (use `@/` for imports from `src/`)

## Development Notes

### Path Aliases
The project uses `@/` as an alias for the `src/` directory (configured in vite.config.ts).

Example:
```typescript
import { Button } from '@/components/ui/button';
```

### TypeScript
While there's no `tsconfig.json` in the root, Vite handles TypeScript compilation. The project uses `.tsx` and `.ts` files throughout.

### State Management
Currently uses React's built-in `useState` hook. No external state management library is required for this simple application.
