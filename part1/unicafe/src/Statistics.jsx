const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad;

  const average = () => {
    return (good - bad) / total();
  };

  const positive_percentage = () => {
    return `${(good / total()) * 100} %`;
  };

  if (total() === 0) return <p>No feedback given</p>;

  return (
    <table>
      <tbody>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={total()} />
        <StatisticsLine text={"average"} value={average()} />
        <StatisticsLine text={"positive"} value={positive_percentage()} />
      </tbody>
    </table>
  );
};

export default Statistics;
