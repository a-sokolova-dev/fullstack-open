import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import axios from "axios";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (filter) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [filter]);

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <CountryList countries={countriesToShow} />
    </div>
  );
}

export default App;
