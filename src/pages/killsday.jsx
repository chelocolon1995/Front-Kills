import React from 'react';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

const Killsday = () => {
    const { killsday } = useParams();

    const [data, setData] = useState([]);
    const [topkills, setTopkills] = useState([]);
    const [topdeaths, setTopDeaths] = useState([]);
    const [individualKills, setIndividualKills] = useState([]);
    const [individualDeaths, setIndividualDeaths] = useState([]);
    const [killerMurdered, setKillerMuerdered] = useState(0);
    const [supportsMurdered, setSupportsMuerdered] = useState(0);
    const [countkills, setCountkills] = useState([]);
    const [countdeaths, setCountdeaths] = useState([]);
    const [countTotalKills, setTotalKills] = useState(0);
    const [countTotalDeaths, setTotalDeaths] = useState(0);

    const ADICCION = [
        "Zoel",
        "Diana6",
        "navajita",
        "Allucard",
        "CiriR",
        "LOBlTO",
        "INV3RN4",
        "ESKANOR",
        "JillML",
        "NielAndrew",
        "Hopper"
    ]

    const LEGENDS = [
        "ShaoKhan",
        "Slayme",
        "NightWind",
        "ChioAR",
        "Dkaniel",
        "PVPGrow",
        "Hiedra",
        "ChaPoGL",
        "iMrAppleBK",
        "Michus",
        "Hawke",
        "DsTrck",
        "Lonely",
        "NyxWhite",
        "Jezebeth",
        "xxCHyKyxx",
        "AssauIt",
        "CardiaKo",
    ]

    useEffect(() => {
        axios.get(`https://backendkills.onrender.com/api/day/${killsday}`)
            .then(response => {
                const filter = response.data.data
                setData(filter)
                const countsDeaths = {};
                filter.forEach(({ MUERTE }) => {
                    countsDeaths[MUERTE] = (countsDeaths[MUERTE] || 0) + 1;
                });
                const finalArray2 = Object.entries(countsDeaths)
                    .map(([MUERTE, count]) => ({ MUERTE, count }))
                    .sort((a, b) => b.count - a.count);

                let conteoDeaths = 0
                finalArray2.forEach((i) => {
                    conteoDeaths += i.count
                    console.log(conteoDeaths)
                })

                setTotalDeaths(conteoDeaths)
                setTopDeaths(finalArray2)

                const countsByCs = {};
                filter.forEach(({ KILLER }) => {
                    countsByCs[KILLER] = (countsByCs[KILLER] || 0) + 1;
                });

                const finalArray = Object.entries(countsByCs)
                    .map(([KILLER, count]) => ({ KILLER, count }))
                    .sort((a, b) => b.count - a.count);

                let conteoKills = 0
                finalArray.forEach((i) => {
                    conteoKills += i.count
                })
                setTotalKills(conteoKills)
                setTopkills(finalArray)
            })
            .catch(error => console.error(error));
    }, [killsday]);

    const handleChange = (event) => {
        const items = data.filter(item => item.KILLER === event.target.value);
        let Conteo = []
        let conteoKillers = 0
        let conteoSupport = 0
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

        const sort = Conteo.sort((a, b) => b.COUNT - a.COUNT)
        let conteoKills = 0
        sort.forEach((i) => {
            conteoKills += i.COUNT
        })
        setCountkills(conteoKills)
        setIndividualKills(sort)

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
        const sort2 = Conteo2.sort((a, b) => b.COUNT - a.COUNT)

        let conteoDeaths = 0
        sort2.forEach((i) => {
            conteoDeaths += i.COUNT
        })
        setCountdeaths(conteoDeaths)
        setIndividualDeaths(sort2)

        sort.forEach((kill) => {
            const i = LEGENDS.includes(kill.MUERTE)
            if (i === true) {
                conteoKillers += kill.COUNT
            } else {
                conteoSupport += kill.COUNT
            }
        })
        setKillerMuerdered(conteoKillers)
        setSupportsMuerdered(conteoSupport)
    }

    const Adiccion = (killer) => {
        const i = ADICCION.includes(killer)
        if (i === false) {
            return <td>{killer}</td>
        } else {
            return <td className="clan">{killer}</td>
        }

    }

    const Adiccion2 = (killer, index) => {
        const i = ADICCION.includes(killer)
        if (i === false) {
            return <option key={index} value={killer}>{killer}</option>
        } else {
            return <option className="clan" key={index} value={killer}>{killer}</option>
        }
    }

    return (
        <div className="App">
            <div className="d-flex justify-content-around">
                <div className="tabla">
                    <h1>Top Kills</h1>
                    <h4>Total : {countTotalKills} </h4>
                    <Table bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Position</th>
                                <th >Killer</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topkills.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {Adiccion(item.KILLER)}
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="tabla">
                    <h1>Top Deaths</h1>
                    <h4>-</h4>
                    <Table bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Position</th>
                                <th >Deaths Time</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topdeaths.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {Adiccion(item.MUERTE)}
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <div>
                        <select defaultValue="Seleccione Killer"
                            onChange={handleChange} className='dropdown'>
                            <option>Seleccione Killer</option>
                            {topkills.map((item, index) => (
                                Adiccion2(item.KILLER, index)
                            ))}
                        </select>
                    </div>
                    <br />
                    <div>
                        <div>
                            <h4>Killers Asesinados :  {killerMurdered}</h4>
                        </div>
                        <div>
                            <h4>Supports o Aliados Asesinados : {supportsMurdered}</h4>
                        </div>
                    </div>
                </div>
                <div className="tabla">
                    <h1>Counts of Kills</h1>
                    <Table bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Farmeado</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {individualKills.map((item, index) => (
                                <tr key={index}>
                                    {Adiccion(item.MUERTE)}
                                    <td>{item.COUNT}</td>
                                </tr>
                            ))}
                            <tr className="total" >
                                <th>TOTAL </th>
                                <th >{countkills}</th>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="tabla">
                    <h1>Counts of Deaths</h1>
                    <Table bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th >Farmeado</th>
                                <th >Counts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {individualDeaths.map((item, index) => (
                                <tr key={index}>
                                    {Adiccion(item.KILLER)}
                                    <td>{item.COUNT}</td>
                                </tr>
                            ))}
                            <tr className="total">
                                <th>TOTAL </th>
                                <th >{countdeaths}</th>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Killsday;