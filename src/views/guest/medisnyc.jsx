import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Image from 'react-bootstrap/esm/Image'
import Balita from '../../assets/balita.png'
import Chat from '../../component/chat'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const medisnyc = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState([]);
  const [head, setHead] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/konsultasi', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (!response.data || response.data === null) {
        navigate("/")
      } else {
        setData(response.data);
        setHead("Rekomendasi Bidan");
      }

    } catch (error) {
      setMsg("Kamu Belum menyelesaikan Konsultasi")
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleConsultationClick = async (id, image, name, spesialis, experience, percentage, price) => {
    try {
      const response = await axios.post('http://localhost:3000/postPayment', {
        midwifeId: id,
        image: image,
        name: name,
        spesialis: spesialis,
        experience: experience,
        percentage: percentage,
        price: price
      });
      if (response.status === 200) {
        navigate("/payment");
      }
    } catch (error) {

    }
  };

  const alert = () => {
    if (!head || head === null) {
      return (
        <div class="alert alert-danger" role="alert">
          {msg}
        </div>
      )
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
              <div className='d-flex' style={{ gap: "15px" }}>
                <a href='/imunisasi' className='btn btn-lg btn-primary border-0 rounded-2'>Kunjungan Posyandu</a>
                <a href='/growcheck' className='btn btn-lg btn-primary border-0 rounded-2'>Pertumbuhan Anak</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {alert}
      </section>
      <section className='py-4' style={{ fontFamily: "Poppins" }}>
        <div className='d-flex justify-content-center'>
          <h3 className='text-dark'>{head}</h3>
        </div>
        <div className="container-fluid mt-4">
          <div className="row d-flex justify-content-center" style={{ gap: "20px" }}>
            {data.map(data => (
              <div key={data.id} className="col-md-5 rounded-2 p-2 d-flex" style={{
                border: "2px solid #FF9B50",
                gap: "10px"
              }}>
                <div className='col'>
                  <img src={data.user.image} className='rounded-2 recomended' width={300} height={320} alt="" />
                </div>
                <div className='col'>
                  <h4 className='fw-bold text-dark'>
                    Bidan {data.user.name}
                  </h4>
                  <span className='text-dark'>{data.spesialis}</span>
                  <div className='d-flex sm-pt-0 md-pt-4 pt-lg-4' style={{ gap: "5px" }}>
                    <div className='d-flex align-items-center justify-content-center rounded-2 p-2' style={{
                      background: "#FF9B50",
                    }}>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M2 19.5C1.45 19.5 0.979001 19.304 0.587001 18.912C0.195002 18.52 -0.000664969 18.0493 1.69779e-06 17.5V6.5C1.69779e-06 5.95 0.196002 5.479 0.588002 5.087C0.980002 4.695 1.45067 4.49933 2 4.5H6V2.5C6 1.95 6.196 1.479 6.588 1.087C6.98 0.695002 7.45067 0.499335 8 0.500002H12C12.55 0.500002 13.021 0.696002 13.413 1.088C13.805 1.48 14.0007 1.95067 14 2.5V4.5H18C18.55 4.5 19.021 4.696 19.413 5.088C19.805 5.48 20.0007 5.95067 20 6.5V17.5C20 18.05 19.804 18.521 19.412 18.913C19.02 19.305 18.5493 19.5007 18 19.5H2ZM8 4.5H12V2.5H8V4.5Z" fill="white" />
                        </svg>
                      </i><span className='text-white px-2'>{data.experience} Tahun</span>
                    </div>
                    <div className='d-flex align-items-center justify-content-center rounded-2 p-2' style={{
                      background: "#FF9B50",
                    }}>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M0 9.64815H3.57143V19.5H0V9.64815ZM15 19.5H5V9.08307L7.17286 5.87207L7.77643 1.70826C7.82649 1.3735 7.99671 1.06751 8.2562 0.845819C8.51569 0.624131 8.84725 0.501436 9.19071 0.5H9.28571C9.85386 0.500559 10.3986 0.723158 10.8003 1.11895C11.2021 1.51474 11.428 2.05138 11.4286 2.61111V6.83333H17.1429C17.9003 6.83426 18.6265 7.13112 19.1621 7.6588C19.6977 8.18648 19.9991 8.9019 20 9.64815V14.5741C19.9985 15.8801 19.4712 17.1321 18.5339 18.0556C17.5965 18.9791 16.3256 19.4985 15 19.5Z" fill="white" />
                        </svg>
                      </i><span className='text-white px-2'>{data.percentage}%</span>
                    </div>
                  </div>
                  <div className='d-flex pt-4 mb-sm-0 mb-md-1 mb-lg-1'>
                    <h2 className='fw-bold text-dark'>Rp. {data.price}</h2>
                    <span className='px-2'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6474 1.49797C12.0694 1.02666 12.586 0.649645 13.1636 0.391529C13.7411 0.133412 14.3666 0 14.9993 0C15.6319 0 16.2574 0.133412 16.8349 0.391529C17.4125 0.649645 17.9291 1.02666 18.3511 1.49797L19.4009 2.67079C19.551 2.83862 19.7368 2.97053 19.9448 3.05672C20.1527 3.14292 20.3774 3.18119 20.6022 3.16871L22.1769 3.08172C22.8084 3.04704 23.44 3.14587 24.0307 3.37177C24.6214 3.59768 25.1578 3.94557 25.605 4.39276C26.0522 4.83995 26.4001 5.3764 26.626 5.9671C26.8519 6.55781 26.9507 7.1895 26.916 7.82097L26.829 9.39572C26.8168 9.62024 26.8552 9.84465 26.9414 10.0523C27.0275 10.26 27.1593 10.4457 27.327 10.5955L28.5012 11.6454C28.9728 12.0674 29.35 12.5841 29.6083 13.1618C29.8665 13.7396 30 14.3653 30 14.9981C30 15.6309 29.8665 16.2566 29.6083 16.8343C29.35 17.412 28.9728 17.9288 28.5012 18.3508L27.327 19.4006C27.1591 19.5507 27.0272 19.7366 26.941 19.9445C26.8548 20.1525 26.8166 20.3772 26.829 20.6019L26.916 22.1767C26.9507 22.8082 26.8519 23.4399 26.626 24.0306C26.4001 24.6213 26.0522 25.1577 25.605 25.6049C25.1578 26.0521 24.6214 26.4 24.0307 26.6259C23.44 26.8518 22.8084 26.9506 22.1769 26.9159L20.6022 26.829C20.3777 26.8167 20.1533 26.8551 19.9456 26.9413C19.7379 27.0275 19.5523 27.1592 19.4024 27.3269L18.3526 28.5012C17.9306 28.9727 17.4139 29.35 16.8362 29.6082C16.2585 29.8665 15.6328 30 15 30C14.3672 30 13.7415 29.8665 13.1638 29.6082C12.5861 29.35 12.0694 28.9727 11.6474 28.5012L10.5976 27.3269C10.4475 27.159 10.2617 27.0271 10.0537 26.9409C9.84575 26.8547 9.62106 26.8165 9.39629 26.829L7.82159 26.9159C7.19013 26.9506 6.55846 26.8518 5.96777 26.6259C5.37709 26.4 4.84066 26.0521 4.39348 25.6049C3.9463 25.1577 3.59841 24.6213 3.37252 24.0306C3.14662 23.4399 3.04779 22.8082 3.08247 22.1767L3.16946 20.6019C3.18171 20.3774 3.14333 20.153 3.05714 19.9453C2.97095 19.7376 2.83917 19.552 2.67155 19.4021L1.49877 18.3523C1.02722 17.9303 0.650005 17.4135 0.391747 16.8358C0.133488 16.2581 0 15.6324 0 14.9996C0 14.3668 0.133488 13.7411 0.391747 13.1633C0.650005 12.5856 1.02722 12.0689 1.49877 11.6469L2.67155 10.597C2.83938 10.447 2.97128 10.2611 3.05747 10.0531C3.14367 9.84519 3.18194 9.62049 3.16946 9.39572L3.08247 7.82097C3.04779 7.1895 3.14662 6.55781 3.37252 5.9671C3.59841 5.3764 3.9463 4.83995 4.39348 4.39276C4.84066 3.94557 5.37709 3.59768 5.96777 3.37177C6.55846 3.14587 7.19013 3.04704 7.82159 3.08172L9.39629 3.16871C9.62081 3.18096 9.84521 3.14258 10.0529 3.05639C10.2606 2.9702 10.4462 2.83842 10.5961 2.67079L11.6459 1.49797H11.6474ZM20.5587 9.43921C20.8399 9.72046 20.9978 10.1019 20.9978 10.4995C20.9978 10.8972 20.8399 11.2786 20.5587 11.5599L11.5604 20.5585C11.2775 20.8316 10.8987 20.9828 10.5055 20.9794C10.1123 20.976 9.73612 20.8182 9.45806 20.5402C9.18 20.2621 9.02227 19.886 9.01885 19.4927C9.01544 19.0995 9.1666 18.7206 9.43979 18.4378L18.4381 9.43921C18.7193 9.15805 19.1007 9.0001 19.4984 9.0001C19.8961 9.0001 20.2775 9.15805 20.5587 9.43921ZM11.2499 8.99978C10.6533 8.99978 10.0811 9.2368 9.65926 9.65869C9.23738 10.0806 9.00037 10.6528 9.00037 11.2494V11.2644C9.00037 11.8611 9.23738 12.4333 9.65926 12.8552C10.0811 13.2771 10.6533 13.5141 11.2499 13.5141H11.2649C11.8616 13.5141 12.4338 13.2771 12.8556 12.8552C13.2775 12.4333 13.5145 11.8611 13.5145 11.2644V11.2494C13.5145 10.6528 13.2775 10.0806 12.8556 9.65869C12.4338 9.2368 11.8616 8.99978 11.2649 8.99978H11.2499ZM18.7486 16.4986C18.1519 16.4986 17.5797 16.7356 17.1579 17.1575C16.736 17.5794 16.499 18.1516 16.499 18.7482V18.7632C16.499 19.3599 16.736 19.9321 17.1579 20.354C17.5797 20.7759 18.1519 21.0129 18.7486 21.0129H18.7635C19.3602 21.0129 19.9324 20.7759 20.3542 20.354C20.7761 19.9321 21.0131 19.3599 21.0131 18.7632V18.7482C21.0131 18.1516 20.7761 17.5794 20.3542 17.1575C19.9324 16.7356 19.3602 16.4986 18.7635 16.4986H18.7486Z" fill="#1E1E1E" />
                    </svg></span>
                  </div>
                  <div className='pt-sm-0 pt-md-4 lg-pt-4'>
                    <button onClick={() => handleConsultationClick(data.id, data.user.image, data.user.name, data.spesialis, data.experience, data.percentage, data.price)} className='btn btn-lg btn-primary border-0 w-100'>Konsultasi</button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default medisnyc