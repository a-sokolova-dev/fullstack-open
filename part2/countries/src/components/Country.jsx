import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
      <img src={country.flags.png} height={150} width={150} alt={`Flag of ${country.name.common}`} />
      <Weather capital={country.capital[0]} />
    </div>
  );
};

export default Country;
