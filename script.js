// Select the wand element and all revelation tiles from the DOM
const wand = document.getElementById("wand"),
      tiles = document.querySelectorAll(".tile");

// Helper utilities for common calculations and string formatting
const xy = (x, y) => ({ x, y }),
      px = value => `${value}px`,
      deg = value => `${value}deg`,
      clamp = (value, min, max) => Math.max(Math.min(value, max), min);

/**
 * Calculates updated mouse position data including normalized decimal coordinates
 * and adjusted positions for the wand's specific movement behavior.
 */
const updateMouse = (mouseX, mouseY) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  
  const mouse = {
    position: xy(mouseX, mouseY),
    decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
    multiplier: xy(1.3, 0.4), // Scale movement to make wand feel more dynamic
    offset: xy(windowWidth * -0.15, windowHeight * 0.1), // Offset to position wand relative to cursor
    modifiedPosition: xy(0, 0)
  }
  
  // Apply scaling and offsets to create a skewed movement effect
  mouse.modifiedPosition.x = mouse.position.x * mouse.multiplier.x + mouse.offset.x;  
  mouse.modifiedPosition.y = mouse.position.y * mouse.multiplier.y + mouse.offset.y;  
  
  return mouse;
}

/**
 * Updates the opacity and blur of images within tiles based on the horizontal
 * position of the "magic wand" reveal line.
 */
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

/**
 * Generates the CSS-in-JS style object for the wand's animation
 */
const getWandStyles = mouse => ({
  left: px(mouse.modifiedPosition.x),
  top: px(mouse.modifiedPosition.y),
  rotate: deg(mouse.decimal.x * 20 - 10) // Add a subtle tilt based on horizontal position
});

// Main interaction loop: update wand and reveal images on mouse move
window.onmousemove = e => {
  const mouse = updateMouse(e.clientX, e.clientY),  
        wandStyles = getWandStyles(mouse);
  
  // Smoothly animate the wand to its new position/rotation
  wand.animate(wandStyles, { duration: 400, fill: "forwards" });
  
  // Update image revelation state across all tiles
  revealImages(mouse.modifiedPosition.x);
}