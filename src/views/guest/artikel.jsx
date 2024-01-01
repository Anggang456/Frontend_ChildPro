import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import { Image } from 'react-bootstrap'
import axios from 'axios';
import Chat from '../../component/chat';

const artikel = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://api-berita-indonesia.vercel.app/merdeka/sehat/',{
        withCredentials: false
      })
      setData(response.data.data.posts)
    }
    getData()
  }, [])

  return (
    <>
      <Navbar />
      <Chat />
      <section className='py-4'>
        <div className='container'>
          {data.map(data => (
            <div className='row justify-content-center'>
              <div key={data.id} className='col-md-4 mb-3'>
                <Image className='rounded-2' src={data.thumbnail} alt='image' style={{width:"100%"}} />
              </div>
              <div className='col-md-6'>
                <a className='text-dark' href={data.link} style={{ textDecoration: "none" }}>
                  <h4 className='py-1 fw-bold' style={{textAlign:"justify", fontFamily:"Poppins"}}>{data.title}</h4>
                  </a>
                  <p className='py-1' style={{textAlign:'justify'}}>{data.description} </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default artikel