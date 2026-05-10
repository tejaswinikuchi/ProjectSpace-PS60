export async function fetchCustomers() {
  const response = await fetch("http://localhost:5000/customers");

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  const data = await response.json();

  return data;
}