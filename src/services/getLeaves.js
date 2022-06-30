import constants from "../constants";

async function fetchLeaveData() {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("id_token"),
    },
    body: JSON.stringify({
      uniqueId: localStorage.getItem("id_token"),
      pageNumber: 0,
      pageSize: 10,
    }),
  };
  const response = await fetch(
    `${constants.apiUrl}/admin/leave/user`,
    requestOptions,
  );
  const data = await response.json();
  if (data.status) {
    return data.data.users;
  }
}

export default fetchLeaveData;
