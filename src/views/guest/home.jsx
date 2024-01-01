import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Balita from '../../assets/balita.png'
import Grow from '../../assets/growcheck.jpg'
import Medisync from '../../assets/medisnyc.jpg'
import Image from 'react-bootstrap/Image';
import Chat from '../../component/chat'

const home = () => {
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
            </div>
          </div>
        </div>
      </section>
      <section className='py-2'>
        <div className="container justify-content-center align-items-center align-self-stretch">
          <div className="row justify-content-center align-items-center" style={{
            gap: "160px",
          }}>
            <div className="d-flex justify-content-center col-sm-2 col-md-2  col-lg-4 mb-2">
              <Image src={Grow} width={"400px"} style={{ minWidth: "400px" }} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <h1 style={{
                color: "rgba(255, 155, 80, 0.98)",
              }}><strong style={{fontFamily:"Poppins"}}>GrowCheck</strong></h1>
              <p className='text-dark' style={{
                textAlign: "justify",
                fontSize: "18px",
              }}>Deteksi tumbuh kembang anak melibatkan pengamatan dan pemahaman terhadap perkembangan mereka sejak lahir. Dalam proses ini, kita melihat bagaimana anak belajar berjalan, berbicara, dan menyelesaikan tugas-tugas tertentu. Penting bagi kita untuk memperhatikan milestone atau tonggak perkembangan yang umumnya terjadi pada usia tertentu, seperti kemampuan berbicara atau keterampilan motorik.</p>
              <a href="/growcheck" className="btn btn-primary border-0 rounded-0" style={{
                fontSize: "16px",
              }}>Lihat Selengkapnya</a>
            </div>
          </div>
        </div>
      </section>
      <section className='py-2'>
        <div className="container justify-content-center align-items-center align-self-stretch">
          <div className="row justify-content-center align-items-center" style={{
            gap: "160px",
          }}>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <h1 style={{
                color: "rgba(255, 155, 80, 0.98)",
              }}><strong style={{fontFamily:"Poppins"}}>Medisync</strong></h1>
              <p className='text-dark' style={{
                textAlign: "justify",
                fontSize: "18px",
              }}>Bidan deteksi tumbuh kembang anak adalah seseorang yang ahli dalam mengamati dan mengevaluasi perkembangan anak. Mereka menggunakan pengetahuan khusus untuk memantau kemajuan anak dalam hal fisik, emosional, dan sosial. Dengan melakukan deteksi ini, bidan deteksi membantu mengidentifikasi perkembangan yang normal dan memberikan saran atau tindakan jika ditemui tanda-tanda keterlambatan atau kekhawatiran lainnya.</p>
              <a href="/medisnyc" className="btn btn-primary border-0 rounded-0" style={{
                fontSize: "16px",
              }}>Lihat Selengkapnya</a>
            </div>
            <div className="d-flex justify-content-center col-sm-2 col-md-2  col-lg-4 mb-2">
              <Image src={Medisync} width={"400px"} style={{ minWidth: "400px" }} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default home