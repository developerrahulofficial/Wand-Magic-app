# 🪄 Magic Wand Reveal: The Complete CSS Masterclass
> **Mission:** This document provides a verbatim copy of the project's styling logic. Every line of `style.css` is included here, explained property-by-property for a deep understanding of modern UI development.

---

## 🏗️ Phase 1: Reset & Stage Setup (Lines 1-15)
This section prepares the browser environment and centers our interactive application.

```css
/* Main container setup: dark background and centered content */
body {  
  background: rgb(2, 6, 23);
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
}

/* Global reset for consistent sizing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 🧠 In-Depth Breakdown:
*   **`background: rgb(2, 6, 23)`**: A curated dark navy that provides a more premium feel than pure black.
*   **`height: 100vh` & `overflow: hidden`**: Forces the application to fill the screen exactly and disables scrolling, creating a "locked" full-screen experience.
*   **`display: grid` & `place-items: center`**: The most modern way to center content perfectly in two lines.
*   **`box-sizing: border-box`**: Ensures that `width` includes padding and borders, preventing layout breaking.

---

## 🧩 Phase 2: The Interactive Tiles (Lines 53-100)
These blocks define the grid of image cards and their overlapping, scattered appearance.

```css
/* Flex container for the revealable image tiles */
#tiles {
  display: flex;
}

/* 
  Individual tiles:
  Initially shows a placeholder icon. Images are overlaid and revealed via JS.
*/
.tile {
  display: grid;
  place-items: center;
  width: 38vmin;
  aspect-ratio: 1;
  background-color: rgb(31, 41, 55);
  border-radius: 6vmin;
  box-shadow: 0vmin 3vmin 6vmin rgb(0 0 0 / 25%),
    inset 0vmin 0.5vmin 1vmin rgb(255 255 255 / 15%);
  position: relative;
  overflow: hidden;
}

/* Slight rotational offsets to give a more playful, scattered look */
.tile:nth-child(1) {
  rotate: 3deg;
  z-index: 3;
}

.tile:nth-child(2) {
  rotate: -2deg;
  z-index: 2;
}

.tile:nth-child(3) {
  rotate: 5deg;
  z-index: 1;
}

/* Negative margin to create an overlapping effect between tiles */
.tile:is(:nth-child(2), :nth-child(3)) {
  margin-left: -10vmin;
}

/* Placeholder icon styling */
.tile > i {
  font-size: 15vmin;
  color: rgb(255 255 255 / 10%);
}
```

### 🧠 In-Depth Breakdown:
*   **`width: 38vmin`**: Responsive sizing that uses 38% of the viewport's *smallest* dimension.
*   **`aspect-ratio: 1`**: Guarantees perfect squares without needing to define height.
*   **`margin-left: -10vmin`**: The "Stacking Trick" that pulls cards horizontally to overlap them.
*   **`rotate` & `z-index`**: Gives each specific card a unique tilt and defines its layer priority.
*   **`inset` Shadow**: Adds a thin "inner glow" to the edge of the tile to simulate glass thickness.

---

## 🪄 Phase 3: The Magic Wand & Cap (Lines 17-51)
The wand is the cursor follower. It uses complex lighting gradients to appear 3D.

```css
/* 
  Magic Wand design:
  A vertical bar with a gradient to simulate a 3D cylindrical shape.
*/
#wand {
  width: 10vmin;
  aspect-ratio: 1 / 10;
  background: linear-gradient(
    to right, 
    rgb(26 24 28) 10%, 
    rgb(42 40 44) 45% 55%, 
    rgb(26 24 28) 90%
  );
  position: absolute;
  left: 5%;
  top: 20%;
  translate: -50%;
  rotate: -3deg;
  z-index: 100;
  border-radius: 3vmin;
  box-shadow: 0vmin 1vmin 4vmin rgb(0 0 0 / 80%);
  overflow: hidden;
}

/* The tip of the wand with a lighter metallic gradient */
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

### 🧠 In-Depth Breakdown:
*   **`linear-gradient`**: We use a 3-color stop (Dark-Light-Dark) to create a specular highlight, tricking the eye into seeing a rounded 3D surface.
*   **`translate: -50%`**: Centering logic so the wand aligns perfectly with the cursor coordinates.
*   **`z-index: 100`**: High priority to ensure the wand always hovers *over* the interactive tiles.

---

## 🌫️ Phase 4: Revelation Logic (Lines 102-116)
The bridge between our design and JavaScript interactivity.

```css
/* 
  Revealable image:
  Uses custom properties --opacity and --blur (updated by script.js) 
  to create the "reveal" effect.
*/
.tile > img {
  height: 100%;
  aspect-ratio: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
  opacity: var(--opacity);
  filter: blur(calc(var(--blur) * 10px));
}
```

### 🧠 In-Depth Breakdown:
*   **`object-fit: cover`**: Ensures the image fills the tile without being squashed or stretched.
*   **`var(--opacity)`**: An empty variable that JavaScript fills with 0 (hidden) to 1 (visible).
*   **`calc(var(--blur) * 10px)`**: A real-time calculation that multiplies the blur variable from JS to create a smooth focusing effect.

---

## 📜 Full CSS Source Code Reference
> [!TIP]
> This is a 1:1 verbatim copy of the `style.css` file for easy reference during class.

```css
/* Main container setup: dark background and centered content */
body {  
  background: rgb(2, 6, 23);
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
}

/* Global reset for consistent sizing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 
  Magic Wand design:
  A vertical bar with a gradient to simulate a 3D cylindrical shape.
*/
#wand {
  width: 10vmin;
  aspect-ratio: 1 / 10;
  background: linear-gradient(
    to right, 
    rgb(26 24 28) 10%, 
    rgb(42 40 44) 45% 55%, 
    rgb(26 24 28) 90%
  );
  position: absolute;
  left: 5%;
  top: 20%;
  translate: -50%;
  rotate: -3deg;
  z-index: 100;
  border-radius: 3vmin;
  box-shadow: 0vmin 1vmin 4vmin rgb(0 0 0 / 80%);
  overflow: hidden;
}

/* The tip of the wand with a lighter metallic gradient */
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

/* Flex container for the revealable image tiles */
#tiles {
  display: flex;
}

/* 
  Individual tiles:
  Initially shows a placeholder icon. Images are overlaid and revealed via JS.
*/
.tile {
  display: grid;
  place-items: center;
  width: 38vmin;
  aspect-ratio: 1;
  background-color: rgb(31, 41, 55);
  border-radius: 6vmin;
  box-shadow: 0vmin 3vmin 6vmin rgb(0 0 0 / 25%),
    inset 0vmin 0.5vmin 1vmin rgb(255 255 255 / 15%);
  position: relative;
  overflow: hidden;
}

/* Slight rotational offsets to give a more playful, scattered look */
.tile:nth-child(1) {
  rotate: 3deg;
  z-index: 3;
}

.tile:nth-child(2) {
  rotate: -2deg;
  z-index: 2;
}

.tile:nth-child(3) {
  rotate: 5deg;
  z-index: 1;
}

/* Negative margin to create an overlapping effect between tiles */
.tile:is(:nth-child(2), :nth-child(3)) {
  margin-left: -10vmin;
}

/* Placeholder icon styling */
.tile > i {
  font-size: 15vmin;
  color: rgb(255 255 255 / 10%);
}

/* 
  Revealable image:
  Uses custom properties --opacity and --blur (updated by script.js) 
  to create the "reveal" effect.
*/
.tile > img {
  height: 100%;
  aspect-ratio: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
  opacity: var(--opacity);
  filter: blur(calc(var(--blur) * 10px));
}
```
