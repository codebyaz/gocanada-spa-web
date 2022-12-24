import { Container, Form } from 'react-bootstrap';

import headerLogo from '/src/assets/header-logo.svg'
import styles from './Header.module.css';

export function Header() {
    return (
        <header className={"p-3 mb-3 border-bottom bg-light"}>
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        <img src={headerLogo} className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap" />
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="#" className="nav-link px-2 text-dark">Simulations</a></li>
                        <li><a href="#" className="nav-link px-2 text-dark">Draws</a></li>
                        <li><a href="#" className="nav-link px-2 text-dark">FAQs</a></li>
                        <li><a href="#" className="nav-link px-2 text-dark">About</a></li>
                    </ul>

                    <div className="text-end">
                        <button type="button" className="btn btn-outline-primary me-2 btn-theme-primary">Login</button>
                        <button type="button" className="btn btn-danger">Sign-up</button>
                    </div>
                </div>
            </Container>
        </header >
    )
}