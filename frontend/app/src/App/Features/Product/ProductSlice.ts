import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface, ProductStateInterface } from "./interface";

const initialState: ProductStateInterface = {
    items: [],
    error: '',
    success: '',
    count: 0
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state: ProductStateInterface, action: PayloadAction<ProductInterface>) => {
            state.items.push(action.payload);
        },
        addListProduct: (state: ProductStateInterface, action: PayloadAction<ProductInterface[]>) => {
            state.items = action.payload;
        },
        deleteProduct: (state: ProductStateInterface, action: PayloadAction<{id: number}>) => {
            state.items.filter((item) => item.id !== action.payload.id);
        },
        setCountProduct: (state: ProductStateInterface, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        setErrorProduct: (state: ProductStateInterface, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.success = ''
        },
        setSuccessProduct: (state: ProductStateInterface, action: PayloadAction<string>) => {
            state.success = action.payload;
            state.error = ''
        },
        setProductSelected: (state: ProductStateInterface, action: PayloadAction<{id: number; action: 'DELETE'}>) => {
            if (action.payload.action === 'DELETE') {
                state.delete = {
                    id: action.payload.id,
                    open: true,
                }
            }
        },
        setProductUnselected: (state: ProductStateInterface) => {
            state.delete = undefined;
        }
    }
});

export const { 
    addProduct, 
    deleteProduct,
    setErrorProduct, 
    setSuccessProduct, 
    addListProduct, 
    setCountProduct,
    setProductSelected,
    setProductUnselected
} = productsSlice.actions;

export default productsSlice.reducer;