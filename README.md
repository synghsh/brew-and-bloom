# Brew & Bloom ☕️🌸

A modern, highly interactive web application for an artisan coffee shop and restaurant. This project provides a premium user experience featuring 3D elements, smooth animations, an online ordering system, and a table reservation flow.

## 🌟 Features

- **Immersive 3D Hero Section**: Uses React Three Fiber to render floating 3D coffee elements (cups, beans, steam) right on the landing page.
- **Interactive Menu & Ordering**: A beautifully categorized menu with "Add to Cart" functionality, complete with variants and add-ons.
- **Table Reservations**: A multi-step booking system allowing users to select dates, times, guests, and specific seating areas (e.g., Rooftop, Private Corner).
- **Global State Management**: A custom React Context setup handling the shopping cart, user authentication state, and UI toggles (drawers/modals).
- **Animated UI**: Extensive use of Framer Motion for page transitions, hover effects, modal popups, and a special "Welcome Gift" surprise for first-time visitors.
- **Authentication Flow**: A mock login/signup modal designed to seamlessly integrate with a backend auth service later.
- **Responsive Design**: Fully mobile-responsive layouts built with Tailwind CSS.

## 🚀 Tech Stack & Packages

This project is built with a modern React ecosystem:

- **[React 18](https://reactjs.org/)** - Core frontend library
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing for robust code
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling and bundler
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid styling
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library for React
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)** & **[Drei](https://github.com/pmndrs/drei)** - React renderer for Three.js (used for the 3D Hero section)
- **[Lucide React](https://lucide.dev/)** - Clean, customizable SVG icons

## 📁 Project Structure

```text
brew-and-bloom/
├── public/               # Static assets (favicons, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AuthModal.tsx # Login/Signup popup
│   │   ├── CartDrawer.tsx# Slide-out shopping cart
│   │   └── Navbar.tsx    # Sticky navigation bar
│   ├── sections/         # Main page sections
│   │   ├── BookingSection.tsx  # Table reservation flow
│   │   ├── BrandExperience.tsx # "Our Story" & stats
│   │   ├── Footer.tsx          # Contact info & links
│   │   ├── GiftExperience.tsx  # First-time visitor reward animation
│   │   ├── Hero.tsx            # Landing section with 3D Canvas
│   │   ├── MenuSection.tsx     # Display of popular items
│   │   ├── OrderSection.tsx    # Full online ordering grid
│   │   ├── Services.tsx        # Highlight of offerings (Delivery, Dine-in)
│   │   └── Testimonials.tsx    # Customer reviews
│   ├── App.tsx           # Main application layout and Global Context Provider
│   ├── main.tsx          # React DOM rendering entry point
│   └── index.css         # Tailwind directives and custom CSS variables
├── index.html            # Main HTML template
├── tailwind.config.js    # Tailwind configuration and custom theme colors
└── package.json          # Project dependencies and scripts
```

## 🎨 Theme & Design System

The project uses a custom color palette configured in Tailwind to give a warm, premium coffeehouse feel:
- `espresso`: `#2C1810`
- `coffee`: `#4A3728`
- `cream`: `#F5E6D3`
- `gold`: `#D4AF37`
- `terracotta`: `#C67B5C`
- `latte`: `#E8D5B7`
- `dark`: `#1A1110`

## 💻 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/brew-and-bloom.git
cd brew-and-bloom
```

### 2. Install dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
# or
yarn install
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:5173 in your browser to view the application.

## 🛠 Future Enhancements
- Connect Authentication to Firebase/Supabase
- Integrate a payment gateway (e.g., Stripe) for the checkout flow
- Add a backend database for real-time menu and table availability