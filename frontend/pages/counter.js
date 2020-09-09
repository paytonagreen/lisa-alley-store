import { useState } from "react";

const CounterPage = (props) => {
  return (
    <div>
      <Counter />
    </div>
  );
};

const Counter = (props) => {
  const [count, setCount] = useState(0);
  const upCount = () => setCount(count + 1);
  const downCount = () => setCount(count - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={upCount}>Increase Count</button>
      <button onClick={downCount}>Decrease Count</button>
    </div>
  );
};

export default CounterPage;