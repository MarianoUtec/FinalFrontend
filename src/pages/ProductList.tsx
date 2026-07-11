import {useEffect, useState} from "react";
import axios from "axios";
import {getProducts, type ProductDTO} from "../api/api";

function ProductList() {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try{
                const response = await getProducts();
                setProducts(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message ?? "No se pudo cargar los productos");
                } else{
                    setError("Error inesperado");
                }
            } finally{
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return (
        <div className="flex justify-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
        </div>);
    } if (error) {
        return(
        <div className="alert alert-error max-w-xl mx-auto mt-6">
            <span>{error}</span>
        </div>);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product.name} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="card-actions justify-end">
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;