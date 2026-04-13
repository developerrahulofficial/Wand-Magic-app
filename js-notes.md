# 🧠 JS Masterclass: The Logic Behind the Magic
> **Mission:** This guide breaks down the `script.js` file line-by-line. Follow this flow during class to help students understand how we track the mouse and reveal images using coordinate math. 🪄✨

---

## 🛠️ Step 1: Selecting the Elements
*Lines 1 - 3 of `script.js`*

Before we can move anything, we must tell JavaScript which elements on the page we want to control.

```javascript
/* Select the wand element and all revelation tiles from the DOM */
const wand = document.getElementById("wand"),
      tiles = document.querySelectorAll(".tile");
```

### 💡 The Meaning:
*   **`getElementById("wand")`**: 🎯 Targets the unique ID of our magic wand so we can move it.
*   **`querySelectorAll(".tile")`**: 📑 Selects **all** elements with the class `.tile` and puts them in a "NodeList" (like a list of cards) so we can check if the wand is over them.

---

## 🏗️ Step 2: The Helper Toolbox
*Lines 5 - 9 of `script.js`*

We create "Helper Functions" to handle repetitive tasks like adding `px` or `deg` to numbers. This keeps our main code clean and easy to read!

```javascript
/* Helper utilities for common calculations and string formatting */
const xy = (x, y) => ({ x, y }),
      px = value => `${value}px`,
      deg = value => `${value}deg`,
      clamp = (value, min, max) => Math.max(Math.min(value, max), min);
```

### 🧩 Line-by-Line Breakdown:
1.  **`xy(x, y)`**: 📦 Quickly packs two numbers into a single coordinate object `{x, y}`.
2.  **`px(value)`**: 📏 Converts a number (100) into a CSS pixel string ("100px").
3.  **`deg(value)`**: 🔄 Converts a number (45) into a CSS rotation string ("45deg").
4.  **`clamp(val, min, max)`**: 🧱 **Extremely Important!** Ensures a number never goes below the `min` or above the `max`. We use this to keep our reveal percentage between 0 and 1.

---

## 🧠 Step 3: Updating Mouse Data
*Lines 11 - 31 of `script.js`*

This function calculates where the mouse is and "skews" the wand's position so it doesn't just sit directly under the cursor—it feels alive and dynamic!

```javascript
const updateMouse = (mouseX, mouseY) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  
  const mouse = {
    position: xy(mouseX, mouseY),
    decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
    multiplier: xy(1.3, 0.4), 
    offset: xy(windowWidth * -0.15, windowHeight * 0.1), 
    modifiedPosition: xy(0, 0)
  }
  
  // Apply scaling and offsets to create a skewed movement effect
  mouse.modifiedPosition.x = mouse.position.x * mouse.multiplier.x + mouse.offset.x;  
  mouse.modifiedPosition.y = mouse.position.y * mouse.multiplier.y + mouse.offset.y;  
  
  return mouse;
}
```

### 💡 The Meaning:
*   **`decimal`**: 🔢 Calculates mouse position as a percentage (0.0 to 1.0) of the screen width/height.
*   **`multiplier` & `offset`**: 🧮 These are our "Feel" constants. They shift the wand slightly so it has a more dynamic, floating motion instead of a boring 1-to-1 follow.
*   **`modifiedPosition`**: 📍 The final coordinate where the wand will actually move after the math is done.

---

## 🖼️ Step 4: Image Revelation Logic
*Lines 33 - 50 of `script.js`*

This is the **Core Logic**. It calculates how much of an image should be visible based on the wand's horizontal position.

```javascript
const revealImages = mouseX => {
  for(const tile of tiles) {
    const dimensions = tile.getBoundingClientRect(),
          relativeMouseX = mouseX - dimensions.left,
          mouseXAsDecimal = clamp(relativeMouseX / dimensions.width, 0, 1);
    
    // As the wand moves across a tile, increase opacity and decrease blur
    const opacity = mouseXAsDecimal,
          blur = 1 - mouseXAsDecimal;
    
    tile.style.setProperty("--opacity", opacity);
    tile.style.setProperty("--blur", blur);
  }
}
```

### 🧠 Deep Dive:
1.  **`getBoundingClientRect()`**: 📏 Gets the exact pixel position and size of a card on the screen.
2.  **`relativeMouseX`**: 🎯 Finds out where the mouse is **relative** to that specific card's left edge.
3.  **`mouseXAsDecimal`**: 📊 Converts that position into a 0 (left edge) to 1 (right edge) value using our `clamp` helper.
4.  **`setProperty`**: 🛠️ Injects these values directly into our CSS variables (`--opacity` and `--blur`) which then trigger the visual effect!

---

## 🪄 Step 5: Wand Animation Styles
*Lines 52 - 59 of `script.js`*

```javascript
const getWandStyles = mouse => ({
  left: px(mouse.modifiedPosition.x),
  top: px(mouse.modifiedPosition.y),
  rotate: deg(mouse.decimal.x * 20 - 10) 
});
```
*   **`rotate`**: 🔄 Tilts the wand between -10 and +10 degrees based on how far right the mouse is. This makes the wand look like it’s being swung by a hand.

---

## 🔁 Step 6: The Main Execution Loop
*Lines 61 - 71 of `script.js`*

This is the "Engine" that connects everything together and runs on every mouse movement.

```javascript
window.onmousemove = e => {
  const mouse = updateMouse(e.clientX, e.clientY),  
        wandStyles = getWandStyles(mouse);
  
  /* Smoothly animate the wand to its new position/rotation */
  wand.animate(wandStyles, { duration: 400, fill: "forwards" });
  
  /* Update image revelation state across all tiles */
  revealImages(mouse.modifiedPosition.x);
}
```

### 💡 Key Points:
*   **`onmousemove`**: 🖱️ Triggers the logic every single time the mouse moves even 1 pixel.
*   **`animate()`**: 🏃‍♂️ A built-in JS method that handles smooth transitions and easing automatically. 
*   **`fill: "forwards"`**: 🛑 Tells the animation to stay at its final position instead of snapping back to the starting point.

---

> [!IMPORTANT]
> **Learning Tip:** Tell your students: "Mathematics is the brush, and JavaScript is the hand that paints the UI." 🎨

---

# 📜 Full JS Verbatim Reference
> [!TIP]
> Use this section to copy the full, working code if someone gets stuck during the typing phase.

```javascript
// Select the wand element and all revelation tiles from the DOM
const wand = document.getElementById("wand"),
      tiles = document.querySelectorAll(".tile");

// Helper utilities for common calculations and string formatting
const xy = (x, y) => ({ x, y }),
      px = value => `${value}px`,
      deg = value => `${value}deg`,
      clamp = (value, min, max) => Math.max(Math.min(value, max), min);

// Calculates updated mouse position data
const updateMouse = (mouseX, mouseY) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  
  const mouse = {
    position: xy(mouseX, mouseY),
    decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
    multiplier: xy(1.3, 0.4),
    offset: xy(windowWidth * -0.15, windowHeight * 0.1),
    modifiedPosition: xy(0, 0)
  }
  
  mouse.modifiedPosition.x = mouse.position.x * mouse.multiplier.x + mouse.offset.x;  
  mouse.modifiedPosition.y = mouse.position.y * mouse.multiplier.y + mouse.offset.y;  
  
  return mouse;
}

// Updates image revelation state across all tiles
const revealImages = mouseX => {
  for(const tile of tiles) {
    const dimensions = tile.getBoundingClientRect(),
          relativeMouseX = mouseX - dimensions.left,
          mouseXAsDecimal = clamp(relativeMouseX / dimensions.width, 0, 1);
    
    const opacity = mouseXAsDecimal,
          blur = 1 - mouseXAsDecimal;
    
    tile.style.setProperty("--opacity", opacity);
    tile.style.setProperty("--blur", blur);
  }
}

// Generates the CSS-in-JS style object for the wand
const getWandStyles = mouse => ({
  left: px(mouse.modifiedPosition.x),
  top: px(mouse.modifiedPosition.y),
  rotate: deg(mouse.decimal.x * 20 - 10)
});

// Main interaction loop
window.onmousemove = e => {
  const mouse = updateMouse(e.clientX, e.clientY),  
        wandStyles = getWandStyles(mouse);
  
  wand.animate(wandStyles, { duration: 400, fill: "forwards" });
  
  revealImages(mouse.modifiedPosition.x);
}
```