import { Link } from "react-router-dom"

export const Navbar = () =>{

    return(
    <div className="navbar-container">
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" typeof="" to={""}>Book store with Java</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <p>
                    <a className="btn btn-outline-dark">jobs</a>
                    <Link className="btn btn-outline-dark" to={"departments"}>departments</Link>
                    <a className="btn btn-outline-dark">register</a>
                    <a className="btn btn-outline-dark">login</a>
                    <a className="btn btn-outline-dark">logout</a>
                </p>
                
                
            </div>
        </nav>
        </div>
    )
}