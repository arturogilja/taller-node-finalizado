async function makeRequest(url, method, data, token) {
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      authorization: token
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json();
}
