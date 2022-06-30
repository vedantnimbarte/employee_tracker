import constants from "../constants";

async function fetchHolidayData() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("id_token"),
    },
    body: JSON.stringify({
      pageNumber: 0,
      pageSize: 10,
    }),
  };
  const response = await fetch(
    `${constants.apiUrl}/admin/holiday`,
    requestOptions,
  );
  const data = await response.json();
  if (data.status) {
    return data.data.users;
  }
}

export default fetchHolidayData;
