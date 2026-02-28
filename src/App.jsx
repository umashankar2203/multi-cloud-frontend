import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [backend, setBackend] = useState("AWS");

  const API_URLS = {
    AWS: import.meta.env.VITE_API_AWS,
    GCP: import.meta.env.VITE_API_GCP,
  };

  useEffect(() => {
    fetch(`${API_URLS[backend]}/api/message`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, [backend]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Multi-Cloud DevOps Deployment</h1>

      <button onClick={() => setBackend("AWS")}>Use AWS</button>
      <button onClick={() => setBackend("GCP")} style={{ marginLeft: "10px" }}>
        Use GCP
      </button>

      <h2 style={{ marginTop: "30px" }}>
        Backend Response: {message}
      </h2>
    </div>
  );
}

export default App;
