# Campus Bites: Step-by-Step Guide

## 1. Set up the project

1. Unzip `campus-bites.zip`.
2. Open the `campus-bites` folder in Visual Studio Code.
3. In Visual Studio Code, open the Extensions panel and install **Live Server**.
4. Right-click `index.html` and choose **Open with Live Server**. The website opens in your browser.

Use Live Server rather than double-clicking `index.html`. Some browsers don't share a saved cart between pages opened directly from a folder. Chrome does, so you can also open the file directly in Chrome.

Keep all the files together in the same folder, or the pages and styling will stop working.

If you want to type the code yourself, create the files in this order and test after each step:

1. Create `index.html`, `menu.html`, `cart.html`, `booking.html`, and `about.html`, then click the navigation links.
2. Create `style.css`, then refresh and check every page.
3. Create `script.js` and add sections 1 to 6. Test the specials, search, and category buttons.
4. Add section 7, then test the cart.
5. Add section 8, then test the booking form.
6. Add sections 9 and 10, then test the FAQ, mobile menu, and dark mode.

## 2. Know what each file does

| File | What it does |
|---|---|
| `index.html` | Home page with the hero section, specials, and ordering steps |
| `menu.html` | Menu page with search and category buttons |
| `cart.html` | Order page with the bill and place order button |
| `booking.html` | Table booking form |
| `about.html` | Café details, opening hours, contact details, and FAQ |
| `style.css` | All the colours, fonts, layouts, animations, and mobile styles |
| `script.js` | The menu data and all the interactive features |

## 3. Understand how the site works

**Menu:** The dishes are stored in the `menuItems` array at the top of `script.js`. JavaScript uses that array to create the food cards.

**Search and filter:** When someone types or clicks a category, `updateMenu()` uses `filter()` to find matching dishes, then displays them.

**Cart:** `addToCart()` saves the cart in `localStorage`. That is why the cart stays the same when you move to another page.

**Booking form:** `validateBooking()` checks each input. If anything is wrong, it shows an error and stops the form from continuing.

**Dark mode:** `setTheme()` adds or removes the `dark` class on the `body`. `style.css` then changes the colour variables.

## 4. Make it your own

**Change the name:** In Visual Studio Code, press Cmd + Shift + H on Mac or Ctrl + Shift + H on Windows. Replace `Campus Bites` with your café's name.

**Change the colours:** Edit the values under `:root` at the top of `style.css`.

**Change the food:** Edit the `menuItems` array in `script.js`. Give every dish a different `id`, and set `special: true` for dishes you want on the home page.

**Use real food photos:** Create an `images` folder and add your photos. Give each dish an `image` value in `menuItems`, like `image: "images/dosa.jpg"`. In `createFoodCard()`, replace the `food-emoji` line with this:

```html
<img class="food-photo" src="${item.image}" alt="${item.name}">
```

Then add this to `style.css`:

```css
.food-photo {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
```

**Change the café details:** Edit the opening hours and contact details in `about.html`.

**Add your name:** Add your name and registration number to the footer of all 5 pages if your teacher wants them.

## 5. Test it before you submit

- Click every link in the navigation bar.
- Search for a dish and use all the category buttons.
- Add items to the cart, change their quantities, and place an order.
- Submit the booking form empty to check the errors, then submit it correctly.
- Open the FAQ questions and turn dark mode on and off.
- Narrow the browser window to check the mobile layout and Menu button.

## 6. Match the skills to your assignments

| Skill | Where to show it |
|---|---|
| HTML structure and links | All 5 pages |
| HTML tables | `cart.html` |
| HTML forms | `booking.html` |
| CSS variables and dark mode | Top of `style.css` |
| CSS Flexbox and Grid | Navigation bar and food cards |
| CSS animation | Token on the home page |
| Media queries | Bottom of `style.css` |
| JavaScript arrays and objects | `menuItems` in `script.js` |
| DOM updates and events | Search, filters, cart, and FAQ |
| Form validation and regular expressions | `validateBooking()` |
| `localStorage` | Cart and dark mode |

If your assignments covered something else, add it to the site. Your teacher may ask how the code works, so go through each section of `script.js` before you submit it.
