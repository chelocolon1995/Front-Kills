import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ greeting }) => {
    const [data, setData] = useState([]);
    const [dateKills, setDateKills] = useState([]);

    useEffect(() => {
        axios.get('https://backendkills.onrender.com/api/elitesdate').then((res) => {
            const lista = res.data
            setData(lista)
        });
    }, []);

    const handleChange = (event) => {
        const datekills = event.target.value
        if (datekills !== "nada") {
            const items = data.filter(item => item.date === datekills);
            const filter = items[0]._id
            setDateKills(filter)
        } else {
            setDateKills([])
        }

    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div>
                        <select
                            onChange={handleChange} className='dropdown'>
                            <option key={"nada"} value={"nada"} >Seleccione Fecha</option>
                            {data.map((item) => (
                                <option key={item._id} value={item.date}>{item.date}</option>
                            ))}
                        </select>
                    </div><br />
                    <div>
                        <Link to={dateKills}><button className='btn btn-danger'>GO !</button></Link>
                    </div>
                </div>
            </div>

        </>
    );
}



export default Home