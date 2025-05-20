import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";

// Mock Firebase modules
jest.mock("firebase/auth");
jest.mock("firebase/firestore");

const mockStore = configureStore([]);
const store = mockStore({ user: {} });

describe("GoogleSignInButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call signInWithPopup and create user in Firestore if not exists", async () => {
    const mockUser = {
      uid: "testuid",
      email: "testuser@gmail.com",
      displayName: "Test User",
    };
    const mockUserDoc = { exists: () => false };
    (firebaseAuth.signInWithPopup).mockResolvedValue({ user: mockUser });
    (firestore.doc).mockReturnValue("userDocRef");
    (firestore.getDoc).mockResolvedValue(mockUserDoc);
    (firestore.setDoc).mockResolvedValue(undefined);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GoogleSignInButton />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole("button", { name: /login with google/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(firebaseAuth.signInWithPopup).toHaveBeenCalled();
      expect(firestore.setDoc).toHaveBeenCalledWith(
        "userDocRef",
        expect.objectContaining({
          id: mockUser.uid,
          email: mockUser.email,
          name: mockUser.displayName,
          admin: false,
        })
      );
    });
  });

  it("should not call setDoc if user already exists in Firestore", async () => {
    const mockUser = {
      uid: "testuid",
      email: "testuser@gmail.com",
      displayName: "Test User",
    };
    const mockUserDoc = { exists: () => true, data: () => ({ name: "Test User", admin: false }) };
    (firebaseAuth.signInWithPopup).mockResolvedValue({ user: mockUser });
    (firestore.doc).mockReturnValue("userDocRef");
    (firestore.getDoc).mockResolvedValue(mockUserDoc);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GoogleSignInButton />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole("button", { name: /login with google/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(firebaseAuth.signInWithPopup).toHaveBeenCalled();
      expect(firestore.setDoc).not.toHaveBeenCalled();
    });
  });
});