import React, {useEffect, useRef, useState} from 'react';
import {DataService} from "./api/data";
import {PDFService} from "./api/pdf";
import {FormService} from "./api/formFields";
import {IPdfData} from "./services/types";
import './App.css';

function App() {
    const viewer = useRef<HTMLDivElement>(null);
    const [pdfData, setPdfData] = useState<IPdfData | undefined>(undefined)

    useEffect(() => {
        Promise.all([
            DataService.getData(),
            PDFService.getWebViewer(viewer)
        ]).then((response) => {
            setPdfData(response[0].data[0])
            FormService.addFields(response[0].data[0], response[1])
        }).catch(err => alert(err))
    }, [])

    return (
        <div className="wrapper">
            <div className="header">{pdfData?.title}</div>
            <div className="viewer" ref={viewer} />
        </div>
    );
}

export default App;
