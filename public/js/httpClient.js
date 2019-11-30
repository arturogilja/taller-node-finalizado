async function makeRequest(url, method, data, token) {
  let response;
  if (method === "POST" || method === "PUT") {
    response = await fetch(url, {
      method, // POST, PUT.
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  } else {
    response = await fetch(url, {
      method, // GET, DELETE
      headers: {
        authorization: token
      }
    });
  }
  return response;
}
