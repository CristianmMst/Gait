export async function generateToken() {
  const response = await fetch("http://localhost:4000/admin/generate_token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: data.message,
    };
  }

  return data;
}
