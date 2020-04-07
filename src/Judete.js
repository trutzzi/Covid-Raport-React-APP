import React from 'react'
import MyChart from './Raport';
function Judete(props) {
    return (
        <div>
            <div className="container">
                <h2 className="title">Raport evolutie cazuri </h2>
                <p>Evolutia cazurilor noi si a cazurilor in total ordine cronologica  </p>
            </div>
            <div className="filter">
                <div className="container">
                    <label>Tip Raport</label>
                    <select onChange={(e) => props.onFilter(e)} value={props.data.newCase}>
                        <option value="true">Cazuri noi</option>
                        <option value="false">Evolutie</option>
                    </select>
                </div>
            </div>
            <div className="container">
                <div>
                    {props.data.loadedRaport ? <MyChart newCase={props.data.newCase} data={props.data.dataRaport} /> : 'Loading...'}
                </div>
        </div >
        </div>)
}
export default Judete