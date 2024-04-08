import Country from "./Country";

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    let country = countries[0];
    return <Country country={country} />;
  }

  if (countries.length > 10) {
    return <div>Too many matches, please specify another filter</div>;
  }

  return (
    <>
      {countries.map((c) => (
        <div key={c.cca2}>{c.name.common}</div>
      ))}
    </>
  );
};

export default CountryList;
