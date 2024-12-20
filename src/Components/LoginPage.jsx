import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Alternar entre registro e inicio de sesión

  // Manejar el envío del formulario de inicio de sesión
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error al iniciar sesión");
        return;
      }

      const { token } = await response.json();
      onLogin(token); // Pasar el token al componente principal
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  // Manejar el envío del formulario de registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error al registrar usuario");
        return;
      }

      setError(null);
      setIsRegistering(false); // Cambiar a la vista de inicio de sesión después de registrar
      alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
    } catch (err) {
      setError("Error al registrar usuario. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-page">
      <h2>To-Do List by Leoncino</h2> {/* Cambiar el título */}
      {error && <p className="error">{error}</p>}
      {isRegistering ? (
        // Formulario de registro
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      ) : (
        // Formulario de inicio de sesión
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      )}
      {/* Alternar entre registro e inicio de sesión */}
      <p>
        {isRegistering ? (
          <>
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="toggle-button"
            >
              Inicia Sesión
            </button>
          </>
        ) : (
          <>
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className="toggle-button"
            >
              Regístrate
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default LoginPage;
