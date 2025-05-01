// ProductTable.tsx
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Product } from "../types/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
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
                onClick={() => onEdit(product)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(product.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;