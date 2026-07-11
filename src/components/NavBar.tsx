import {Link, useLocation, useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const isActive = (path: string) =>
        location.pathname === path ? "btn btn-primary" : "btn btn-ghost";

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link to= {token ? "/animes" : "/login"} className="text-2xl font-bold">
                    TechStore
                </Link>
            </div>
            <div className="flex-none gap-2">
                {token ? (
                    <>
                        <Link to="/animes" className={isActive("/animes")}>
                            Animes
                        </Link>
                        <button onClick={handleLogout} className="btn btn-error">
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={isActive("/login")}>
                            Login
                        </Link>
                        <Link to="/register" className={isActive("/register")}>
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavBar;