// ProductModal.tsx
import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Product } from "../types/types";

interface ProductModalProps {
  show: boolean;
  onHide: () => void;
  product: Product | null;
  categories: string[];
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  onHide,
  product,
  categories,
  onSave,
}) => {
  const [currentProduct, setCurrentProduct] = React.useState<Product | null>(
    product
  );

  React.useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  const handleSave = () => {
    if (currentProduct) {
      onSave(currentProduct);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{currentProduct?.id ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentProduct && (
          <Form>
            <Form.Group controlId="productTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={currentProduct.category}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
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
                value={currentProduct.description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
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
                value={currentProduct.image}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
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
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;