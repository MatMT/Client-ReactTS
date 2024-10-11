import {safeParse, parse, string, transform, pipe, number} from "valibot";
import axios from "axios";
import {DraftProductSchema, Product, ProductsSchema, ProductSchema} from "../types";
import {toBoolean} from "../utils";

type ProductData = {
    [p: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price)
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const {data} = await axios(url);
        const result = safeParse(ProductsSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const {data} = await axios(url);
        const result = safeParse(ProductSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        // const NumberSchema = pipe(string(), transform(Number), number());

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            // price: parse(NumberSchema, data.price),
            price: data.price,
            availability: toBoolean(data.availability.toString())
        });

        console.log('result', result);

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        }
    } catch (error) {
        console.log(error)
    }
}