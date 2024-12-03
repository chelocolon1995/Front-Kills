import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table'

const Home = ({ greeting }) => {

    const [data, setData] = useState([]);
    const [kill, SetKill] = useState([]);
    const [dateKills, setDateKills] = useState([]);
    const [Killer, SetKiller] = useState([]);
    const [Death, SetDeath] = useState([]);
    const [topkills, setTopkills] = useState([]);
    const [topdeaths, setTopDeaths] = useState([]);
    const [individualKills, setIndividualKills] = useState([]);
    const [individualDeaths, setIndividualDeaths] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/elitesdate')
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const countsDeaths = {};
        dateKills.forEach(({ MUERTE }) => {
            countsDeaths[MUERTE] = (countsDeaths[MUERTE] || 0) + 1;
        });
        const finalArray2 = Object.entries(countsDeaths)
            .map(([MUERTE, count]) => ({ MUERTE, count }))
            .sort((a, b) => b.count - a.count);
        setTopDeaths(finalArray2)

        const countsByCs = {};
        dateKills.forEach(({ KILLER }) => {
            countsByCs[KILLER] = (countsByCs[KILLER] || 0) + 1;
        });
        const finalArray = Object.entries(countsByCs)
            .map(([KILLER, count]) => ({ KILLER, count }))
            .sort((a, b) => b.count - a.count);
        setTopkills(finalArray)
            ;
    }, [dateKills])

    useEffect(() => {

        const items = dateKills.filter(item => item.KILLER === kill);
        SetKiller(items)
        const items2 = dateKills.filter(item => item.MUERTE === kill);
        SetDeath(items2)
    }, [Killer, Death])

    const handleChange = (event) => {
        const items = data.filter(item => item.date === event.target.value);
        const filter = items[0].data
        setDateKills(filter)
    }

    const handleChange2 = (event) => {
        SetKill(event.target.value)
        let Conteo = []
        Killer.forEach((kills) => {
            const index = Conteo.findIndex(x => x.MUERTE === kills.MUERTE);
            if (index === -1) {
                const x2 = {
                    MUERTE: kills.MUERTE,
                    COUNT: 1
                }
                Conteo.push(x2)
            } else {
                Conteo[index].COUNT++
            }
        });
        setIndividualKills(Conteo)

        let Conteo2 = []
        Death.forEach((kills) => {
            const index = Conteo2.findIndex(x => x.KILLER === kills.KILLER);
            if (index === -1) {
                const x2 = {
                    KILLER: kills.KILLER,
                    COUNT: 1
                }
                Conteo2.push(x2)
            } else {
                Conteo2[index].COUNT++
            }
        });
        setIndividualDeaths(Conteo2)
    }

    return (
        <div className="App">
            <div class="d-flex justify-content-around">
                <div>
                    <select
                        onChange={handleChange} className='dropdown'>
                        <option>Seleccione Fecha</option>
                        {data.map((item) => (
                            <option value={item.date}>{item.date}</option>
                        ))}
                    </select> <br></br> <br></br>
                </div>
            </div>
            <div class="d-flex justify-content-around">
                <div className="tabla">
                    <h1>Top Kills</h1>
                    <Table stripped bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Position</th>
                                <th >Killer</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topkills.map((item, index) => (
                                <tr key={topkills.KILLER}>
                                    <td>{index + 1}</td>
                                    {
                                        (item.KILLER === "Zoel") ? (
                                            <td >{item.KILLER}</td>
                                        ) : (
                                            <td>{item.KILLER}</td>
                                        )
                                    }

                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="tabla">
                    <h1>Top Deaths</h1>
                    <Table stripped bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Position</th>
                                <th >Deaths Time</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topdeaths.map((item, index) => (
                                <tr key={topdeaths.MUERTE}>
                                    <td>{index + 1}</td>
                                    <td>{item.MUERTE}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <select defaultValue="Seleccione Killer"
                        onChange={handleChange2} className='dropdown'>
                        <option>Seleccione Killer</option>
                        {topkills.map((item) => (
                            <option value={item.KILLER}>{item.KILLER}</option>
                        ))}
                    </select> <br></br> <br></br>
                </div>
                <div className="tabla">
                    <h1>Counts of Kills</h1>
                    <Table stripped bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Farmeado</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {individualKills.map((item) => (
                                <tr key={individualKills.MUERTE}>
                                    <td>{item.MUERTE}</td>
                                    <td>{item.COUNT}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="tabla">
                    <h1>Counts of Deaths</h1>
                    <Table stripped bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Farmeado</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {individualDeaths.map((item) => (
                                <tr key={individualDeaths.KILLER}>
                                    <td>{item.KILLER}</td>
                                    <td>{item.COUNT}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Home;
