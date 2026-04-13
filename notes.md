# 🎨 Magic Wand Reveal - CSS Study Guide
> **Mission:** Master the styling of the Magic Wand effect. This guide breaks down the *entire* stylesheet into three logical sections: the Reset, the Tiles, and the Magic Wand.

---

## 🏗️ Section 1: Reset & Canvas Setup
Before we build, we clean. This section removes browser defaults and sets up our dark, centered stage.

### The Reset and Body Layout
```css
/* Main container setup: dark background and centered content */
body {  
  background: rgb(2, 6, 23); /* A deep, elegant dark navy */
  height: 100vh;             /* Cover the entire window height */
  overflow: hidden;          /* Prevent scrollbars for an app-like feel */
  display: grid;             /* Modern grid layout */
  place-items: center;       /* Perfectly centers everything inside body */
}

/* Global reset for consistent sizing */
* {
  margin: 0;                /* Remove default browser margins */
  padding: 0;               /* Remove default browser padding */
  box-sizing: border-box;   /* Ensure padding/border don't increase width */
}
```

> [!TIP]
> **Pro Tip:** Always use `box-sizing: border-box`. It makes "math" easier because `width: 100%` will actually mean 100%, even if you add padding or borders.

---

## 🧩 Section 2: The Interactive Tiles
This is the grid where the images are "hidden." We use rotation and overlapping to make it look like a scattered pile of cards.

### The Tile Container & Individual Cards
```css
/* Flex container for the revealable image tiles */
#tiles {
  display: flex;
}

/* Individual tiles: The container for icons and hidden images */
.tile {
  display: grid;
  place-items: center;
  width: 38vmin;
  aspect-ratio: 1;             /* Force a perfect square */
  background-color: rgb(31, 41, 55);
  border-radius: 6vmin;        /* Large rounded corners for a modern feel */
  box-shadow: 0vmin 3vmin 6vmin rgb(0 0 0 / 25%),
    inset 0vmin 0.5vmin 1vmin rgb(255 255 255 / 15%); /* Internal glass reflection */
  position: relative;
  overflow: hidden;            /* Hide the image until it is revealed */
}
```

### Random Rotation & Overlapping
```css
/* Slight rotational offsets to give a playful, scattered look */
.tile:nth-child(1) { rotate: 3deg; z-index: 3; }
.tile:nth-child(2) { rotate: -2deg; z-index: 2; }
.tile:nth-child(3) { rotate: 5deg; z-index: 1; }

/* Negative margin to create an overlapping effect between tiles */
.tile:is(:nth-child(2), :nth-child(3)) {
  margin-left: -10vmin; /* Pulls the second and third tiles "under" the first */
}
```

### Icon & Reveal Image
```css
/* Placeholder icon styling (visible by default) */
.tile > i {
  font-size: 15vmin;
  color: rgb(255 255 255 / 10%); /* Very faint color */
}

/* The Image: The core revelation logic */
.tile > img {
  height: 100%;
  aspect-ratio: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
  opacity: var(--opacity);          /* Driven by JavaScript */
  filter: blur(calc(var(--blur) * 10px)); /* Blurs/Unblurs via JS variables */
}
```

---

## 🪄 Section 3: The Magic Wand & Cap
The wand is the interactive tool. Its design relies on high-quality gradients to look like a metallic, rounded cylinder.

### The Wand Body
```css
#wand {
  width: 10vmin;
  aspect-ratio: 1 / 10;
  /* Complex Gradient for 3D metallic feel */
  background: linear-gradient(
    to right, 
    rgb(26 24 28) 10%,      /* Shadow side */
    rgb(42 40 44) 45% 55%,  /* Highlighted center */
    rgb(26 24 28) 90%       /* Shadow side */
  );
  position: absolute;
  left: 5%;
  top: 20%;
  translate: -50%;
  rotate: -3deg;
  z-index: 100;              /* Always stays on top of tiles */
  border-radius: 3vmin;
  box-shadow: 0vmin 1vmin 4vmin rgb(0 0 0 / 80%);
  overflow: hidden;
}
```

### The Wand "Cap" (Tip)
```css
/* The shiny metallic tip of the wand */
#wand > .cap {
  height: 20%;
  width: 100%;
  background: linear-gradient(
    to right, 
    rgb(212 221 236) 10%, 
    rgb(255 255 255) 45% 55%, 
    rgb(212 221 236) 90%
  );
}
```

---
> [!NOTE]  
> This guide covers 100% of the `style.css` code. Follow the order above to understand the journey from a blank screen to a magical interaction!
