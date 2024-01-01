import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const token = localStorage.getItem("accessToken");
    const isLoggin = token === null ? false : true;
    const [admin, setAdmin] = useState("");


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:3000/adminVerify');
                if(response.data.role === "admin") {
                    setAdmin("Admin");
                } else {
                    setAdmin("");
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };
        checkLoginStatus();
    });

    return (
        <>
            <nav className="navbar navbar-expand-sm" style={{ backgroundColor: "#E6E6E6" }}>
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="/"><span className='fw-bold' style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif" }}>Child<strong><span style={{ color: "rgb(255, 155, 80)", fontWeight: "700" }}>PRO</span></strong></span></a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div id="navcol-1" className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><a className="nav-link" href="/" style={{ fontFamily: "Poppins, sans-serif" }}>Beranda</a></li>
                            <li className="nav-item"><a className="nav-link" href="/growcheck" style={{ fontFamily: "Poppins, sans-serif" }}>Growcheck</a></li>
                            <li className="nav-item"><a className="nav-link" href="/medisnyc" style={{ fontFamily: "Poppins, sans-serif" }}>Medisnyc</a></li>
                            <li className="nav-item"><a className="nav-link" href="/artikel" style={{ fontFamily: "Poppins, sans-serif" }}>Artikel</a></li>
                            <li className="nav-item"><a className="nav-link" href="/dashboard" style={{ fontFamily: "Poppins, sans-serif" }}>{admin}</a></li>
                        </ul><a href={isLoggin ? "/profile" : "/register"} className="btn btn-primary border-0">{isLoggin ? "Profile" : "Register"}</a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar