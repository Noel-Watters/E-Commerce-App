
export interface Product {
    id: string; // Use number or string based on your database ID type
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity?: number;

}

export interface Rating {
    rate: number;
    count: number;
}


export type Category = string;

export interface User {
    id?: string;
    name: string;
    email: string;
}

export interface OrderItem {
    title: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    orderDate: string;
    items: OrderItem[];
  }

  export interface EditProfileProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
    setUser: (updatedUser: User) => void;
    
  }
  