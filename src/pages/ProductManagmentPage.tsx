import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Product } from "../types/types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NavBar from "../components/NavBar";

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // State for categories
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products and categories from Firestore
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch products
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);

        // Fetch unique categories
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

  // Handle Add Product Button Click
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

  // Handle Edit Button Click
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle Save Changes
  const handleSave = async () => {
    if (selectedProduct) {
        try {
            if (selectedProduct.id) {
              // Update existing product
              const productDocRef = doc(db, "products", selectedProduct.id);
              await setDoc(productDocRef, selectedProduct);
              alert("Product updated successfully!");
            } else {
              // Add new product
              const productsCollection = collection(db, "products");
              const newProductRef = await addDoc(productsCollection, {
                title: selectedProduct.title,
                price: selectedProduct.price,
                category: selectedProduct.category,
                description: selectedProduct.description,
                image: selectedProduct.image,
              });
      
              // Add the generated Firestore ID to the product
              const newProduct = { ...selectedProduct, id: newProductRef.id };
      
              // Update the Firestore document with the generated ID
              const productDocRef = doc(db, "products", newProductRef.id);
              await setDoc(productDocRef, newProduct);
      
              // Update the state with the new product
              setProducts((prevProducts) => [...prevProducts, newProduct]);
              alert("Product added successfully!");
            }
            setShowModal(false);
          } catch (error) {
            console.error("Error saving product:", error);
          }
        }
      };

  // Handle Delete Button Click
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Edit/Add Product Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.id ? "Edit Product" : "Add Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Form>
                <Form.Group controlId="productTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.title}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="productPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="productCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={selectedProduct.category}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="productImage">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.image}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        image: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ProductManagementPage;