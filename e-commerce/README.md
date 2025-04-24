# E-Commerce Web Application

This is a fully functional e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, **React Query**, and **Bootstrap**. The application allows users to browse products, filter them by category, add items to a shopping cart, and simulate a checkout process.

---

## Features

### Product Catalog
- **Product Listing**: Displays all products fetched from the [FakeStoreAPI](https://fakestoreapi.com).
- **Product Details**: Each product shows its title, price, category, description, rating, and image.
- **Category Filtering**: Users can filter products by category using a dynamically populated dropdown menu.

### Shopping Cart
- **Add to Cart**: Users can add products to the shopping cart directly from the product listing.
- **Cart Management**: Users can view, update quantities, and remove items from the cart.
- **Total Price Calculation**: The cart dynamically calculates the total price and total number of items.
- **Session Persistence**: The cart state is saved in `sessionStorage` to persist across browser sessions.
- **Checkout**: Simulates a checkout process by clearing the cart and displaying a success message.

### Responsive Design
- The application is fully responsive, with a clean and modern UI built using **Bootstrap**.

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/e-commerce-web-app.git
   cd e-commerce-web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

### Build for Production

To build the application for production:
```bash
npm run build
```

The production-ready files will be in the `dist` folder.

---

## Project Structure

```
src/
├── api/                # API calls to FakeStoreAPI
├── assets/             # Static assets
├── components/         # Reusable components (e.g., ProductCard, CartButton)
├── pages/              # Page components (e.g., HomePage)
├── redux/              # Redux Toolkit slices and store
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
```

---

## How to Use

### Product Catalog
1. Browse all products on the home page.
2. Use the category dropdown to filter products by category.

### Shopping Cart
1. Click the "Add to Cart" button on any product to add it to the cart.
2. Click the cart icon in the header to view the cart.
3. Update product quantities or remove items directly in the cart modal.
4. Click "Checkout" to simulate a purchase and clear the cart.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Redux Toolkit**: State management for the shopping cart.
- **React Query**: Data fetching and caching for API calls.
- **Bootstrap**: Responsive design and styling.
- **React-Bootstrap**: Bootstrap components for React.
- **FakeStoreAPI**: Mock API for product and category data.

---

## API Endpoints

- **Get All Products**: `GET /products`
- **Get Categories**: `GET /products/categories`
- **Get Products by Category**: `GET /products/category/:category`

---

## Author

- **Noel Watters**

---

## Notes
This project is for educational purposes and uses the FakeStoreAPI for mock data. No real transactions are processed.