# Back to Top Web Component

A lightweight, responsive, customizable back-to-top button web component.



![back-to-top gif](/assets/b2t.gif)

## Features

- **Fully Customizable** - Colors, position, size, and styling
- **Dark/Light Theme Support** - Automatic or manual theme switching  
- **Responsive Design** - Works seamlessly on mobile and tablet screens
- **Accessible** - ARIA labels, keyboard support, focus management
- **Glassmorphism Design** - Modern backdrop blur effects
- **No Dependencies** - Uses Unicode arrow, no external fonts needed
- **Custom Events** - Listen to show/hide/click events
- **Smart Hover Colors** - Automatically calculated from button colors

## Installation

### Via npm

```bash
npm install @devmansam/back-to-top
```

Then import in your JavaScript:

```javascript
import '@devmansam/back-to-top';
```

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/DevManSam777/back-to-top@main/back-to-top.js"></script>
```

## Usage

Add to your HTML

```html
<!-- Basic usage -->
<back-to-top></back-to-top>

<!-- Custom styling -->
<back-to-top 
  position="right"
  primary-color="#ffffff"
  background-color="rgba(255, 255, 255, 0.15)"
></back-to-top>
```

## Attributes

### Position & Layout
| Attribute | Default | Description |
|-----------|---------|-------------|
| `position` | `"left"` | Button position: `"left"` or `"right"` |
| `size` | `"3.5rem"` | Button size (width and height) |
| `bottom-offset` | `"2.5rem"` | Distance from bottom of screen |
| `side-offset` | `"2rem"` | Distance from left/right edge |
| `border-radius` | `"50%"` | Button border radius |

### Colors & Styling
| Attribute | Default | Description |
|-----------|---------|-------------|
| `primary-color` | `"#2563eb"` | Arrow color |
| `background-color` | `"rgba(37, 99, 235, 0.1)"` | Button background |
| `border-color` | `"rgba(37, 99, 235, 0.2)"` | Button border color |
| `box-shadow` | `"0 4px 20px rgba(37, 99, 235, 0.15)"` | Button shadow |
| `backdrop-blur` | `"10px"` | Glassmorphism blur amount |

### Dark Theme Colors
| Attribute | Default | Description |
|-----------|---------|-------------|
| `dark-primary-color` | `"#3b82f6"` | Dark theme arrow color |
| `dark-background-color` | `"rgba(59, 130, 246, 0.1)"` | Dark theme background |
| `dark-border-color` | `"rgba(59, 130, 246, 0.2)"` | Dark theme border |
| `dark-box-shadow` | `"0 4px 20px rgba(59, 130, 246, 0.15)"` | Dark theme shadow |

### Behavior
| Attribute | Default | Description |
|-----------|---------|-------------|
| `show-after` | `"300"` | Scroll pixels before showing button |
| `scroll-behavior` | `"smooth"` | Scroll behavior: `"smooth"` or `"auto"` |
| `animation-duration` | `"0.3s"` | CSS transition duration |
| `hover-lift` | `"2px"` | How much button lifts on hover |
| `theme` | `"auto"` | Theme: `"light"`, `"dark"`, or `"auto"` |

### Accessibility
| Attribute | Default | Description |
|-----------|---------|-------------|
| `aria-label` | `"Back to top"` | Accessibility label |
| `keyboard-support` | `"true"` | Enable keyboard navigation (Home key) |

## Examples

### Basic Usage
```html
<back-to-top></back-to-top>
```

### For Black Backgrounds
```html
<back-to-top 
  primary-color="#ffffff"
  background-color="rgba(255, 255, 255, 0.15)"
  border-color="rgba(255, 255, 255, 0.3)"
  box-shadow="0 4px 20px rgba(0, 0, 0, 0.3)"
></back-to-top>
```

### Right-Aligned Custom Colors
```html
<back-to-top 
  position="right"
  primary-color="#10b981"
  background-color="rgba(16, 185, 129, 0.15)"
  border-color="rgba(16, 185, 129, 0.3)"
></back-to-top>
```

### Square Button
```html
<back-to-top 
  border-radius="8px"
  size="3rem"
></back-to-top>
```

### Show Earlier with Faster Animation
```html
<back-to-top 
  show-after="100"
  animation-duration="0.2s"
  hover-lift="4px"
></back-to-top>
```

### Dark Theme Only
```html
<back-to-top 
  theme="dark"
  primary-color="#f3f4f6"
></back-to-top>
```

## Events

Listen for component events:

```javascript
const backToTop = document.querySelector('back-to-top');

// When button becomes visible
backToTop.addEventListener('back-to-top-shown', (e) => {
  console.log('Button shown at scroll position:', e.detail.scrollPosition);
});

// When button becomes hidden  
backToTop.addEventListener('back-to-top-hidden', (e) => {
  console.log('Button hidden at scroll position:', e.detail.scrollPosition);
});

// When button is clicked
backToTop.addEventListener('back-to-top-clicked', (e) => {
  console.log('Button clicked from position:', e.detail.previousScrollPosition);
});
```

## Keyboard Support

When enabled (default):
- Press `Home` key to scroll to top
- Press `Ctrl/Cmd + Home` to scroll to top  
- Use `Tab` to focus the button and `Enter/Space` to activate

## Theme Detection

Automatically detects system theme:

```html
<!-- Auto-detect (default) -->
<back-to-top theme="auto"></back-to-top>

<!-- Force specific theme -->
<back-to-top theme="dark"></back-to-top>
<back-to-top theme="light"></back-to-top>
```

## Styling Integration

```html
<!-- Using CSS variables -->
<back-to-top 
  primary-color="var(--primary-color)"
  background-color="var(--button-bg)"
></back-to-top>

<!-- Custom brand colors -->
<back-to-top 
  primary-color="#ef4444"
  background-color="rgba(239, 68, 68, 0.15)"
  border-color="rgba(239, 68, 68, 0.3)"
></back-to-top>
```

## Browser Support

- Chrome 54+
- Firefox 63+  
- Safari 10.1+
- Edge 79+

## Performance

- **Size:** ~5KB minified
- **Dependencies:** None
- **Memory:** Minimal with proper cleanup
- **Scroll Performance:** Passive event listeners


[License](license)
---

&copy; 2025 DevManSam