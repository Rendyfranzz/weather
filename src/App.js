import { useEffect,useState } from 'react';
import './App.css';
import Header from './components/Header';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import getFormattedWeatherData from './service/WeatherAPI';
import Inputs from './components/Inputs';
import Forecast from './components/Forecast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [query, setQuery] = useState({ q: "ngampel,id" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        console.log(data);

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 27 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div className={ ` min-h-screen overflow-hidden overflow-y-auto box-border flex flex-col items-center justify-center bg-gradient-to-r from-cyan-600 to-slate-800 ${formatBackground()}`}>
      <Header/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
       <TimeAndLocation weather={weather}/>
       <TemperatureAndDetails weather={weather}/>
       <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
       </div>)}
       <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
