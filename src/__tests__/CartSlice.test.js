// __tests__/CartSlice.test.js

import cartReducer, {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../redux/slices/CartSlice";

describe("CartSlice", () => {
  test("should add a product to the cart", () => {
    const initialState = { items: [] };
    const product = { id: "1", name: "Product 1", price: 10, quantity: 1 }; 

    const newState = cartReducer(initialState, addToCart(product));

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(product);
  });

  test("should update the quantity of a product in the cart", () => {
    const initialState = {
      items: [{ id: "1", name: "Product 1", price: 10, quantity: 1 }], 
    };

    const newState = cartReducer(
      initialState,
      updateQuantity({ id: "1", quantity: 3 }) 
    );

    expect(newState.items[0].quantity).toBe(3);
  });

  test("should remove a product from the cart", () => {
    const initialState = {
      items: [
        { id: "1", name: "Product 1", price: 10, quantity: 1 }, 
        { id: "2", name: "Product 2", price: 20, quantity: 2 }, 
      ],
    };

    const newState = cartReducer(initialState, removeFromCart("1")); 

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].id).toBe("2"); 
  });

  test("should clear the cart", () => {
    const initialState = {
      items: [
        { id: "1", name: "Product 1", price: 10, quantity: 1 }, 
        { id: "2", name: "Product 2", price: 20, quantity: 2 }, 
      ],
    };

    const newState = cartReducer(initialState, clearCart());

    expect(newState.items).toHaveLength(0);
  });
});