import { createSlice } from '@reduxjs/toolkit';

// Initial state with sample products (simulating a database)
const initialState = {
  products: [
    {
      id: '123456',
      name: 'Example Product',
      price: 9.99,
      description: 'This is an example product.',
      catalogs: ['catalog1', 'catalog2'],
    },
    {
      id: '789012',
      name: 'Another Product',
      price: 19.99,
      description: 'This is another example product.',
      catalogs: ['catalog3', 'catalog4'],
    },
  ],
  cartItems: [], // Array to store cart items
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addToCart, addProductStart, addProductSuccess, addProductFailure } = cartSlice.actions;

// Async action creator using Redux Thunk to simulate adding a product (e.g., via API)
export const addNewProduct = (product) => async (dispatch) => {
  try {
    dispatch(addProductStart());
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Generate a unique ID (in a real app, this would come from the backend)
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    dispatch(addProductSuccess(newProduct));
  } catch (error) {
    dispatch(addProductFailure(error.message));
  }
};

export default cartSlice.reducer;