import React, { createContext, useReducer } from 'react';

export type cartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

type ShoppingContextType = {
  items: cartItem[];
  addItem: (item: cartItem) => void;
  removeItem: (id: string) => void;
};

type cartItemsType = {
  items: cartItem[];
};

type CartActionType =
  | { type: 'ADD_ITEM'; payload: { item: cartItem } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } };

type CartContextProviderProps = {
  children: React.ReactNode;
};

const initialState: cartItemsType = {
  items: [],
};

export const CartContext = createContext<ShoppingContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

const cartReducer = (state: cartItemsType, action: CartActionType) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.item.id);
      const updatedItems = [...state.items];
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.payload.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case 'REMOVE_ITEM': {
      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      const existingCartItem = state.items[existingCartItemIndex];

      const updatedItems = [...state.items];
      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems };
    }

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: cartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: { item } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const cartContextValue = { items: state.items, addItem, removeItem };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
