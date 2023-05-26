async function register(username, password) {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur d'inscription");
  }

  const data = await response.json();

  console.log(data.message); // "User created"
}

async function login(username, password) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur de connexion");
  }

  const data = await response.json();

  console.log(data.message); // "Login successful"
}
