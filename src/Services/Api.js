const BASE_URL = "http://localhost:5000/api";

// Obtener el token del almacenamiento local
const getToken = () => localStorage.getItem("authToken");

// Función para realizar solicitudes GET
export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/tareas`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las tareas.");
  }

  return await response.json();
};

// Función para agregar una nueva tarea
export const createTodo = async (newTodo) => {
  const response = await fetch(`${BASE_URL}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error("Error al agregar la tarea.");
  }

  return await response.json();
};

// Función para actualizar una tarea existente
export const updateTodo = async (id, updatedTodo) => {
  const response = await fetch(`${BASE_URL}/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea.");
  }

  return await response.json();
};

// Función para eliminar una tarea
export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/tareas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea.");
  }

  return await response.json();
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en las credenciales.");
  }

  return await response.json(); // Devuelve el token
};

// Función para registrar un nuevo usuario
export const registerUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el usuario.");
  }

  return await response.json();
};
