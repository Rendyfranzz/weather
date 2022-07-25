import React from 'react'
import { formatToLocalTime } from '../service/WeatherAPI';

const TimeAndLocation = ({weather:{ dt, timezone, name, country }}) => {
  return (
    <div className=' m-auto w-[80%]'>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation