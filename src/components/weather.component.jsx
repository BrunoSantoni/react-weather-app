import React from 'react';

const Weather = (props) => {
  return(
    <div className="container">
      <div className="cards pt-4"> {/* pt-4 means padding top = 4 */}
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.icon} display-1`}></i>
        </h5>
        
        {props.temperature ? (<h1 className="py-2">{props.temperature}&deg;C</h1>) : null}

        {/* Show min and max temperatures */}
        {minMaxTemp(props.minTemperature, props.maxTemperature)}

        <h4 className="py-3">{props.description}</h4>
      </div>      
    </div>
  );
};

function minMaxTemp(min, max) {
  if(min && max) {
    return(
      <h3>
        <span className="px-4">{min}&deg;C</span>
        <span className="px-4">{max}&deg;C</span>
      </h3>
    );
  }
  
}

export default Weather;