import React from 'react'

function JudeteTabel(props) {
    let idStart = 0;
    function id() {
        idStart++;
        return idStart
    }
    return (
        <React.Fragment>
            < div className="container" >
                <h2 className="title">Situatia pe judete</h2>
                <p>Cazurile inregistrate in judete, ulterior pacientii pot fi mutati pentru tratament </p>
                <h3>Cazuri: {props.data.loaded ? props.data.data.data.total : ''}</h3>
            </div >
            <div className="filter">
                <div className="container">
                    <label>Judet: </label>
                    <select name="city" value={props.data.citySelected} onChange={(e) => props.onFilter(e)}>
                        <option value="ALL">TOATE JUDETELE INFECTATE</option>
                        {props.data.loaded ?
                            props.data.data.data.data.slice(1).map(i => { { id() } return <option key={id()} value={i.county}>{i.county}</option> })
                            : ''}
                    </select>
                </div>
            </div>
            <div className="container">
                <div className="item">
                    <div className='table'>
                        <div className="grid th">
                            <div className="col th">Judet</div>
                            <div className="col th">Total</div>
                            <div className="col th">Decese</div>
                            <div className="col th">Vindecati</div>
                        </div>
                        {props.data.loaded ? props.render() : 'Loading...'}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default JudeteTabel