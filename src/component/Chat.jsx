import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Chat = () => {
    const [data, setData] = useState([]);
    const [chat, setChat] = useState([]);
    const [send, setSend] = useState([]);
    const [receiver, setReceiver] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getmessage');
            setChat(response.data)
            console.log(chat)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchData();
        getChat();
    }, []);

    const getChat = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getchat');
            setData(response.data.user);
        } catch (error) {

        }
    }

    useEffect(() => {
        getChat();
    }, []);

    return (
        <div className="rounded d-inline scroll-to-top bg-transparent">
            <input type="checkbox" id="check" />
            <label htmlFor='check' className="chat-btn border">
                <i className="fas fa-comment text-white" ></i>
            </label>
            <div className="wrapper p-0">
                <div className="header border mb-0">
                    <h5>Ayo konsultasi!</h5>
                </div>
                {data ? (
                    <>
                        <div className='col-md-12 border pt-3 mb-0'>
                            <p className='text-dark' style={{ textAlign: "left" }}>  <button className='border-0 bg-transparent p-0 d-flex items-content-center'><i className='fa fa-user-circle-o px-3' style={{ fontSize: "40px" }}></i> <span className='fw-bold'>Bidan {data.name}</span></button> </p>
                        </div>

                        <div className='col-auto pt-2' style={{ overflow: "auto", width: "399px", height: "400px", display: "block" }}>

                            {chat.map(chat => (
                                <div key={chat.id}>
                                    {chat.send !== null && chat.receiver !== null && (
                                        <>
                                            <p className='py-0' style={{ textAlign: "left" }}>
                                                <i className='fa fa-user-circle-o px-3 text-dark' style={{ fontSize: "30px" }}></i>
                                                <button className='py-2 px-2 text-dark rounded border-0' style={{ backgroundColor: "#FEEFD0", maxWidth: "300px", lineHeight: "20px", textAlign: "justify" }}>
                                                    {chat.receiver}
                                                </button>
                                            </p>

                                            <p className='py-0 mb-0 text-dark' style={{ textAlign: "right" }}>
                                                <button className='text-dark py-2 px-2 rounded border-0' style={{ backgroundColor: "#FEEFD0", maxWidth: "300px", lineHeight: "20px", textAlign: "justify" }}>
                                                    {chat.send}
                                                </button>
                                                <i className='fa fa-user-circle-o px-3 text-dark' style={{ fontSize: "30px" }}></i>
                                            </p>
                                        </>
                                    )}
                                </div>
                            ))}

                        </div>


                        <div className="row px-2 pt-2 mb-0">
                            <div className='col-1'>
                                <button className="fa fa-image text-dark border-0 bg-transparent" style={{ fontSize: '25px' }}></button>
                            </div>
                            <div className='col-1'>
                                <button className="fa fa-file text-dark border-0 bg-transparent" style={{ fontSize: '25px' }}></button>
                            </div>
                            <div className='col-8'>
                                <input className="form-control" placeholder="Your Text Message" />
                            </div>
                            <div className='col-1'>
                                <button className="fa fa-paper-plane text-dark border-0 bg-transparent" style={{ fontSize: '25px' }}></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )

}

export default Chat