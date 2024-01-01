import { Routes, Route, useNavigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import Home from "../views/guest/home"
import Growcheck from "../views/guest/growcheck"
import Medisync from "../views/guest/medisnyc"
import Imunisasi from "../views/guest/imunisasi"
import Artikel from "../views/guest/artikel"
import Profile from "../views/guest/profile"
import Edit from "../views/guest/editProfile"
import Login from "../views/auth/login"
import Register from "../views/auth/register"
import Dashboard from "../views/admin/dashboard"
import Datagrow from "../views/admin/datagrow"
import Editgrow from "../views/admin/editGrow"
import Datakonsultasi from "../views/admin/datakonsultasi"
import Payment from "../views/guest/payment"
import NotFound from "../views/page404";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminRoutes from "./AdminRoutes";


const Routing = () => {
    const [admin, setAdmin] = useState(""); // Updated to a boolean
    const accessToken = localStorage.getItem("accessToken");
    const isLoggin = accessToken === null ? false : true;
    const isAdmin = admin === "user" ? false : true;


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:3000/adminVerify');
                setAdmin(response.data.role); 
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };
        checkLoginStatus();
    });

    return (
        <Routes>
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/artikel" element={<Artikel />} />
                <Route element={<PublicRoutes isLoggin={isLoggin}/>}>
                    <Route path="auth" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/" element={<AdminRoutes isLogin={isLoggin} isAdmin={isAdmin} />} >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="/datagrow" element={<Datagrow />} />
                    <Route path="/editgrow/:id" element={<Editgrow />} />
                    <Route path="/datakonsultasi" element={<Datakonsultasi />} />
                </Route>
                <Route path="/" element={<AuthRoutes isLoggin={isLoggin}/>} >
                    <Route path="profile" element={<Profile />} />
                    <Route path="growcheck" element={<Growcheck />} />
                    <Route path="medisnyc" element={<Medisync />} />
                    <Route path="imunisasi" element={<Imunisasi />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="edit" element={<Edit />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default Routing;