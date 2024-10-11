import {Link, Form, useActionData, ActionFunctionArgs, redirect} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {addProduct} from "../services/ProductService";

export async function action({request}: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let error = '';

    if (Object.values(data).includes('')) {
        error = 'All fields are required';
        return error;
    }

    await addProduct(data);

    return redirect('/');
}

export default function NewProduct() {
    const error = useActionData() as String;

    return (
        <>
            <div className={"flex justify-between"}>
                <h2 className={"text-4xl font-black text-slate-500"}>Add Product</h2>

                <Link
                    className={"rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"}
                    to={"/"}>Back to products</Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method={"POST"}
            >

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Name:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Product's name"
                        name="name"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Price:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Product's price. ex. 200, 300"
                        name="price"
                        step={0.01}
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    );
};
