# E-Commerce Web Application

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
- **Checkout**: Simulates a checkout process by clearing the cart, saving the order to Firestore, and displaying a success message.

### User Authentication
- **Login and Registration**: Users can register and log in using Firebase Authentication.
- **Protected Routes**: Certain pages (e.g., Profile and Product Management) are accessible only to logged-in users.

### Product Management
- **Admin-Only Access**: Only admin users can add, edit, or delete products. Product management features are restricted to users with admin privileges.
- **Add Product**: Admins can add new products to the Firestore database via a modal form.
- **Edit Product**: Admins can edit existing product details, including title, price, category, description, and image.
- **Delete Product**: Admins can delete products from the Firestore database.


### Continuous Integration and Deployment (CI/CD)
- **CI Pipeline**:
  - Added a **CI Pipeline** (`CI.yml`) that:
    - Runs tests on every push to the `dev` branch.
    - If tests pass, automatically merges changes into the `main` branch.
    - Triggers the deployment pipeline (`deploy.yml`) upon successful merge.
- **CD Pipeline**:
  - Added a **CD Pipeline** (`deploy.yml`) that:
    - Automatically deploys the application to **Vercel** whenever changes are pushed to the `main` branch.
    - https://e-commerce-app-eta-amber.vercel.app 

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
   cd e-commerce
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
├── .github/workflow    #CI & DC Github Workflows
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
2. You can log in with your email/password or with your Google account.
3. Logged-in users can view their profile and manage products (admin only).

### Product Management
1. Navigate to `/product/manage` (requires login).
2. Add a new product using the "Add Product" button.
3. Edit or delete existing products directly from the product table.

---
## Testing

### Unit Tests
- Added unit tests for the following components:
  - **`CartSlice.test.js`**: Tests the Redux slice for cart functionality.
  - **`RegisterButton.test.js`**: Tests the behavior of the registration button.

### Integration Tests
- Added an integration test:
  - **`CartIntegration.test.js`**: Tests the shopping cart's functionality, including adding, updating, and removing items.

### Testing Tools
- **Jest**: Used for writing and running tests.
- **Babel**: Configured for transpiling test files.

---

## Deployment

- **Vercel**: The application is deployed to **Vercel** for production.
- **GitHub**: Used for version control and CI/CD integration.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Redux Toolkit**: State management for the shopping cart and user authentication.
- **Vite**: Fast build tool and development server for modern web applications.
- **Bootstrap**: Responsive design and styling.
- **React-Bootstrap**: Bootstrap components for React.
- **Firebase**: Backend services for authentication and Firestore database.
- **Jest**: Testing framework for unit and integration tests.
- **Bable**: JavaScript compiler used for transpiling test files.


---

## Firebase Integration

### Firestore Collections
- **Products**:
  - Fields: `title`, `price`, `category`, `description`, `image`, `id` (auto-generated).
- **Users**:
  - Fields: `id`, `name`, `email`.

### Authentication
- **Email/Password Authentication**: Users can register and log in using their email and password.
- **Google Login**: Users can log in with their Google account using Firebase Authentication.

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

### v1.2.0
- Added **CI/CD Pipelines**:
  - CI pipeline for testing and merging changes.
  - CD pipeline for automatic deployment to **Vercel**.
- Added unit tests for **CartSlice** and **RegisterButton**.
- Added integration test for shopping cart functionality.
- Refactored and organized code for improved readability.
### v1.3.0
- Implemented **Admin-Only Product Management**: Only admin users can add, edit, or delete products.
- Added **Google Login Integration**: Users can now log in with their Google account.