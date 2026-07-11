import {useState} from "react";
import RegisterForm, { register } from "../api/api";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

interface FormState{
    name:string;
    email:string;
    password:string;
}

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function validateInputs(){
        if(!form.name || !form.email || !form.password){
            throw new Error("Todo campo es obligatorio");
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        try {
            validateInputs();
            setLoading(true);
            await register(form);
            setSuccess(true);
            setTimeout(() => {navigate("/login");}, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? "Error al registrar user");
            } else if (error instanceof Error) {
                setError(error.message);
            }
        } finally{setLoading(false);}
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="card w-full max-w-md bg-base-100 shadow-xl">
                        Crear Cuenta
                    </h2>
                    {error &&
                    <div className="alert alert-error">
                        <span>{error}</span>
                    </div>}
                    {success &&
                    <div className="alert alert-success">
                        <span>Registro exitoso! Redirigiendo a login...</span>
                    </div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Nombre</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Nombre"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
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
                                value={form.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Registrando..." : "Crear Cuenta"}
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="link link-primary">
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;