# Design System Architecture

## Overview

The design system uses a simplified 2-layer token architecture that provides scalability while avoiding over-abstraction. The system leverages Tailwind's color primitives and maps them through foundation tokens to semantic tokens.

## Token Layers

### Layer 1: Foundation Tokens (`tokens/colors.css`)

Maps Tailwind's color primitives to brand identity tokens. These are the "rebrand" layer - change these to rebrand the entire system.

```css
@theme {
  /* Primary: Main brand colors */
  --color-primary-500: var(--color-blue-500);
  --color-primary-700: var(--color-blue-700);
  /* etc. */

  /* Base: Neutral grays */
  --color-base-500: var(--color-slate-500);
  --color-base-950: var(--color-slate-950);
  /* etc. */
}
```

**Why?** If you want to switch from blue to teal as your primary color, you only change `--color-blue-*` to `--color-teal-*` in the foundation tokens. Everything downstream updates automatically.

### Layer 2: Semantic Tokens (`tokens/colors.css`)

Purpose-driven tokens that describe what colors are used for. These reference the foundation tokens above for scalability.

```css
@theme {
  /* Text colors */
  --text-default: var(--color-base-950);
  --text-primary: var(--color-primary-700);
  --text-muted: var(--color-base-500);

  /* Background colors */
  --bg-page: var(--color-white);
  --bg-primary: var(--color-primary-700);
  --bg-surface: var(--color-white);

  /* Border colors */
  --border-default: var(--color-base-300);
  --border-primary: var(--color-primary-700);
}
```

**Why semantic tokens?** Components use `--text-default` instead of `--color-base-950`. This provides meaning and makes it easy to understand the intent.

**Why reference primary/base?** This makes the system scalable. If you change `--color-primary-700` to a different shade, all semantic tokens using it update automatically.

## File Structure

```
design-system/
├── tokens/
│   ├── colors.css           # Foundation + Semantic color tokens
│   ├── typography.css        # Font system
│   └── visual.css           # Shadows, radius, transitions
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   ├── layout.css
│   └── utilities.css
└── index.css                # Imports everything
```

## @theme vs :root

**@theme** - Base design tokens that Tailwind uses to generate utilities.

- `colors.css` - Foundation tokens (primary, base) and semantic tokens
- `typography.css` - Font families, sizes, weights
- `visual.css` - Shadows, radius, transitions

All tokens are in `@theme` so they're available to Tailwind for utility class generation (e.g., `bg-primary`, `text-default`).

## Import Order

The import order in `globals.css` matters:

```css
/* 1. Design system tokens (including @theme blocks) */
@import "./design-system/index.css";

/* 2. Tailwind CSS (processes @theme tokens) */
@import "tailwindcss";
```

Tailwind needs `@theme` tokens to be available when it processes, so the design system must be imported first.

## Usage

### In CSS Components

Use semantic tokens that reference foundation tokens:

```css
/* Good - using semantic tokens */
.btn-primary {
  background-color: var(--bg-primary);
  color: var(--text-inverse);
}

/* Also good - using other semantic tokens */
.card {
  background-color: var(--bg-surface);
  border-color: var(--border-default);
}

/* Avoid - don't use foundation tokens directly */
.btn-primary {
  background-color: var(--color-primary-700);
}

/* Never - don't use Tailwind primitives directly */
.btn-primary {
  background-color: var(--color-blue-700);
}
```

### In React Components

Use Tailwind utility classes that map to semantic tokens:

```tsx
// Good - using Tailwind utilities
<button className="bg-primary text-inverse">Click me</button>

// Also good - using semantic token utilities
<div className="bg-surface border-default">Content</div>

// Avoid - direct color classes
<button className="bg-blue-700 text-white">Click me</button>
```

### When to Create New Tokens

1. **New brand color?** Add to foundation tokens (Layer 1) in `colors.css`
2. **New semantic meaning?** Add semantic token (Layer 2) that references foundation tokens
3. **Component-specific styling?** Use existing semantic tokens or add new ones if needed

## Dark Mode

Dark mode overrides are defined at the semantic token level:

```css
.dark {
  --text-default: var(--color-base-100);
  --bg-page: var(--color-base-950);
  --bg-primary: var(--color-primary-300);
  /* ... */
}
```

Components automatically adapt because they reference semantic tokens, not foundation or primitive colors.

## Common Patterns

### Rebranding

To change the primary brand color:

1. Update foundation tokens in `colors.css`:
   ```css
   --color-primary-500: var(--color-teal-500); /* was blue-500 */
   ```
2. All semantic tokens and components update automatically

### Adding a New Semantic Token

```css
@theme {
  /* Add new semantic token that references foundation */
  --text-link: var(--color-primary-600);
  --text-link-hover: var(--color-primary-700);
}

/* Add dark mode override */
.dark {
  --text-link: var(--color-primary-400);
  --text-link-hover: var(--color-primary-300);
}
```

### Component Styling

Always use semantic tokens in components:

```css
.card-special {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-default);
  color: var(--text-default);
}

.card-special:hover {
  background-color: var(--bg-surface-hover);
  border-color: var(--border-strong);
}
```

## Benefits of This System

1. **Scalable**: Change foundation tokens to rebrand the entire system
2. **Semantic**: Token names describe purpose, not appearance
3. **Simple**: Only 2 layers instead of 4
4. **Type-safe**: Tailwind generates utilities from all tokens
5. **Dark mode friendly**: Override semantic tokens for themes
6. **Maintainable**: Clear hierarchy and purpose for each token

## Migration from Old System

The old 4-layer system has been simplified:

- **Old Layer 1 (Base colors)**: Now Tailwind primitives (blue, slate, etc.)
- **Old Layer 2 (Foundation)**: Now Layer 1 (primary, base mapping)
- **Old Layer 3 (Semantic)**: Now Layer 2 (text-default, bg-surface, etc.)
- **Old Layer 4 (Component tokens)**: Removed - components use semantic tokens directly

This reduces `var(--button-primary-bg)` → `var(--color-bg-interactive-primary)` → `var(--color-primary-700)` → `var(--color-blue-700)`

To just: `var(--bg-primary)` → `var(--color-primary-700)` → `var(--color-blue-700)`
