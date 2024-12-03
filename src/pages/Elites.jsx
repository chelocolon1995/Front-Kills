import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
import axios from "axios";



const Elites = ({ greeting }) => {
    const [data, setData] = useState([]);
    const [topkills, setTopkills] = useState([]);
    const [topdeaths, setTopDeaths] = useState([]);
    const [individualKills, setIndividualKills] = useState([]);
    const [individualDeaths, setIndividualDeaths] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/elites')
            .then(response => {
                console.log(response.data[2].data)
                const filter = response.data[2].data
                setData(filter)
                const countsDeaths = {};
                filter.forEach(({ MUERTE }) => {
                    countsDeaths[MUERTE] = (countsDeaths[MUERTE] || 0) + 1;
                });
                const finalArray2 = Object.entries(countsDeaths)
                    .map(([MUERTE, count]) => ({ MUERTE, count }))
                    .sort((a, b) => b.count - a.count);
                setTopDeaths(finalArray2)

                const countsByCs = {};
                filter.forEach(({ KILLER }) => {
                    countsByCs[KILLER] = (countsByCs[KILLER] || 0) + 1;
                });
                const finalArray = Object.entries(countsByCs)
                    .map(([KILLER, count]) => ({ KILLER, count }))
                    .sort((a, b) => b.count - a.count);
                setTopkills(finalArray)
                    ;
            })
            .catch(error => console.error(error));
    }, []);

    const handleChange = (event) => {
        const items = data.filter(item => item.KILLER === event.target.value);
        let Conteo = []
        items.forEach((kills) => {
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

        const items2 = data.filter(item => item.MUERTE === event.target.value);
        let Conteo2 = []
        items2.forEach((kills) => {
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
                        onChange={handleChange} className='dropdown'>
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

export default Elites;
