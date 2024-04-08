import { useState, useEffect } from "react";
import Country from "./Country";

const CountryList = ({ countries }) => {
  const [viewedCountry, setViewedCountry] = useState(null);

  useEffect(() => {
    if (countries.length === 1) setViewedCountry(countries[0]);
    else setViewedCountry(null);
  }, [countries]);

  const handleCountryShow = (c) => {
    setViewedCountry(c);
  };

  if (viewedCountry) {
    return <Country country={viewedCountry} />;
  }

  if (countries.length > 10) {
    return <div>Too many matches, please specify another filter</div>;
  }

  return (
    <>
      {countries.map((c) => (
        <div key={c.cca2}>
          {c.name.common}{" "}
          <button onClick={() => handleCountryShow(c)}>show</button>
        </div>
      ))}
    </>
  );
};

export default CountryList;
