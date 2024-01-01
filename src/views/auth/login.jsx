import React, { useState, useEffect } from 'react'
import Balita from '../../assets/balita.png'
import { Image } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Navbar from '../../component/Navbar'

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      });
      if (response.role === "admin") {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate("/dashboard")
      } else {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate("/")
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else if (error.request) {
        console.error('No response received from the server.');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };


  return (
    <>
      <Navbar />
      <section className='py-5'>
        <div className="container pt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-8 col-md-8 col-lg-4 justify-content-center">
              <Image src={Balita} />
            </div>
            <div className="col-sm-8 col-md-8 col-lg-7 d-flex align-items-center text-dark">
              <div className='container rounded-4 p-4' style={{
                border: "3px solid rgba(255, 155, 80, 0.98)",
              }}>
                <div className='d-flex justify-content-center'><strong className='text-danger'>{msg}</strong></div>
                <h4 style={{ fontFamily: "Poppins" }}><strong>Masuk Ke Akun Anda</strong></h4>
                <span style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}>Masukkan Detail Anda Di Bawah</span>
                <form onSubmit={Auth}>
                <div className="form-group py-4">
                  <label className='mb-2' htmlFor="exampleInputEmail1">Nama Pengguna</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required placeholder="Nama Pengguna atau Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label className='mb-2' htmlFor="exampleInputPassword1">Kata Sandi</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Kata Sandi" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                  <a href="#" className='text-dark'>Lupa Kata Sandi?</a>
                </div>
                <button type="submit" className="btn btn-lg border-0 btn-primary mt-4 w-100">Masuk</button>
              </form>
              <div className='d-flex justify-content-center mt-2'>
                <span>Tidak Punya Akun? <a href="/register" className='fw-bold' style={{fontFamily:"Poppins",color:"#FF9D53"}}>Mendaftar</a></span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default login