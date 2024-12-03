import React from 'react';
import * as XLSX from "xlsx";
import axios from "axios";

const baseURL = "https://backendkills.onrender.com/api";

const Upload = ({ greeting }) => {
    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            let someUsers = parsedData.filter(item => item.SERVER === "[GP-1]" && (item.MAPA === "Volcano" || item.MAPA === "Bloody" || item.MAPA === "Tormenta" || item.MAPA === "**"));
            const filter = someUsers.map((item) => {
                return {
                    KILLER: item.KILLER,
                    MUERTE: item.MUERTE,
                    MAPA: item.MAPA
                }
            });
            SaveFile(filter)
        };
    }

    const SaveFile = (filter) => {
        axios
            .post(`${baseURL}/1`, {
                filter
            })
            .then((response) => {
                console.log(response.data);
            });
    }

    return (
        <div className="App">
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />
        </div>
    );
}

export default Upload;
