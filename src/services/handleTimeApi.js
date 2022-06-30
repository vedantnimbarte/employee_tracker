import constants from "../constants";

async function handleTimeApi(body) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("id_token"),
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${constants.apiUrl}/time`, requestOptions);
  const data = await response.json();
  return data;
}

export default handleTimeApi;
