import React, { useState } from 'react'
import Image from 'react-bootstrap/esm/Image'
import Balita from '../../assets/balita.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Navbar from '../../component/Navbar'

const register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        name: name,
        email: email,
        telp : telp,
        password: password,
        confirm: confirm
      });
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
  
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

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
                <form onSubmit={Register}>
                  <div className="form-group mb-3 mt-3">
                    <label className='mb-2' htmlFor="exampleInputEmail1">Name</label>
                    <input type="name" value={name} required className="form-control" id="name" aria-describedby="emailHelp" placeholder="Masukkan Nama Anda" onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group mb-3">
                    <label className='mb-2' htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" required id="email" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor='kontak' className='mb-2'>Kontak</label>
                    <input type="number" className="form-control" id="kontak" aria-describedby="emailHelp" value={telp} onChange={(e) => setTelp(e.target.value)} placeholder="No. Telp" />
                  </div>
                  <div className="form-group mb-3">
                    <label className='mb-2' htmlFor="katasandi">Kata Sandi</label>
                    <input type="password" className="form-control" id="password" required placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="form-group mb-3">
                    <label className='mb-2' htmlFor="konfirmasi">Konfirmasi Kata Sandi</label>
                    <input type="password" className="form-control" id="password" required placeholder="Konfirmasi Kata Sandi" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                  </div>
                  <button type='submit' className="btn btn-lg border-0 btn-primary mt-4 w-100">Buatkan Akun</button>
                </form>
                <div className='d-flex justify-content-center mt-2'>
                  <span>Punya Akun? <a href="/login" className='fw-bold' style={{ fontFamily: "Poppins", color: "#FF9D53" }}>Masuk</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default register