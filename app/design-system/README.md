# Design System Architecture

## Overview

The design system uses a 4-layer token architecture that separates raw values from semantic meaning and component-specific usage. This keeps the system maintainable and allows for easy theming and updates.

## Token Layers

### Layer 1: Base Colors (`tokens/colors.css`)

Raw color definitions in OKLCH color space. These are the source of truth for all colors.

```css
@theme {
  --color-slate-500: oklch(0.769 0.01 248.03);
  --color-teal-500: oklch(0.704 0.12 182.5);
  --color-primary-500: var(--color-blue-gray-500);
}
```

**Why OKLCH?** Better color manipulation, perceptual uniformity, and easier to generate accessible color scales.

### Layer 2: Foundation Tokens (`tokens/colors.css`)

Maps base colors to semantic roles. Still in `@theme` because Tailwind uses these to generate utilities.

```css
@theme {
  --color-primary-500: var(--color-blue-gray-500);
  --color-accent-500: var(--color-teal-500);
  --color-secondary-500: var(--color-slate-500);
}
```

### Layer 3: Semantic Tokens (`tokens/semantic.css`)

Purpose-driven tokens that describe what colors are used for, not what they are. These are in `:root` because they reference other tokens and shouldn't generate Tailwind utilities.

```css
:root {
  --color-text-primary: var(--color-secondary-950);
  --color-text-interactive-accent: var(--color-accent-500);
  --color-bg-primary: var(--color-white);
  --color-border: var(--color-secondary-300);
}
```

**Why separate?** If you need to change what "primary text" means, you change one token and it updates everywhere.

### Layer 4: Component Tokens (`tokens/component-tokens.css`)

Component-specific mappings. These are in `:root` and map semantic tokens to specific components.

```css
:root {
  --button-primary-bg: var(--color-bg-interactive-primary);
  --button-primary-text: var(--color-text-inverse);
  --card-bg: var(--color-surface);
  --input-border: var(--color-border);
}
```

**Why component tokens?** Allows component-specific overrides without touching semantic tokens. For example, a button might need a slightly different shade than the general interactive color.

## File Structure

```
design-system/
├── tokens/
│   ├── colors.css           # Layers 1 & 2 (base + foundation)
│   ├── semantic.css         # Layer 3 (semantic tokens)
│   ├── component-tokens.css # Layer 4 (component tokens)
│   ├── typography.css        # Font system
│   ├── visual.css           # Shadows, radius, transitions
│   └── spacing.css          # Custom spacing (not used by Tailwind)
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   ├── badges.css
│   ├── layout.css
│   └── utilities.css
└── index.css                # Imports everything
```

## @theme vs :root

**@theme** - Base design tokens that Tailwind uses to generate utilities. These should be raw values or simple references.

- `colors.css` - Base color palettes
- `typography.css` - Font families, sizes, weights
- `visual.css` - Shadows, radius, transitions

**:root** - Derived tokens that reference other tokens. These don't generate Tailwind utilities.

- `semantic.css` - References foundation tokens
- `component-tokens.css` - References semantic tokens
- `spacing.css` - Custom spacing (kept in :root to avoid overriding Tailwind's max-width scale)

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

Use component tokens or semantic tokens, never base colors directly:

```css
/* Good */
.btn-primary {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
}

/* Also good */
.card {
  background-color: var(--card-bg);
  border-color: var(--card-border);
}

/* Bad - don't use base colors */
.btn-primary {
  background-color: var(--color-primary-700);
}
```

### In React Components

Use design system classes when available:

```tsx
// Good
<button className="btn btn-primary">Click me</button>

// Also good - using semantic tokens via Tailwind
<div className="bg-surface border-border">Content</div>

// Bad - direct Tailwind color classes
<button className="bg-primary-700 text-white">Click me</button>
```

### When to Create New Tokens

1. **New base color?** Add to `colors.css` Layer 1
2. **New semantic meaning?** Add to `semantic.css` Layer 3
3. **Component-specific need?** Add to `component-tokens.css` Layer 4

Avoid creating tokens for one-off use cases. Use CSS custom properties directly in that component's CSS file instead.

## Dark Mode

Dark mode overrides are defined in `semantic.css`:

```css
.dark {
  --color-text-primary: var(--color-secondary-100);
  --color-bg-primary: var(--color-secondary-950);
  /* ... */
}
```

Components automatically adapt because they reference semantic tokens, not base colors.

## Common Patterns

### Adding a New Color

1. Add base color to `colors.css` Layer 1
2. Add foundation token to `colors.css` Layer 2 (if needed)
3. Add semantic token to `semantic.css` Layer 3
4. Add component token to `component-tokens.css` Layer 4 (if component-specific)

### Adding a New Component Style

1. Add component tokens to `component-tokens.css`
2. Create component class in appropriate `components/*.css` file
3. Use component tokens in the class definition

### Modifying Existing Styles

1. Change semantic token in `semantic.css` to affect all components using it
2. Change component token in `component-tokens.css` to affect only that component
3. Change base color in `colors.css` to affect everything downstream

## Notes

- Spacing tokens in `spacing.css` are currently unused but kept for future use
- All tokens use CSS custom properties for runtime theming capability
- The system is designed to be extended, not replaced
