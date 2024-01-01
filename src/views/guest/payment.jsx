import React,{ useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Balita from '../../assets/balita.png'
import Image from 'react-bootstrap/esm/Image'
import { useNavigate } from "react-router-dom";


const payment = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken")
  const [data, setData] = useState([]);
  const deletePayment = async () => {
    try {
      const answer = window.confirm("Apakah kamu yakin Membatalkan Pesanan?");
      if (answer) {
        const response = await axios.delete('http://localhost:3000/deletePayment');
        if (response.status === 200) {
          navigate('/', { replace: true });
        }
      } else {
        navigate('/payment', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deletePaymentCall = useCallback( async () => {
    try {
        const response = await axios.delete('http://localhost:3000/deletePayment');
        if (response.status === 200) {
          navigate('/', { replace: true });
        }
    } catch (error) {
      console.log(error);
    }
  })

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getPayment', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const postData = async (name, price, users_id) => {
    try {
      const response = await axios.post('http://localhost:3000/processPayment', {
        midwife : name,
        price: price,

      });
      window.snap.pay(response.data.token, {
        onSuccess: (result) => {
          console.log(JSON.stringify(result.transaction_status));
          axios.post('http://localhost:3000/updatedPayment', {
            status : "Success",
            token : response.data.token,
            midwife : name,
            users_id : users_id
          });
          deletePaymentCall();
        },
        onPending: (result) => {
          console.log(JSON.stringify(result));
        },
        onError: (error) => {
          console.log(JSON.stringify(error));
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getData();
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransUrl

    const clientKey = "SB-Mid-client-d8KKygIlxas7LqVb";
    scriptTag.setAttribute('data-client-key', clientKey)

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])



  return (
    <>
      <Navbar />
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
            </div>
          </div>
        </div>
      </section>
      
      <section className='py-4'>
        <div className='d-flex justify-content-center mb-3'>
          <h3 className='fw-bold text-dark' style={{ fontFamily: "Poppins" }}>Rician Pembayaran</h3>
        </div>
        {data ? (
        <div className='container rounded-2' style={{
          border: "2px solid #FF9B50",
        }}>
          <div className='row py-2 align-items-center'>
            <div className='col-md-3 d-flex justify-content-center'>
              <img src={data.image} width={300} className='rounded-2' />
            </div>
            <div className='col'>
              <table className='mb-3 text-dark' style={{ width: "100%" }}>
                <tr>
                  <th><span style={{ fontSize: "32px", fontFamily: "Poppins", }}>Bidan {data.name}</span><br /><span style={{ color: "#4A4A4A", fontSize: "12px", fontFamily: "Poppins", fontStyle: "normal", fontWeight: "500", }}>Spesialis anak</span></th>
                  <td style={{ textAlign: "end" }}>
                    <div className='d-flex justify-content-end' style={{ gap: "10px", }}>
                      <div className='py-1 px-2 rounded-2' style={{ background: "#FF9B50", }}>
                        <i>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2 19.5C1.45 19.5 0.979001 19.304 0.587001 18.912C0.195002 18.52 -0.000664969 18.0493 1.69779e-06 17.5V6.5C1.69779e-06 5.95 0.196002 5.479 0.588002 5.087C0.980002 4.695 1.45067 4.49933 2 4.5H6V2.5C6 1.95 6.196 1.479 6.588 1.087C6.98 0.695002 7.45067 0.499335 8 0.500002H12C12.55 0.500002 13.021 0.696002 13.413 1.088C13.805 1.48 14.0007 1.95067 14 2.5V4.5H18C18.55 4.5 19.021 4.696 19.413 5.088C19.805 5.48 20.0007 5.95067 20 6.5V17.5C20 18.05 19.804 18.521 19.412 18.913C19.02 19.305 18.5493 19.5007 18 19.5H2ZM8 4.5H12V2.5H8V4.5Z" fill="white" />
                          </svg>
                        </i><span className='text-white'> {data.experience} Tahun</span>
                      </div>
                      <div className='py-1 px-2 rounded-2' style={{ background: "#FF9B50", }}>
                        <i>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M0 9.64815H3.57143V19.5H0V9.64815ZM15 19.5H5V9.08307L7.17286 5.87207L7.77643 1.70826C7.82649 1.3735 7.99671 1.06751 8.2562 0.845819C8.51569 0.624131 8.84725 0.501436 9.19071 0.5H9.28571C9.85386 0.500559 10.3986 0.723158 10.8003 1.11895C11.2021 1.51474 11.428 2.05138 11.4286 2.61111V6.83333H17.1429C17.9003 6.83426 18.6265 7.13112 19.1621 7.6588C19.6977 8.18648 19.9991 8.9019 20 9.64815V14.5741C19.9985 15.8801 19.4712 17.1321 18.5339 18.0556C17.5965 18.9791 16.3256 19.4985 15 19.5Z" fill="white" />
                          </svg>
                        </i><span className='text-white'> {data.percentage}%</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className='mt-3'>
                  <th style={{ fontSize: "24px", fontFamily: "Poppins", }}>Biaya Sesi</th>
                  <td style={{ textAlign: "end" }}>Rp. 100.000</td>
                </tr>
                <tr>
                  <th style={{ fontSize: "24px", fontFamily: "Poppins", }}>Biaya Layanan</th>
                  <td style={{ textAlign: "end" }}>Rp. 5.000</td>
                </tr>
                <tr>
                  <th style={{ fontSize: "24px", fontFamily: "Poppins", }}>Diskon</th>
                  <td style={{ textAlign: "end" }}>-Rp 25.000</td>
                </tr>
                <tr>
                  <th style={{ fontSize: "24px", fontFamily: "Poppins", }}>Pembayaran Anda</th>
                  <td style={{ textAlign: "end" }}>Rp. {data.price} <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 41" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5298 2.4973C16.0925 1.86888 16.7813 1.36619 17.5514 1.02204C18.3215 0.677883 19.1555 0.5 19.999 0.5C20.8425 0.5 21.6765 0.677883 22.4466 1.02204C23.2167 1.36619 23.9055 1.86888 24.4682 2.4973L25.8679 4.06105C26.0679 4.28483 26.3158 4.4607 26.5931 4.57563C26.8703 4.69056 27.1699 4.74159 27.4696 4.72494L29.5692 4.60896C30.4112 4.56272 31.2534 4.6945 32.041 4.9957C32.8286 5.2969 33.5438 5.76076 34.14 6.35702C34.7363 6.95327 35.2001 7.66853 35.5013 8.45614C35.8025 9.24374 35.9343 10.086 35.888 10.928L35.7721 13.0276C35.7557 13.327 35.8069 13.6262 35.9218 13.9031C36.0367 14.18 36.2124 14.4275 36.4359 14.6274L38.0016 16.0272C38.6304 16.5898 39.1333 17.2788 39.4777 18.0491C39.822 18.8194 40 19.6537 40 20.4974C40 21.3412 39.822 22.1755 39.4777 22.9458C39.1333 23.7161 38.6304 24.405 38.0016 24.9677L36.4359 26.3675C36.2122 26.5676 36.0363 26.8154 35.9214 27.0927C35.8064 27.37 35.7554 27.6696 35.7721 27.9693L35.888 30.0689C35.9343 30.9109 35.8025 31.7531 35.5013 32.5407C35.2001 33.3284 34.7363 34.0436 34.14 34.6399C33.5438 35.2361 32.8286 35.7 32.041 36.0012C31.2534 36.3024 30.4112 36.4342 29.5692 36.3879L27.4696 36.2719C27.1703 36.2556 26.8711 36.3068 26.5941 36.4217C26.3172 36.5366 26.0697 36.7123 25.8699 36.9358L24.4702 38.5016C23.9075 39.1303 23.2185 39.6333 22.4483 39.9777C21.678 40.322 20.8437 40.5 20 40.5C19.1563 40.5 18.322 40.322 17.5517 39.9777C16.7815 39.6333 16.0925 39.1303 15.5298 38.5016L14.1301 36.9358C13.9301 36.7121 13.6822 36.5362 13.4049 36.4213C13.1277 36.3063 12.8281 36.2553 12.5284 36.2719L10.4288 36.3879C9.58684 36.4342 8.74461 36.3024 7.95703 36.0012C7.16945 35.7 6.45421 35.2361 5.85797 34.6399C5.26173 34.0436 4.79788 33.3284 4.49669 32.5407C4.1955 31.7531 4.06372 30.9109 4.10996 30.0689L4.22594 27.9693C4.24228 27.6699 4.1911 27.3707 4.07619 27.0938C3.96127 26.8169 3.78557 26.5693 3.56207 26.3695L1.99836 24.9697C1.36963 24.407 0.866674 23.7181 0.522329 22.9478C0.177984 22.1775 0 21.3432 0 20.4994C0 19.6557 0.177984 18.8214 0.522329 18.0511C0.866674 17.2808 1.36963 16.5918 1.99836 16.0292L3.56207 14.6294C3.78584 14.4293 3.96171 14.1815 4.07663 13.9042C4.19156 13.6269 4.24259 13.3273 4.22594 13.0276L4.10996 10.928C4.06372 10.086 4.1955 9.24374 4.49669 8.45614C4.79788 7.66853 5.26173 6.95327 5.85797 6.35702C6.45421 5.76076 7.16945 5.2969 7.95703 4.9957C8.74461 4.6945 9.58684 4.56272 10.4288 4.60896L12.5284 4.72494C12.8277 4.74128 13.1269 4.6901 13.4038 4.57518C13.6808 4.46027 13.9283 4.28455 14.1281 4.06105L15.5278 2.4973H15.5298ZM27.4116 13.0856C27.7865 13.4606 27.9971 13.9691 27.9971 14.4994C27.9971 15.0296 27.7865 15.5382 27.4116 15.9132L15.4139 27.9113C15.0367 28.2755 14.5316 28.4771 14.0073 28.4725C13.483 28.468 12.9815 28.2577 12.6107 27.8869C12.24 27.5161 12.0297 27.0146 12.0251 26.4903C12.0206 25.966 12.2221 25.4609 12.5864 25.0837L24.5841 13.0856C24.9591 12.7107 25.4677 12.5001 25.9979 12.5001C26.5281 12.5001 27.0366 12.7107 27.4116 13.0856ZM14.9999 12.4997C14.2044 12.4997 13.4415 12.8157 12.879 13.3783C12.3165 13.9408 12.0005 14.7037 12.0005 15.4992V15.5192C12.0005 16.3148 12.3165 17.0777 12.879 17.6402C13.4415 18.2027 14.2044 18.5188 14.9999 18.5188H15.0199C15.8154 18.5188 16.5783 18.2027 17.1409 17.6402C17.7034 17.0777 18.0194 16.3148 18.0194 15.5192V15.4992C18.0194 14.7037 17.7034 13.9408 17.1409 13.3783C16.5783 12.8157 15.8154 12.4997 15.0199 12.4997H14.9999ZM24.9981 22.4981C24.2026 22.4981 23.4396 22.8141 22.8771 23.3767C22.3146 23.9392 21.9986 24.7021 21.9986 25.4977V25.5176C21.9986 26.3132 22.3146 27.0761 22.8771 27.6386C23.4396 28.2012 24.2026 28.5172 24.9981 28.5172H25.0181C25.8136 28.5172 26.5765 28.2012 27.139 27.6386C27.7015 27.0761 28.0175 26.3132 28.0175 25.5176V25.4977C28.0175 24.7021 27.7015 23.9392 27.139 23.3767C26.5765 22.8141 25.8136 22.4981 25.0181 22.4981H24.9981Z" fill="#1E1E1E" />
                    </svg></i></td>
                </tr>
              </table>
              <button className='btn btn-lg btn-primary border-0 w-100 mt-3'><i className='px-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6474 1.99797C12.0694 1.52666 12.586 1.14964 13.1636 0.891529C13.7411 0.633412 14.3666 0.5 14.9993 0.5C15.6319 0.5 16.2574 0.633412 16.8349 0.891529C17.4125 1.14964 17.9291 1.52666 18.3511 1.99797L19.4009 3.17079C19.551 3.33862 19.7368 3.47053 19.9448 3.55672C20.1527 3.64292 20.3774 3.68119 20.6022 3.66871L22.1769 3.58172C22.8084 3.54704 23.44 3.64587 24.0307 3.87177C24.6214 4.09768 25.1578 4.44557 25.605 4.89276C26.0522 5.33995 26.4001 5.8764 26.626 6.4671C26.8519 7.0578 26.9507 7.6895 26.916 8.32097L26.829 9.89572C26.8168 10.1202 26.8552 10.3446 26.9414 10.5523C27.0275 10.76 27.1593 10.9457 27.327 11.0955L28.5012 12.1454C28.9728 12.5674 29.35 13.0841 29.6083 13.6618C29.8665 14.2396 30 14.8653 30 15.4981C30 16.1309 29.8665 16.7566 29.6083 17.3343C29.35 17.912 28.9728 18.4288 28.5012 18.8508L27.327 19.9006C27.1591 20.0507 27.0272 20.2366 26.941 20.4445C26.8548 20.6525 26.8166 20.8772 26.829 21.1019L26.916 22.6767C26.9507 23.3082 26.8519 23.9399 26.626 24.5306C26.4001 25.1213 26.0522 25.6577 25.605 26.1049C25.1578 26.5521 24.6214 26.9 24.0307 27.1259C23.44 27.3518 22.8084 27.4506 22.1769 27.4159L20.6022 27.329C20.3777 27.3167 20.1533 27.3551 19.9456 27.4413C19.7379 27.5275 19.5523 27.6592 19.4024 27.8269L18.3526 29.0012C17.9306 29.4727 17.4139 29.85 16.8362 30.1082C16.2585 30.3665 15.6328 30.5 15 30.5C14.3672 30.5 13.7415 30.3665 13.1638 30.1082C12.5861 29.85 12.0694 29.4727 11.6474 29.0012L10.5976 27.8269C10.4475 27.659 10.2617 27.5271 10.0537 27.4409C9.84575 27.3547 9.62106 27.3165 9.39629 27.329L7.82159 27.4159C7.19013 27.4506 6.55846 27.3518 5.96777 27.1259C5.37709 26.9 4.84066 26.5521 4.39348 26.1049C3.9463 25.6577 3.59841 25.1213 3.37252 24.5306C3.14662 23.9399 3.04779 23.3082 3.08247 22.6767L3.16946 21.1019C3.18171 20.8774 3.14333 20.653 3.05714 20.4453C2.97095 20.2376 2.83917 20.052 2.67155 19.9021L1.49877 18.8523C1.02722 18.4303 0.650005 17.9135 0.391747 17.3358C0.133488 16.7581 0 16.1324 0 15.4996C0 14.8668 0.133488 14.2411 0.391747 13.6633C0.650005 13.0856 1.02722 12.5689 1.49877 12.1469L2.67155 11.097C2.83938 10.947 2.97128 10.7611 3.05747 10.5531C3.14367 10.3452 3.18194 10.1205 3.16946 9.89572L3.08247 8.32097C3.04779 7.6895 3.14662 7.0578 3.37252 6.4671C3.59841 5.8764 3.9463 5.33995 4.39348 4.89276C4.84066 4.44557 5.37709 4.09768 5.96777 3.87177C6.55846 3.64587 7.19013 3.54704 7.82159 3.58172L9.39629 3.66871C9.62081 3.68096 9.84521 3.64258 10.0529 3.55639C10.2606 3.4702 10.4462 3.33842 10.5961 3.17079L11.6459 1.99797H11.6474ZM20.5587 9.93921C20.8399 10.2205 20.9978 10.6019 20.9978 10.9995C20.9978 11.3972 20.8399 11.7786 20.5587 12.0599L11.5604 21.0584C11.2775 21.3316 10.8987 21.4828 10.5055 21.4794C10.1123 21.476 9.73612 21.3182 9.45806 21.0402C9.18 20.7621 9.02227 20.386 9.01886 19.9927C9.01544 19.5995 9.1666 19.2206 9.43979 18.9378L18.4381 9.93921C18.7193 9.65805 19.1007 9.5001 19.4984 9.5001C19.8961 9.5001 20.2775 9.65805 20.5587 9.93921ZM11.2499 9.49978C10.6533 9.49978 10.0811 9.7368 9.65926 10.1587C9.23738 10.5806 9.00037 11.1528 9.00037 11.7494V11.7644C9.00037 12.3611 9.23738 12.9333 9.65926 13.3552C10.0811 13.7771 10.6533 14.0141 11.2499 14.0141H11.2649C11.8616 14.0141 12.4338 13.7771 12.8556 13.3552C13.2775 12.9333 13.5145 12.3611 13.5145 11.7644V11.7494C13.5145 11.1528 13.2775 10.5806 12.8556 10.1587C12.4338 9.7368 11.8616 9.49978 11.2649 9.49978H11.2499ZM18.7486 16.9986C18.1519 16.9986 17.5797 17.2356 17.1579 17.6575C16.736 18.0794 16.499 18.6516 16.499 19.2482V19.2632C16.499 19.8599 16.736 20.4321 17.1579 20.854C17.5797 21.2759 18.1519 21.5129 18.7486 21.5129H18.7635C19.3602 21.5129 19.9324 21.2759 20.3542 20.854C20.7761 20.4321 21.0131 19.8599 21.0131 19.2632V19.2482C21.0131 18.6516 20.7761 18.0794 20.3542 17.6575C19.9324 17.2356 19.3602 16.9986 18.7635 16.9986H18.7486Z" fill="white" />
                </svg></i>Dapatkan Diskon</button>
            </div>
          </div>
        </div>
        ) : (
          <div class="alert alert-danger text-center" role="alert">
            Kamu Belum memilih Bidan!
          </div>
        )}
      </section>
      <section className='py-4'>
      {data ? (
      <div className='container rounded-2 py-4' style={{background: "#FEE8D7",
        }}>
          
          <div className='d-flex justify-content-center text-dark'>
            <h4 style={{fontFamily: "Poppins",
            }}>Pembayaran Anda</h4>
          </div>
          
          <div className='d-flex justify-content-center'>
          
            <h4 className='text-dark' style={{fontFamily: "Poppins",
            }}>Rp. {data.price}</h4><i className='px-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3179 1.19838C9.6555 0.82133 10.0688 0.519716 10.5309 0.313223C10.9929 0.10673 11.4933 0 11.9994 0C12.5055 0 13.0059 0.10673 13.4679 0.313223C13.93 0.519716 14.3433 0.82133 14.6809 1.19838L15.5207 2.13663C15.6408 2.2709 15.7895 2.37642 15.9558 2.44538C16.1222 2.51433 16.302 2.54495 16.4818 2.53497L17.7415 2.46538C18.2467 2.43763 18.752 2.5167 19.2246 2.69742C19.6971 2.87814 20.1263 3.15646 20.484 3.51421C20.8418 3.87196 21.1201 4.30112 21.3008 4.77368C21.4815 5.24624 21.5606 5.7516 21.5328 6.25678L21.4632 7.51658C21.4534 7.69619 21.4841 7.87572 21.5531 8.04187C21.622 8.20801 21.7275 8.35653 21.8616 8.47642L22.801 9.31629C23.1782 9.6539 23.48 10.0673 23.6866 10.5295C23.8932 10.9916 24 11.4922 24 11.9985C24 12.5047 23.8932 13.0053 23.6866 13.4675C23.48 13.9296 23.1782 14.343 22.801 14.6806L21.8616 15.5205C21.7273 15.6405 21.6218 15.7892 21.5528 15.9556C21.4839 16.122 21.4532 16.3017 21.4632 16.4816L21.5328 17.7414C21.5606 18.2465 21.4815 18.7519 21.3008 19.2244C21.1201 19.697 20.8418 20.1262 20.484 20.4839C20.1263 20.8417 19.6971 21.12 19.2246 21.3007C18.752 21.4814 18.2467 21.5605 17.7415 21.5328L16.4818 21.4632C16.3022 21.4534 16.1226 21.4841 15.9565 21.553C15.7903 21.622 15.6418 21.7274 15.5219 21.8615L14.6821 22.801C14.3445 23.1782 13.9311 23.48 13.469 23.6866C13.0068 23.8932 12.5062 24 12 24C11.4938 24 10.9932 23.8932 10.531 23.6866C10.0689 23.48 9.6555 23.1782 9.3179 22.801L8.47806 21.8615C8.35804 21.7272 8.20933 21.6217 8.04296 21.5528C7.8766 21.4838 7.69685 21.4532 7.51704 21.4632L6.25727 21.5328C5.75211 21.5605 5.24677 21.4814 4.77422 21.3007C4.30167 21.12 3.87252 20.8417 3.51478 20.4839C3.15704 20.1262 2.87873 19.697 2.69801 19.2244C2.5173 18.7519 2.43823 18.2465 2.46598 17.7414L2.53557 16.4816C2.54537 16.3019 2.51466 16.1224 2.44571 15.9563C2.37676 15.7901 2.27134 15.6416 2.13724 15.5217L1.19901 14.6818C0.82178 14.3442 0.520004 13.9308 0.313397 13.4687C0.106791 13.0065 0 12.5059 0 11.9997C0 11.4934 0.106791 10.9928 0.313397 10.5307C0.520004 10.0685 0.82178 9.6551 1.19901 9.31749L2.13724 8.47762C2.2715 8.3576 2.37702 8.20889 2.44598 8.04252C2.51493 7.87615 2.54555 7.69639 2.53557 7.51658L2.46598 6.25678C2.43823 5.7516 2.5173 5.24624 2.69801 4.77368C2.87873 4.30112 3.15704 3.87196 3.51478 3.51421C3.87252 3.15646 4.30167 2.87814 4.77422 2.69742C5.24677 2.5167 5.75211 2.43763 6.25727 2.46538L7.51704 2.53497C7.69665 2.54477 7.87617 2.51406 8.04231 2.44511C8.20845 2.37616 8.35697 2.27073 8.47686 2.13663L9.3167 1.19838H9.3179ZM16.447 7.55137C16.6719 7.77637 16.7983 8.08149 16.7983 8.39964C16.7983 8.71778 16.6719 9.0229 16.447 9.2479L9.24831 16.4468C9.02203 16.6653 8.71897 16.7862 8.40439 16.7835C8.08981 16.7808 7.78889 16.6546 7.56644 16.4321C7.344 16.2097 7.21782 15.9088 7.21508 15.5942C7.21235 15.2796 7.33328 14.9765 7.55183 14.7502L14.7505 7.55137C14.9755 7.32644 15.2806 7.20008 15.5987 7.20008C15.9169 7.20008 16.222 7.32644 16.447 7.55137ZM8.99996 7.19983C8.52266 7.19983 8.06491 7.38944 7.7274 7.72695C7.3899 8.06446 7.2003 8.52223 7.2003 8.99954V9.01154C7.2003 9.48885 7.3899 9.94662 7.7274 10.2841C8.06491 10.6216 8.52266 10.8113 8.99996 10.8113H9.01196C9.48926 10.8113 9.94701 10.6216 10.2845 10.2841C10.622 9.94662 10.8116 9.48885 10.8116 9.01154V8.99954C10.8116 8.52223 10.622 8.06446 10.2845 7.72695C9.94701 7.38944 9.48926 7.19983 9.01196 7.19983H8.99996ZM14.9988 13.1989C14.5215 13.1989 14.0638 13.3885 13.7263 13.726C13.3888 14.0635 13.1992 14.5213 13.1992 14.9986V15.0106C13.1992 15.4879 13.3888 15.9457 13.7263 16.2832C14.0638 16.6207 14.5215 16.8103 14.9988 16.8103H15.0108C15.4881 16.8103 15.9459 16.6207 16.2834 16.2832C16.6209 15.9457 16.8105 15.4879 16.8105 15.0106V14.9986C16.8105 14.5213 16.6209 14.0635 16.2834 13.726C15.9459 13.3885 15.4881 13.1989 15.0108 13.1989H14.9988Z" fill="#4A4A4A"/>
          </svg></i>
          </div>
          <div className='pt-2'>
          
          <button onClick={() => postData(data.name, data.price, data.users_id )} className='btn btn-lg btn-primary border-0 w-100'>Bayar Sekarang</button>
          <button onClick={deletePayment} className='btn btn-lg btn-danger border-0 w-100'>Batalkan Konsultasi</button>
          <div id="snap-container"></div>
         
        </div>
        
        </div>
        ) : (
          <p></p>
        )}
      </section>
      <Footer />
    </>
  )
}

export default payment