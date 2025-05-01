// ProductManagementPage.tsx
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Product } from "../types/types";
import Button from "react-bootstrap/Button";
import NavBar from "../components/NavBar";
import ProductModal from "../components/ProductModal";
import ProductTable from "../components/ProductTable";

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products and categories from Firestore
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);

        const uniqueCategories = Array.from(
          new Set(productsData.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products or categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct({
      id: "",
      title: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSave = async (product: Product) => {
    try {
      if (product.id) {
        const productDocRef = doc(db, "products", product.id);
        await setDoc(productDocRef, product);
        alert("Product updated successfully!");
      } else {
        const productsCollection = collection(db, "products");
        const newProductRef = await addDoc(productsCollection, product);
        const newProduct = { ...product, id: newProductRef.id };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        alert("Product added successfully!");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        const productDocRef = doc(db, "products", productId);
        await deleteDoc(productDocRef);
        setProducts(products.filter((product) => product.id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h1>Product Management</h1>
        <Button variant="success" className="mb-3" onClick={handleAddProduct}>
          Add Product
        </Button>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ProductModal
          show={showModal}
          onHide={() => setShowModal(false)}
          product={selectedProduct}
          categories={categories}
          onSave={handleSave}
        />
      </div>
    </>
  );
};

export default ProductManagementPage;