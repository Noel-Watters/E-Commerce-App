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
    store = configureStore({
      reducer: {
        cart: cartReducer,
        user: userReducer,
      },
      preloadedState: {
        cart: {
          items: [],
        },
        user: {
          user: { id: "123", name: "Test User", email: "test@example.com" }, // Mock user data
        },
      },
    });
  });

  test("opens the cart modal when the cart button is clicked", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    // Assert that the modal is displayed
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
  });

  test("adds a product to the cart and displays it in the modal", () => {
    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, title: "Product 1", price: 10, quantity: 1 },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    // Assert that the product is displayed in the cart modal
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();

    // Scope the query to the table row for "Product 1"
    const tableRow = screen.getByText(/product 1/i).closest("tr");

    // Target the first occurrence of "$10.00" in the table row (price column)
    const priceColumn = within(tableRow).getAllByText("$10.00")[0];
    expect(priceColumn).toBeInTheDocument();
  });

  test("updates the quantity of a product in the cart", () => {
    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, title: "Product 1", price: 10, quantity: 1 },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    // Scope the query to the table row for "Product 1"
    const tableRow = screen.getByText(/product 1/i).closest("tr");

    // Simulate changing the quantity within the scoped table row
    const quantityInput = within(tableRow).getByDisplayValue("1");
    fireEvent.change(quantityInput, { target: { value: "2" } });

    // Assert that the quantity input value updates
    expect(quantityInput.value).toBe("2");

    // Assert that the total price updates within the same table row
    const totalPrice = within(tableRow).getAllByText("$20.00")[0];
    expect(totalPrice).toBeInTheDocument();
  });

  test("removes a product from the cart", () => {
    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, title: "Product 1", price: 10, quantity: 1 },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Simulate clicking the cart button
    const cartButton = screen.getByRole("button");
    fireEvent.click(cartButton);

    // Scope the query to the table row for "Product 1"
    const tableRow = screen.getByText(/product 1/i).closest("tr");

    // Simulate clicking the "Remove" button within the scoped table row
    const removeButton = within(tableRow).getByText(/remove/i);
    fireEvent.click(removeButton);

    // Assert that the product is removed
    expect(screen.queryByText(/product 1/i)).not.toBeInTheDocument();
  });
});