import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ChatAdmin from '../../component/ChatAdmin';


const datakonsultasi = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/getHistory', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const processedData = response.data.map((item, index) => ({
            ...item,
            id: index + 1,
            
          }));
            setData(processedData);
            console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getData();
      }, []);
    return (
        <>
        
            <body id="page-top">
                <div id="wrapper">
                    <nav className="navbar align-items-start sidebar sidebar-dark accordion bg-white p-0 navbar-dark border">
                        <div className="container-fluid d-flex flex-column p-0"><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/">
                            <div className="mx-3 text-capitalize"><span style={{
                                textDecorationLine: "underline",
                                color: "#000",

                            }}><strong className='text-dark' style={{
                                fontFamily: "Poppins",
                                fontSize: "32px",
                            }}>Child</strong><strong style={{
                                color: "#FF9B50FB",
                                fontFamily: "Poppins",
                                fontSize: "32px",
                            }}>Pro</strong></span></div>
                        </a>
                            <hr className="sidebar-divider my-0" />
                            <ul id="accordionSidebar" className="navbar-nav">
                                <li className="nav-item"><a className="nav-link text-dark" href="/dashboard"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13.3333 8V0H24V8H13.3333ZM0 13.3333V0H10.6667V13.3333H0ZM13.3333 24V10.6667H24V24H13.3333ZM0 24V16H10.6667V24H0Z" fill="#FF9A62" />
                                </svg></i><span style={{ fontFamily: "Poppins" }}> Dashboard</span></a></li>
                                <li className="nav-item"><a className="nav-link active" href="/datakonsultasi"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M10 2C9.4 2 9 2.4 9 3V21C9 21.6 9.4 22 10 22C10.6 22 11 21.6 11 21V3C11 2.4 10.6 2 10 2ZM5 12C4.4 12 4 12.4 4 13V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V13C6 12.4 5.6 12 5 12ZM15 8C14.4 8 14 8.4 14 9V21C14 21.6 14.4 22 15 22C15.6 22 16 21.6 16 21V9C16 8.4 15.6 8 15 8ZM20 16C19.4 16 19 16.4 19 17V21C19 21.6 19.4 22 20 22C20.6 22 21 21.6 21 21V17C21 16.4 20.6 16 20 16Z" fill="#FF9A62" />
                                </svg></i><span className='text-dark'> Data Konsultasi</span></a></li>
                                <li className="nav-item"><a className="nav-link text-dark" href="/datagrow"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 8H21C21.6 8 22 7.6 22 7C22 6.4 21.6 6 21 6H13C12.4 6 12 6.4 12 7C12 7.6 12.4 8 13 8ZM21 10H13C12.4 10 12 10.4 12 11C12 11.6 12.4 12 13 12H21C21.6 12 22 11.6 22 11C22 10.4 21.6 10 21 10ZM3 12H9C9.6 12 10 11.6 10 11V5C10 4.4 9.6 4 9 4H3C2.4 4 2 4.4 2 5V11C2 11.6 2.4 12 3 12ZM21 14H3C2.4 14 2 14.4 2 15C2 15.6 2.4 16 3 16H21C21.6 16 22 15.6 22 15C22 14.4 21.6 14 21 14ZM13 18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H13C13.6 20 14 19.6 14 19C14 18.4 13.6 18 13 18Z" fill="#FF9A62" />
                                </svg></i><span> Status Pertumbuhan</span></a></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <nav className="navbar navbar-expand-sm bg-white border-bottom mb-4 topbar static-top navbar-light">
                                <div className="container-fluid"><button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle me-3" type="button"><i className="fas fa-bars"></i></button>
                                    <strong className='text-dark' style={{ fontFamily: "Poppins" }}>Data Konsultasi</strong>
                                    <ul className="navbar-nav flex-nowrap ms-auto">
                                        <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search"></i></a>
                                            <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                                <form className="me-auto navbar-search w-100">
                                                    <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                                        <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search"></i></button></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown no-arrow">
                                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 4C17.2015 3.99949 14.4519 4.73298 12.0255 6.12726C9.59904 7.52154 7.58076 9.52784 6.17205 11.9459C4.76335 14.364 4.0135 17.1092 3.99736 19.9077C3.98121 22.7061 4.69932 25.4598 6.08002 27.894C7.01324 26.6812 8.21288 25.6992 9.58619 25.024C10.9595 24.3487 12.4697 23.9984 14 24H26C27.5303 23.9984 29.0405 24.3487 30.4139 25.024C31.7872 25.6992 32.9868 26.6812 33.92 27.894C35.3007 25.4598 36.0188 22.7061 36.0027 19.9077C35.9865 17.1092 35.2367 14.364 33.828 11.9459C32.4193 9.52784 30.401 7.52154 27.9746 6.12726C25.5482 4.73298 22.7985 3.99949 20 4ZM35.886 32.152C38.5601 28.6659 40.0065 24.3935 40 20C40 8.954 31.046 0 20 0C8.95402 0 2.25065e-05 8.954 2.25065e-05 20C-0.00658037 24.3936 1.43983 28.666 4.11402 32.152L4.10402 32.188L4.81402 33.014C6.68979 35.207 9.01879 36.9672 11.6405 38.1733C14.2622 39.3793 17.1142 40.0026 20 40C24.0547 40.0075 28.0148 38.7758 31.35 36.47C32.7719 35.4876 34.0612 34.326 35.186 33.014L35.896 32.188L35.886 32.152ZM20 8C18.4087 8 16.8826 8.63214 15.7574 9.75736C14.6322 10.8826 14 12.4087 14 14C14 15.5913 14.6322 17.1174 15.7574 18.2426C16.8826 19.3679 18.4087 20 20 20C21.5913 20 23.1174 19.3679 24.2427 18.2426C25.3679 17.1174 26 15.5913 26 14C26 12.4087 25.3679 10.8826 24.2427 9.75736C23.1174 8.63214 21.5913 8 20 8Z" fill="#FF9A62" />
                                            </svg></i></a>
                                                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                                    <a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i> Logout</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <ChatAdmin />
                            <div className="card shadow">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 text-nowrap">
                                        </div>
                                        <div className="col-md-6">
                                            <div id="dataTable_filter" className="text-md-end dataTables_filter"><label className="form-label"><input className="form-control form-control-sm" type="search" aria-controls="dataTable" placeholder="Search" /></label></div>
                                        </div>
                                    </div>
                                    <div id="dataTable" className="table-responsive table mt-2" role="grid" aria-describedby="dataTable_info">
                                        <table id="dataTable" className="table my-0">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Tanggal</th>
                                                    <th>Nama Lengkap</th>
                                                    <th>Waktu Konsultasi</th>
                                                    <th>Pembarayan</th>
                                                    <th>Status</th>
                                                    <th>Nama Bidan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {data.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}.</td>
                                                    <td>{item.tanggal}</td>
                                                    <td>{item.user.name}</td>
                                                    <td>{item.timer} Menit</td>
                                                    <td>Rp. {item.price}</td>
                                                    <td>{item.status}</td>
                                                    <td>Bidan {item.midwife}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}

export default datakonsultasi