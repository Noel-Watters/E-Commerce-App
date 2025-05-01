// __tests__/CartIntegration.test.js
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slices/CartSlice";
import Header from "../components/CartButton"; // Header contains the CartModal
import userReducer from "../redux/slices/UserSlice";

describe("Cart Integration Tests", () => {
  let store;

  beforeEach(() => {
    // Configure the Redux store with cart and user reducers
    store = configureStore({
      reducer: {
        cart: cartReducer,
        user: userReducer,
      },
      preloadedState: {
        cart: {
          items: [], // Initial cart state with no items
        },
        user: {
          user: { id: "123", name: "Test User", email: "test@example.com" }, // Mock user data
        },
      },
    });
  });

  test("opens the cart modal when the cart button is clicked", () => {
    // Render the Header component wrapped in the Redux Provider
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button"); // Find the cart button
    fireEvent.click(cartButton); // Simulate a click event

    // Assert that the modal is displayed
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument(); // Check for the modal title
  });

  test("adds a product to the cart and displays it in the modal", () => {
    // Dispatch an action to add a product to the cart
    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, title: "Product 1", price: 10, quantity: 1 }, // Mock product data
    });

    // Render the Header component wrapped in the Redux Provider
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button"); // Find the cart button
    fireEvent.click(cartButton); // Simulate a click event

    // Assert that the product is displayed in the cart modal
    expect(screen.getByText(/product 1/i)).toBeInTheDocument(); // Check for the product name

    // Scope the query to the table row for "Product 1"
    const tableRow = screen.getByText(/product 1/i).closest("tr"); // Find the table row containing the product

    // Target the first occurrence of "$10.00" in the table row (price column)
    const priceColumn = within(tableRow).getAllByText("$10.00")[0]; // Find the price column
    expect(priceColumn).toBeInTheDocument(); // Assert that the price is displayed
  });

  test("updates the quantity of a product in the cart", () => {
    // Dispatch an action to add a product to the cart
    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, title: "Product 1", price: 10, quantity: 1 }, // Mock product data
    });

    // Render the Header component wrapped in the Redux Provider
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button"); // Find the cart button
    fireEvent.click(cartButton); // Simulate a click event

    // Scope the query to the table row for "Product 1"
    const tableRow = screen.getByText(/product 1/i).closest("tr"); // Find the table row containing the product

    // Simulate changing the quantity within the scoped table row
    const quantityInput = within(tableRow).getByDisplayValue("1"); // Find the quantity input field
    fireEvent.change(quantityInput, { target: { value: "2" } }); // Simulate changing the quantity to 2

    // Assert that the quantity input value updates
    expect(quantityInput.value).toBe("2"); // Check that the input value is updated

    // Assert that the total price updates within the same table row
    const totalPrice = within(tableRow).getAllByText("$20.00")[0]; // Find the updated total price
    expect(totalPrice).toBeInTheDocument(); // Assert that the total price is displayed
  });

  test("removes a product from the cart", () => {
    // Dispatch an action to add a product to the cart
    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, title: "Product 1", price: 10, quantity: 1 }, // Mock product data
    });

    // Render the Header component wrapped in the Redux Provider
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button"); // Find the cart button
    fireEvent.click(cartButton); // Simulate a click event

    // Scope the query to the table row for "Product 1"
    const tableRow = screen.getByText(/product 1/i).closest("tr"); // Find the table row containing the product

    // Simulate clicking the "Remove" button within the scoped table row
    const removeButton = within(tableRow).getByText(/remove/i); // Find the "Remove" button
    fireEvent.click(removeButton); // Simulate a click event

    // Assert that the product is removed
    expect(screen.queryByText(/product 1/i)).not.toBeInTheDocument(); // Check that the product is no longer displayed
  });
});