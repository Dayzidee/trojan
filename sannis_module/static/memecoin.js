// ✅ Floating Animated Menu with Liquid Glass UI (Draggable & Cached Position)
// ✅ Now with Image Icons and Dynamic Text Color

// --- 1. CONFIGURATION ---

// ✅ Change these to your desired redirect links:
const STOCK_REDIRECT_URL = window.STOCK_REDIRECT_URL;;
const MEMECOIN_REDIRECT_URL =  window.ASSET_MEMECOIN_BASE_URL;

// ✅ Change these to your icon image URLs:
const STOCK_ICON_URL = "https://pics.craiyon.com/2023-11-02/cb19f0d49da7411d956ae0e3beccd083.webp"; // Placeholder stock icon
const MEMECOIN_ICON_URL = "https://miro.medium.com/v2/resize:fit:2400/1*BYcD1CYTKqQdViJgSk1AMQ.jpeg"; // Placeholder memecoin icon

// ✅ Customize the dynamic text colors:
const LIGHT_TEXT_COLOR = "#ffffff"; // For dark backgrounds
const DARK_TEXT_COLOR = "#444739"; // For light backgrounds

// Key for storing the menu position in Local Storage
const POSITION_CACHE_KEY = "liquid_menu_position";


document.addEventListener("DOMContentLoaded", function () {

  // --- 2. SETUP THE ELEMENTS ---

  // Create the main draggable wrapper (the glass container)
  const wrapper = document.createElement("div");
  wrapper.id = "liquid-menu-wrapper";
  wrapper.className = "glass-container";

  // Create the structural elements for the glass effect
  const glassFilter = document.createElement("div");
  glassFilter.className = "glass-filter";
  const glassOverlay = document.createElement("div");
  glassOverlay.className = "glass-overlay";
  const glassSpecular = document.createElement("div");
  glassSpecular.className = "glass-specular";

  // Create the content area for menu items
  const content = document.createElement("div");
  content.className = "glass-content";

  // Create "Trade Stock" menu item with an image
  const tradeStockItem = document.createElement("div");
  tradeStockItem.className = "glass-item";
  tradeStockItem.id = "trade-stock-button";
  tradeStockItem.innerHTML = `
    <img class="stock-image" src="${STOCK_ICON_URL}" alt="Trade Stock Icon">
    <span class="menu-text">Stock</span>
  `;

  // Create "Trade Memecoin" menu item with an image
  const tradeMemecoinItem = document.createElement("div");
  tradeMemecoinItem.className = "glass-item";
  tradeMemecoinItem.id = "trade-memecoin-button";
  tradeMemecoinItem.innerHTML = `
    <img class="stock-image" src="${MEMECOIN_ICON_URL}" alt="Trade Memecoin Icon">
    <span class="menu-text">Memecoin</span>
  `;

  // Assemble the menu
  content.appendChild(tradeStockItem);
  content.appendChild(tradeMemecoinItem);
  wrapper.appendChild(glassFilter);
  wrapper.appendChild(glassOverlay);
  wrapper.appendChild(glassSpecular);
  wrapper.appendChild(content);
  document.body.appendChild(wrapper);

  const menuTextElements = wrapper.querySelectorAll('.menu-text');

  // --- 3. LOAD CACHED POSITION ---

  const cachedPosition = localStorage.getItem(POSITION_CACHE_KEY);
  if (cachedPosition) {
    const pos = JSON.parse(cachedPosition);
    wrapper.style.top = pos.top + 'px';
    wrapper.style.left = pos.left + 'px';
    wrapper.style.bottom = 'unset';
    wrapper.style.right = 'unset';
  } else {
    wrapper.style.bottom = '25px';
    wrapper.style.right = '25px';
  }


  // --- 4. DYNAMIC TEXT COLOR LOGIC ---

  /**
   * Gets the computed background color of an element, traversing up the DOM if it's transparent.
   * @param {HTMLElement} el - The element to check.
   * @returns {string} The non-transparent background color in rgb format.
   */
  function getBackgroundColor(el) {
    if (!el) return 'rgb(255, 255, 255)'; // Default to white if we hit the top
    const color = window.getComputedStyle(el).backgroundColor;
    if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
      return color;
    }
    return getBackgroundColor(el.parentElement);
  }

  /**
   * Determines if a color is light or dark based on its luminance.
   * @param {string} colorString - The color in 'rgb(r, g, b)' format.
   * @returns {boolean} True if the color is dark, false if light.
   */
  function isColorDark(colorString) {
    const match = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return false; // Default to assuming a light background
    const [r, g, b] = match.slice(1).map(Number);
    // Formula for perceived brightness (luminance)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminance < 128; // Threshold can be adjusted (128 is a common midpoint)
  }

  /**
   * Updates the menu text color based on the background it's over.
   */
  function updateTextColor() {
      // Hide the menu briefly to check the element underneath it
      wrapper.style.display = 'none';
      
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + (rect.width / 2);
      const centerY = rect.top + (rect.height / 2);
      
      const elementUnderneath = document.elementFromPoint(centerX, centerY);
      
      // Show the menu again
      wrapper.style.display = 'flex';

      const bgColor = getBackgroundColor(elementUnderneath);
      const newColor = isColorDark(bgColor) ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR;

      menuTextElements.forEach(span => {
          span.style.color = newColor;
      });
  }
  
  // Initial color check and set interval for dynamic updates
  setTimeout(updateTextColor, 100); // Small delay to ensure layout is final
  setInterval(updateTextColor, 1000); // Re-check every second


  // --- 5. DRAGGING LOGIC ---

  let active = false, isClick = true;
  let xOffset = 0, yOffset = 0;

  wrapper.addEventListener("touchstart", dragStart, false);
  wrapper.addEventListener("touchend", dragEnd, false);
  wrapper.addEventListener("touchmove", drag, false);
  wrapper.addEventListener("mousedown", dragStart, false);
  wrapper.addEventListener("mouseup", dragEnd, false);
  wrapper.addEventListener("mousemove", drag, false);

  function dragStart(e) {
    if (e.type === "mousedown" && e.button !== 0) return;
    wrapper.style.animation = 'none';

    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    
    const rect = wrapper.getBoundingClientRect();
    xOffset = clientX - rect.left;
    yOffset = clientY - rect.top;

    wrapper.style.bottom = 'unset';
    wrapper.style.right = 'unset';
    wrapper.style.top = rect.top + 'px';
    wrapper.style.left = rect.left + 'px';

    active = true;
    isClick = true;
  }

  function dragEnd() {
    if (!active) return;
    wrapper.style.animation = 'floaty 3s ease-in-out infinite';
    active = false;
    
    if (!isClick) {
      localStorage.setItem(POSITION_CACHE_KEY, JSON.stringify({
        top: parseFloat(wrapper.style.top),
        left: parseFloat(wrapper.style.left)
      }));
      updateTextColor(); // Update color based on new position
    }
  }

  function drag(e) {
    if (!active) return;
    isClick = false;
    e.preventDefault();
    
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

    wrapper.style.left = (clientX - xOffset) + "px";
    wrapper.style.top = (clientY - yOffset) + "px";
  }


  // --- 6. REDIRECT & CSS ---

  tradeStockItem.addEventListener("click", () => {
    if (isClick) window.location.href = STOCK_REDIRECT_URL;
  });

  tradeMemecoinItem.addEventListener("click", () => {
    if (isClick) window.location.href = MEMECOIN_REDIRECT_URL;
  });

  const style = document.createElement("style");
  style.textContent = `
    :root {
      --lg-bg-color: rgba(255, 255, 255, 0.25);
      --lg-highlight: rgba(255, 255, 255, 0.75);
    }

    #liquid-menu-wrapper {
      position: fixed;
      z-index: 9999;
      cursor: grab;
      animation: floaty 3s ease-in-out infinite;
      transition: none;
      display: flex; /* Use flex from the start */
    }

    #liquid-menu-wrapper:active {
        cursor: grabbing;
    }
    
    .glass-container {
      position: relative;
      align-items: center;
      background: transparent;
      border-radius: 1.5rem; /* MODIFIED: Reduced for a tighter look */
      overflow: hidden;
      box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
    }

    .glass-filter, .glass-overlay, .glass-specular {
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }

    .glass-filter {
      z-index: 0;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }

    .glass-overlay { z-index: 1; background: var(--lg-bg-color); }
    .glass-specular { z-index: 2; box-shadow: inset 1px 1px 0 var(--lg-highlight), inset 0 0 5px var(--lg-highlight); }

    .glass-content {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 8px 15px; /* MODIFIED: Reduced padding */
      gap: 1rem; /* MODIFIED: Reduced gap between items */
    }
    .stock-image{
      border-radius: 10px; /* MODIFIED: Adjusted for smaller icon */
    }
    .glass-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.2s ease-out;
      cursor: pointer;
    }
    
    .glass-item img {
        height: 28px; /* MODIFIED: Made icon smaller */
        width: 28px;  /* MODIFIED: Made icon smaller */
        margin-bottom: 0.25rem; /* MODIFIED: Reduced space below icon */
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
        pointer-events: none; /* Prevents image from interfering with drag */
    }

    .glass-item .menu-text {
      font-size: 12px; /* MODIFIED: Made font smaller */
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0,0,0,0.3);
      transition: color 0.3s ease-in-out; /* Smooth color transition */
    }

    .glass-item:hover { transform: scale(1.1); }
    .glass-item:active { transform: scale(0.95); }

    @keyframes floaty {
      0%   { transform: translateY(0px); }
      50%  { transform: translateY(-10px); } /* MODIFIED: Reduced float distance */
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(style);
});