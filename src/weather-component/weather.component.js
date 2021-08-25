import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Weather = (props) => {
    return (
        <div className="contanier">
            <div className="card">
                <h1>{props.city}</h1>
                <h5 className="py-4"><FontAwesomeIcon className={`display-1`} icon={props.pic} /></h5>
                {props.temp ? <h1 className="py-2">{props.temp}&deg;</h1> : null}
                {/* min and max Temp */}
                {minmaxTemp(props.temp_min, props.temp_max)}
                <h4 className="py-4">{props.cloud}</h4>
            </div>
        </div>
    )
}

function minmaxTemp(min, max) {
    if (min && max) {
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}

export default Weather;