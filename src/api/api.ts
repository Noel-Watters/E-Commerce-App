import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Product, Category } from "../types/types";

// Fetch products from Firestore
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      price: doc.data().price,
      description: doc.data().description,
      category: doc.data().category,
        image: doc.data().image,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch unique categories from Firestore
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const categories = Array.from(
      new Set(productsSnapshot.docs.map((doc) => doc.data().category))
    );
    return categories as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

