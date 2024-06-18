ReactDOM.hydrateRoot(document.getElementById("root"), <Likes />);

function Likes() {
  const [count, setCount] = React.useState(0);

  return (
    <figure>
      <button onClick={() => setCount((count) => count + 1)}>+</button>
      <span>♥ {count}</span>
      <button onClick={() => setCount((count) => count - 1)}>-</button>
    </figure>
  );
}
