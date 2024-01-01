import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Balita from '../../assets/balita.png'
import Image from 'react-bootstrap/esm/Image'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from 'react'

const editProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telp, setTelp] = useState('');
    const [dob, setDob] = useState('');
    const [alamat, setAlamat] = useState('');
    const [gender, setGender] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const answer = window.confirm("Apakah kamu yakin update profile?");
            if (answer) {
                const response = await axios.put('http://localhost:3000/edit', {
                    name: name,
                    email: email,
                    telp: telp,
                    dob: dob,
                    gender: gender,
                    alamat: alamat
                });
                if (response.status === 200) navigate("/profile");
                console.log("data berhasil tersimpan");
            } else {
                navigate("/edit")
                console.log("data gagal disimpan");
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
            <section style={{ background: "#FEEFD0" }}>
                <div className="container d-flex justify-space-between justify-content-center align-items-center align-self-stretch">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center">
                            <Image src={Balita} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-5 text-dark">
                            <h1 style={{
                                fontSize: "48px",
                                fontFamily: "Poppins"
                            }}>Child<strong style={{ color: "#FF9B50" }}>Pro</strong></h1>
                            <p style={{
                                fontFamily: "Poppins",
                                fontSize: "48px",
                                fontStyle: "normal",
                            }}>Bersama Kami Ikuti Pertumbuhanya anak anda.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-4'>
                <div className='container d-flex justify-content-center rounded-2 p-4 text-dark'>
                    <div className='col-md-10 p-4 rounded-2' style={{
                        border: "3px solid rgba(255, 155, 80, 0.98)",
                    }}>
                        <div className='d-flex justify-content-center mb-5'>
                            <h3 className='fw-bold'>Edit Profile</h3>
                        </div>
                        <form onSubmit={postData}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="form-group py-2">
                                        <label htmlFor="username" className='fw-bold'>Nama : *</label>
                                        <input type="name" className="form-control" id="name" aria-describedby="name" placeholder="Nama Pengguna" value={name} required onChange={(e) => setName(e.target.value)} style={{
                                            border: "3px solid rgba(255, 155, 80, 0.98)",
                                        }} />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group py-2">
                                        <label htmlFor="email" className='fw-bold'>Email: *</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Email" style={{
                                            border: "3px solid rgba(255, 155, 80, 0.98)",
                                        }} />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-group py-2">
                                        <label htmlFor="dob" className='fw-bold'>Tanggal Lahir: *</label>
                                        <input type="date" className="form-control" id="dob" aria-describedby="dob" placeholder="Tanggal Lahir" value={dob} required onChange={(e) => setDob(e.target.value)} style={{
                                            border: "3px solid rgba(255, 155, 80, 0.98)",
                                        }} />
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className="form-group py-2">
                                        <label htmlFor="telp" className='fw-bold'>No Telp: *</label>
                                        <input type="text" className="form-control" id="telp" aria-describedby="telp" placeholder="Masukkan No Telp" value={telp} required onChange={(e) => setTelp(e.target.value)} style={{
                                            border: "3px solid rgba(255, 155, 80, 0.98)",
                                        }} />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-group py-2">
                                        <label htmlFor="alamat" className='fw-bold'>Alamat: *</label>
                                        <input type="text" className="form-control" id="alamat" aria-describedby="alamat" placeholder="Masukkan Alamat" value={alamat} required onChange={(e) => setAlamat(e.target.value)} style={{
                                            border: "3px solid rgba(255, 155, 80, 0.98)",
                                        }} />
                                    </div>
                                </div>
                                <div className='col-md-12 d-flex justify-content-center align-items-center pt-4' style={{
                                    gap: "20px",
                                }}>
                                    <label htmlFor="gender" className='fw-bold'>Jenis Kelamin: *</label>
                                    <label>
                                        <input required
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={handleGenderChange}
                                        />
                                        <span className='px-1'>Laki Laki</span>
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={handleGenderChange}
                                        />
                                        <span className='px-1'>Perempuan</span>
                                    </label>
                                </div>
                                <div className='col-md-12 pt-4'>
                                    <button className='btn btn-lg btn-primary border-0 w-100'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default editProfile