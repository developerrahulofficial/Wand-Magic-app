# 🏫 Live Coding Guide: Magic Wand Reveal
> **Instructions for Students:** Follow along with your teacher. Copy each code block into your `style.css` file one by one. By the end, you will have a fully functioning interactive reveal effect!

---

## 🏗️ Step 1: The Global Canvas & Reset
*Lines 1 - 15 of `style.css`*

First, we need to create a clean, dark stage and ensure our sizing math is easy to manage.

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

### 🧠 Line-by-Line Explanation:
1.  **`background: rgb(2, 6, 23)`**: Sets the page background to a deep navy blue.
2.  **`height: 100vh`**: Makes the body exactly as tall as your screen.
3.  **`overflow: hidden`**: Disables scrolling so our "app" stays perfectly in place.
4.  **`display: grid`**: Activates the CSS Grid layout engine.
5.  **`place-items: center`**: Forces everything inside the body to the perfect center (horizontally and vertically).
6.  **`margin: 0; padding: 0;`**: Strips away default browser gaps.
7.  **`box-sizing: border-box`**: Ensures `width: 100%` includes your padding, preventing layout breakage.

---

## 🪄 Step 2: Drawing the Magic Wand
*Lines 17 - 39 of `style.css`*

Now, let's create the interactive "Reveal Wand."

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
```

### 🧠 Line-by-Line Explanation:
1.  **`width: 10vmin`**: Responsive width based on the smaller side of the screen.
2.  **`aspect-ratio: 1 / 10`**: Automatically makes the wand 10x taller than its width.
3.  **`linear-gradient(...)`**: Uses three colors (Dark -> Light -> Dark) to make a flat rectangle look like a rounded 3D cylinder.
4.  **`position: absolute`**: Allows the wand to float freely wherever the mouse goes.
5.  **`translate: -50%`**: Shifts the wand so the mouse cursor is at its exact center.
6.  **`z-index: 100`**: High number ensures the wand stays "on top" of the images.
7.  **`box-shadow`**: Adds depth with a dark blur beneath the wand.

---

## ✨ Step 3: The Metallic Tip
*Lines 41 - 51 of `style.css`*

Every wand needs a shiny tip!

```css
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

### 🧠 Line-by-Line Explanation:
1.  **`height: 20%`**: Makes the "cap" take up the top 1/5th of the wand.
2.  **`background: linear-gradient(...)`**: Uses very bright whites and light blues to create a metallic "shine" effect.

---

## 📦 Step 4: The Tile Container
*Lines 52 - 56 of `style.css`*

```css
/* Flex container for the revealable image tiles */
#tiles {
  display: flex;
}
```
*   **`display: flex`**: This simple line aligns our images side-by-side in a horizontal row.

---

## 🧩 Step 5: The Card UI
*Lines 58 - 73 of `style.css`*

```css
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
```

### 🧠 Line-by-Line Explanation:
1.  **`display: grid` & `place-items: center`**: Centers the "image icon" inside the tile.
2.  **`width: 38vmin`**: Responsive square size.
3.  **`background-color: rgb(31, 41, 55)`**: Sets a dark gray for the cards.
4.  **`inset` Shadow**: Creates a tiny "rim light" on the inner edge, making the tile look thick like glass.
5.  **`position: relative`**: This is the "Anchor" that keeps the revealed image pinned inside the tile.

---

## 🎲 Step 6: Scattering & Layering
*Lines 75 - 89 of `style.css`*

```css
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
```
*   **`rotate`**: Tilts each card at a different angle so they look scattered on a table.
*   **`z-index`**: Defines which card is on top (Tile 1 has the highest index).

---

## 🧱 Step 7: The Overlap Trick
*Lines 91 - 94 of `style.css`*

```css
/* Negative margin to create an overlapping effect between tiles */
.tile:is(:nth-child(2), :nth-child(3)) {
  margin-left: -10vmin;
}
```
*   **`margin-left: -10vmin`**: This **negative margin** pulls the cards together so they overlap, creating the stack effect.

---

## 🖼️ Step 8: Icons & Initial State
*Lines 96 - 100 of `style.css`*

```css
/* Placeholder icon styling */
.tile > i {
  font-size: 15vmin;
  color: rgb(255 255 255 / 10%);
}
```
*   **`color: ... / 10%`**: Makes the background icon very faint so it doesn't distract from the image reveal.

---

## 🌫️ Step 9: The Revelation Engine
*Lines 102 - 116 of `style.css`*

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

### 🧠 Line-by-Line Explanation:
1.  **`object-fit: cover`**: Stretches the image to fill the card perfectly without squashing it.
2.  **`opacity: var(--opacity)`**: Becomes visible when JavaScript updates this CSS variable.
3.  **`filter: blur(...)`**: Uses `calc()` to multiply the blur variable by 10 pixels, creating the smooth reveal effect as the wand passes.

---
> [!IMPORTANT]
> Congratulations! You've combined all **116 lines** of code. Your `style.css` is now identical to the master project!