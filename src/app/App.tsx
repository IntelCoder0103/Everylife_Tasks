import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "@/assets/vite.svg";
import Tasks from "@/features/tasks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="header__title">Everylife Technologies</h1>
      </div>
      <div className="card">
        <Tasks />
      </div>
    </>
  );
}

export default App;
