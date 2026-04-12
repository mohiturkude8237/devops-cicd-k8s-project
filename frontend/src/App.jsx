import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const API = "http://13.126.198.84:5000"; // your EC2 backend

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (!name) return;
    try {
      await axios.post(`${API}/add`, { name });
      setName("");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #141e30, #243b55, #0f2027)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          padding: "35px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          width: "380px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            color: "#fff",
            marginBottom: "25px",
            fontSize: "28px",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          🚀 User Manager
        </h1>

        {/* Input + Button */}
        <div style={{ marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px",
              width: "65%",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              marginRight: "10px",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          />

          <button
            onClick={addUser}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(45deg, #00c6ff, #0072ff)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.target.style.transform = "scale(1)")
            }
          >
            Add
          </button>
        </div>

        {/* User List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li
              key={u._id}
              style={{
                padding: "12px",
                margin: "10px 0",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  "rgba(255,255,255,0.25)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  "rgba(255,255,255,0.12)")
              }
            >
              {u.name}

              <button
                onClick={() => {
                  if (window.confirm("Delete this user?")) {
                    deleteUser(u._id);
                  }
                }}
                style={{
                  background:
                    "linear-gradient(45deg, #ff4b2b, #ff416c)",
                  border: "none",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
