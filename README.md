
# E-Commerce Web Application
Adding this to test commit.

This is a fully functional e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, **React Query**, and **Bootstrap**. The application allows users to browse products, filter them by category, add items to a shopping cart, and simulate a checkout process. It also includes user authentication and product management features integrated with **Firebase Firestore**.

---

## Features

### Product Catalog
- **Product Listing**: Displays all products fetched from **Firestore**.
- **Product Details**: Each product shows its title, price, category, description, and image.
- **Category Filtering**: Users can filter products by category using a dynamically populated dropdown menu.

### Shopping Cart
- **Add to Cart**: Users can add products to the shopping cart directly from the product listing.
- **Cart Management**: Users can view, update quantities, and remove items from the cart.
- **Total Price Calculation**: The cart dynamically calculates the total price and total number of items.
- **Session Persistence**: The cart state is saved in `sessionStorage` to persist across browser sessions.
- **Checkout**: Simulates a checkout process by clearing the cart and displaying a success message.

### User Authentication
- **Login and Registration**: Users can register and log in using Firebase Authentication.
- **Protected Routes**: Certain pages (e.g., Profile and Product Management) are accessible only to logged-in users.

### Product Management
- **Add Product**: Admins can add new products to the Firestore database via a modal form.
- **Edit Product**: Admins can edit existing product details, including title, price, category, description, and image.
- **Delete Product**: Admins can delete products from the Firestore database.
- **Dynamic Category Dropdown**: The category field in the product form is a dropdown menu populated with existing categories from Firestore.

### Responsive Design
- The application is fully responsive, with a clean and modern UI built using **Bootstrap**.

--- 

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Firebase Project**: Set up a Firebase project and Firestore database.

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

### Set up Firebase

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
2. **Enable Firestore and Authentication**:
   - Go to the Firestore section and create a database.
   - Enable Email/Password Authentication in the Authentication section.
3. **Add your Firebase configuration** to `src/firebase/firebaseConfig.ts`:

   ```typescript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
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
├── api/                # API calls to Firestore
├── assets/             # Static assets
├── components/         # Reusable components (e.g., ProductCard, CartButton, ProtectedRoute)
├── pages/              # Page components (e.g., HomePage, ProfilePage, ProductManagementPage)
├── redux/              # Redux Toolkit slices and store
├── types/              # TypeScript type definitions
├── firebase/           # Firebase configuration
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

### User Authentication
1. Register or log in to access protected routes.
2. Logged-in users can view their profile and manage products.

### Product Management
1. Navigate to `/product/manage` (requires login).
2. Add a new product using the "Add Product" button.
3. Edit or delete existing products directly from the product table.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Redux Toolkit**: State management for the shopping cart and user authentication.
- **React Query**: Data fetching and caching for API calls.
- **Bootstrap**: Responsive design and styling.
- **React-Bootstrap**: Bootstrap components for React.
- **Firebase**: Backend services for authentication and Firestore database.


---

## Firebase Integration

### Firestore Collections
- **Products**:
  - Fields: `title`, `price`, `category`, `description`, `image`, `id` (auto-generated).
- **Users**:
  - Fields: `id`, `name`, `email`.

### Authentication
- **Email/Password Authentication**: Users can register and log in using their email and password.

---

## Author

- **Noel Watters**

---

## Notes
This project is for educational purposes and uses Firebase for backend services. No real transactions are process

## Change Log

### v1.0.0
- Initial release of the e-commerce web application.

### v1.1.0
- Integrated **Firebase Firestore** for product and user data storage.
- Added **Firebase Authentication** for user login and registration.
- Implemented **protected routes** for `/profile/:userid` and `/product/manage`.
- Replaced FakeStoreAPI with **Firestore** for product data.
- Added **Product Management** features:
  - Add new products via a modal form.
  - Edit existing product details.
  - Delete products from Firestore.
- Introduced **dynamic category dropdown** in the product form, populated from Firestore.
- Enhanced **shopping cart functionality**:
  - Added session persistence using `sessionStorage`.
  - Improved total price and quantity calculations.
- Updated **responsive design** using **React-Bootstrap**.