import {useState} from "react";
import { login } from "../api/api";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        if(!email || !password){
            setError("Todos los campos se llenan");
            return;
        }
        try{
            setLoading(true);
            const response = await login(email, password);
            localStorage.setItem("token", response.data.token);
            navigate("/animes");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? "Credenciales incorrectas");
            } else{ setError("Ocurrio un problema inesperado");}
        } finally{
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="card w-full max-w-md bg-base-100 shadow-xl">
                        TechStore
                    </h2>
                    <p className="text-center mb-4">
                        Inicia sesión para continuar
                    </p>
                    {error &&
                    <div className="alert alert-error">
                        <span>{error}</span>
                    </div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Iniciando sesión..." : "iniciar Sesión"}
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="link link-primary">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}