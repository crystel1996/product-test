import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface, ProductStateInterface } from "./interface";

const initialState: ProductStateInterface = {
    items: [],
    error: '',
    success: ''
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state: ProductStateInterface, action: PayloadAction<ProductInterface>) => {
            state.items.push(action.payload);
        },
        setErrorProduct: (state: ProductStateInterface, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.success = ''
        },
        setSuccessProduct: (state: ProductStateInterface, action: PayloadAction<string>) => {
            state.success = action.payload;
            state.error = ''
        }
    }
});

export const { addProduct, setErrorProduct, setSuccessProduct } = productsSlice.actions;

export default productsSlice.reducer;