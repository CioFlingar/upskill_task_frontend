import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/expenses/");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // console.log("Component mounted");
  }, []);

  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </nav>

      <div className="card bg-amber-400 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Expenses</h2>
          <p>
            {data ? (
              <ul>
                {data.map((item) => (
                  <li key={item.id}>
                    {item.title}: ${item.amount}
                  </li>
                ))}
              </ul>
            ) : (
              "Loading..."
            )}
          </p>
        </div>
        <figure></figure>
      </div>
    </>
  );
}

export default App;
