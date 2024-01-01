import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Balita from '../../assets/balita.png'
import { Image } from 'react-bootstrap'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Chat from '../../component/chat'

const imunisasi = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleGenderChange = (e) => {
      setGender(e.target.value);
  };




const handleSelectChange = (event) => {
  setSelectedOption(event.target.value);
};


useEffect(() => {
  getToken();
}, []);
  
  const getToken = async() => {
    try {
      const response = localStorage.getItem("accessToken");
      setToken(response);
      const decoded = jwtDecode(response);
      console.log(decoded.name)
      setUsername(decoded.name);
    } catch (error) {
      
    }
  }
  

  const postData = async (e) => {
      e.preventDefault();
      try {
        const answer = window.confirm("Apakah kamu yakin mengirimkan data ini?");
        if (answer) {
          const response = await axios.post('http://localhost:3000/kunjungan', {
              name: name,
              activity: selectedOption,
              dob : dob,
              gender : gender
          });
          if (response.status === 200) navigate("/growcheck");
          console.log("data berhasil tersimpan");
        } else {
          navigate("/imunisasi")
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
      <Chat />
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
              <h3>Kunjungan Posyandu</h3>
            </div>
            <form onSubmit={postData}>
              <div className='row'>
                
                <div className='col-md-12'>
                  <div className="form-group py-2">
                    <label htmlFor="name" className='fw-bold'>Nama Lengkap Anak: *</label>
                    <input type="name" className="form-control" id="name" aria-describedby="name" placeholder="Masukkan Nama Lengkap Anak" value={name} required onChange={(e) => setName(e.target.value)} style={{
                      border: "3px solid rgba(255, 155, 80, 0.98)",
                    }} />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="form-group py-2">
                    <label htmlFor="activity" className='fw-bold'>Pilih Kegiatan: *</label>
                    <select className="form-select" aria-label="Default select example"
                      id="selectOption"
                      name="selectOption"
                      value={selectedOption}
                      onChange={handleSelectChange} style={{
                      border: "3px solid rgba(255, 155, 80, 0.98)",
                    }}>
                      <option defaultValue>Pilih Kegiatan</option>
                      <option value="Imunisasi">Imunisasi</option>
                      <option value="Vaksin">Vaksin</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="form-group py-2">
                    <label htmlFor="dob" className='fw-bold'>Tanggal Lahir Anak: *</label>
                    <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Usia" value={dob} required onChange={(e) => setDob(e.target.value)} style={{
                      border: "3px solid rgba(255, 155, 80, 0.98)",
                    }} />
                  </div>
                </div>
                <div className='col-md-12 d-flex align-items-center justify-content-center pt-4' style={{
                  gap: "20px",
                }}>
                  <label htmlFor="gender" className='fw-bold'>Jenis Kelamin Anak: *</label>
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

export default imunisasi