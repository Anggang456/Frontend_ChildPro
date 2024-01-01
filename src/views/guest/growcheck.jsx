import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Balita from '../../assets/balita.png'
import { Image } from 'react-bootstrap'
import Chat from '../../component/chat'
import axios from 'axios'

const growcheck = () => {

  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/growcheck', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
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
            <div className="col-sm-12 col-md-12 col-lg-5">
              <h1 className='text-dark fw-bold' style={{
                fontSize: "48px",
                fontFamily: "Poppins"
              }}>Child<strong style={{ color: "#FF9B50" }}>Pro</strong></h1>
              <p className='text-dark' style={{
                fontFamily: "Poppins",
                fontSize: "48px",
                fontStyle: "normal",
              }}>Bersama Kami Ikuti Pertumbuhanya anak anda.</p>
              <div className='d-flex' style={{gap:"15px"}}>
                <a href='/imunisasi' className='btn btn-lg btn-primary border-0 rounded-2'>Kunjungan Posyandu</a>
                <a href='/medisnyc' className='btn btn-lg btn-primary border-0 rounded-2'>Konsultasi</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {data.map(data => (
      <section className='py-4'>
      
        <div className='row justify-content-center'>
          <div className='d-flex justify-content-center py-4'>
            <h3 className='text-dark'>Status Pertumbuhan</h3>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center">
            <Image src={Balita} />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5 d-flex justify-content-center">
            <div className='container' style={{
              border: "3px solid #FF9B50",
              borderRadius: "15px",
              height:"340px",
              background: "#FEEFD0",
              
            }}>
              <div>
                <h4 className='d-flex justify-content-center fw-bold p-4 text-dark'>Status Pertumbuhan</h4>
              </div>
              <div>
                <table className='mb-3 text-dark' style={{ width: "100%" }}>
                  <tbody>
                  <tr>
                    <th style={{fontSize: "18px",fontFamily: "Poppins",}}>Nama</th>
                    <td style={{textAlign:"end"}}>{data.name}</td>
                  </tr>
                  <tr>
                    <th style={{fontSize: "18px",fontFamily: "Poppins",}}>Tanggal Lahir</th>
                    <td style={{textAlign:"end"}}>{data.dob}</td>
                  </tr>
                  <tr>
                    <th style={{fontSize: "18px",fontFamily: "Poppins",}}>Jenis Kelamin</th>
                    <td style={{textAlign:"end"}}>{data.gender}</td>
                  </tr>
                  <tr>
                    <th style={{fontSize: "18px",fontFamily: "Poppins",}}>Berat</th>
                    <td style={{textAlign:"end"}}>{data.weight}</td>
                  </tr>
                  <tr>
                    <th style={{fontSize: "18px",fontFamily: "Poppins",}}>Tinggi</th>
                    <td style={{textAlign:"end"}}>{data.height}</td>
                  </tr>
                  <tr>
                    <th style={{fontSize: "18px",fontFamily: "Poppins",}}>Lingkas Kepala</th>
                    <td style={{textAlign:"end"}}>{data.head}</td>
                  </tr>
                  </tbody>
                </table>
                <div className='container rounded-2 px-2 py-1' style={{backgroundColor:"#FF9B50"}}>
                  <h5 className='text-white' style={{textAlign:"center"}}>{data.status ?? 'Tunggu Update Ya!' }</h5>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
          ))}
      <Footer />
    </>
  )
}

export default growcheck