import { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import { useNavigate } from 'react-router-dom'
import Chat from '../../component/chat'
import axios from 'axios'

const profile = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const answer = window.confirm("Apakah kamu yakin keluar?");
      if (answer) {
        await axios.delete('http://localhost:3000/logout');
        localStorage.removeItem("accessToken");
        navigate("/");
      } else {
        navigate("/profile")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile', {
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
      <section className='py-4'>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-10'>
            <div className='container rounded-2' style={{
              border: "3px solid #FF9D53",
            }}>
              <div className='d-flex justify-content-center py-4'>
                <i><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" fill="none">
                  <path d="M150 74.925C150 33.5625 116.4 0 75 0C33.6 0 0 33.5625 0 74.925C0 97.7063 10.35 118.237 26.55 132.019C26.7 132.169 26.85 132.169 26.85 132.319C28.2 133.369 29.55 134.419 31.05 135.469C31.8 135.919 32.4 136.509 33.15 137.109C45.5444 145.513 60.1754 150.003 75.15 150C90.1246 150.003 104.756 145.513 117.15 137.109C117.9 136.659 118.5 136.069 119.25 135.609C120.6 134.569 122.1 133.519 123.45 132.469C123.6 132.319 123.75 132.319 123.75 132.169C139.65 118.228 150 97.7063 150 74.925ZM75 140.559C60.9 140.559 48 136.059 37.35 128.569C37.5 127.369 37.8 126.178 38.1 124.978C38.9938 121.726 40.3047 118.603 42 115.688C43.65 112.838 45.6 110.287 48 108.037C50.25 105.787 52.95 103.697 55.65 102.047C58.5 100.397 61.5 99.1969 64.8 98.2969C68.1257 97.4005 71.5556 96.9497 75 96.9563C85.2249 96.8838 95.074 100.806 102.45 107.888C105.9 111.338 108.6 115.388 110.55 120.028C111.6 122.728 112.35 125.578 112.8 128.569C101.73 136.351 88.5322 140.538 75 140.559ZM52.05 71.1844C50.7283 68.1583 50.0637 64.8863 50.1 61.5844C50.1 58.2937 50.7 54.9938 52.05 51.9938C53.4 48.9938 55.2 46.3031 57.45 44.0531C59.7 41.8031 62.4 40.0125 65.4 38.6625C68.4 37.3125 71.7 36.7125 75 36.7125C78.45 36.7125 81.6 37.3125 84.6 38.6625C87.6 40.0125 90.3 41.8125 92.55 44.0531C94.8 46.3031 96.6 49.0031 97.95 51.9938C99.3 54.9938 99.9 58.2937 99.9 61.5844C99.9 65.0344 99.3 68.1844 97.95 71.175C96.6471 74.1306 94.8173 76.8245 92.55 79.125C90.2487 81.389 87.5549 83.2156 84.6 84.5156C78.4015 87.0629 71.4485 87.0629 65.25 84.5156C62.2951 83.2156 59.6013 81.389 57.3 79.125C55.0295 76.858 53.2434 74.1627 52.05 71.1844ZM121.65 120.928C121.65 120.628 121.5 120.478 121.5 120.178C120.025 115.485 117.85 111.041 115.05 106.997C112.247 102.922 108.802 99.3289 104.85 96.3562C101.831 94.0854 98.5596 92.1726 95.1 90.6562C96.6739 89.6179 98.1322 88.4142 99.45 87.0656C101.686 84.8578 103.65 82.3903 105.3 79.7156C108.622 74.2576 110.338 67.9733 110.25 61.5844C110.296 56.8548 109.378 52.1655 107.55 47.8031C105.746 43.5997 103.148 39.7833 99.9 36.5625C96.6566 33.3753 92.8395 30.8305 88.65 29.0625C84.2804 27.2381 79.585 26.3226 74.85 26.3719C70.1144 26.3256 65.419 27.2442 61.05 29.0719C56.8243 30.8361 52.9979 33.4349 49.8 36.7125C46.6129 39.9524 44.0681 43.7664 42.3 47.9531C40.4723 52.3155 39.5536 57.0048 39.6 61.7344C39.6 65.0344 40.05 68.1844 40.95 71.175C41.85 74.325 43.05 77.175 44.7 79.8656C46.2 82.5656 48.3 84.9656 50.55 87.2156C51.9 88.5656 53.4 89.7562 55.05 90.8062C51.5797 92.3631 48.3067 94.3269 45.3 96.6563C41.4 99.6563 37.95 103.247 35.1 107.147C32.2712 111.175 30.0945 115.623 28.65 120.328C28.5 120.628 28.5 120.928 28.5 121.078C16.65 109.088 9.3 92.9062 9.3 74.925C9.3 38.8125 38.85 9.29062 75 9.29062C111.15 9.29062 140.7 38.8125 140.7 74.925C140.68 92.1746 133.831 108.715 121.65 120.928Z" fill="#1E1E1E" />
                </svg></i>
              </div>
              <div className='d-flex justify-content-center py-2'>
                <button className='btn btn-md btn-primary border-0 rounded-0'>Ubah</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='mb-4'>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-10'>
            <div className='container d-flex rounded-2' style={{
              background: "#FEEFD0",
            }}>
              <div className='col-md-4'>
                <div className='p-4'>
                  <span className='text-dark fw-bold' style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}>Profile Saya</span>
                  <hr />
                  <span className='text-dark fw-bold' style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}>Ubah Password</span>
                  <hr />
                  <button onClick={Logout} className='btn border-0 p-0 text-danger fw-bold' style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}>Keluar</button>
                </div>
              </div>
              <div className='col'>
                <div className='p-4'>
                  <table className='mb-3 text-dark' style={{ width: "100%" }}>
                    {data ? (
                      <tbody>
                        <tr>
                          <th><span style={{ fontSize: "18px", fontFamily: "Poppins", }}>{data.name}</span><br />
                            <span style={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                            }}>{data.telp}</span><br />
                            <span style={{
                              fontFamily: "Poppins",
                              fontSize: "12px",
                            }}>{data.email}</span></th>
                          <td style={{ textAlign: "end" }}><a href='/edit' className='btn btn-dark px-4'>Ubah</a></td>
                        </tr>
                        <tr>
                          <th style={{ fontSize: "18px", fontFamily: "Poppins", }}>Tanggal Lahir</th>
                          <td style={{ textAlign: "end" }}>{data.dob}</td>
                        </tr>
                        <tr>
                          <th style={{ fontSize: "18px", fontFamily: "Poppins", }}>Jenis Kelamin</th>
                          <td style={{ textAlign: "end" }}>{data.gender}</td>
                        </tr>
                        <tr>
                          <th style={{ fontSize: "18px", fontFamily: "Poppins", }}>No. Telp</th>
                          <td style={{ textAlign: "end" }}>{data.telp}</td>
                        </tr>
                        <tr>
                          <th style={{ fontSize: "18px", fontFamily: "Poppins", }}>Alamat</th>
                          <td style={{ textAlign: "end" }}>{data.alamat}</td>
                        </tr>
                        <tr>
                          <th style={{ fontSize: "18px", fontFamily: "Poppins", }}>Nama Pengguna</th>
                          <td style={{ textAlign: "end" }}>{data.name}</td>
                        </tr>
                        <tr>
                          <th style={{ fontSize: "18px", fontFamily: "Poppins", }}>Kata Sandi</th>
                          <td style={{ textAlign: "end" }}>*********</td>
                        </tr>
                      </tbody>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default profile;