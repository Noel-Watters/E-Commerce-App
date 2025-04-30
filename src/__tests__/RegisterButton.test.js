import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterButton from "../components/RegisterButton";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RegisterButton Component", () => {
  test("navigates to /register on button click", () => {
    const { getByText } = render(<RegisterButton />);

    // Find the button and simulate a click
    const button = getByText(/register/i);
    fireEvent.click(button);

    // Assert that useNavigate was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});