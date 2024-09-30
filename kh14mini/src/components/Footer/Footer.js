import { NavLink } from 'react-router-dom';

const Footer = () => {

    return (
        <>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Company, Inc</p>

                    <NavLink href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        !!!Hello World!!!(원래는 이미지가 있었음)
                    </NavLink>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-body-secondary" >Home</NavLink></li>
                        <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-body-secondary" >Features</NavLink></li>
                        <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-body-secondary" >Pricing</NavLink></li>
                        <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-body-secondary" >FAQs</NavLink></li>
                        <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-body-secondary" >About</NavLink></li>
                    </ul>
                </footer>
            </div>
        </>
    );
}

export default Footer;