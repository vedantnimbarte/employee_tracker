import constants from "../constants";

async function submitLeave({ fromDate, toDate, reason, type }) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("id_token"),
    },
    body: JSON.stringify({
      userId: localStorage.getItem("id_token"),
      startDate: fromDate,
      endDate: toDate,
      description: reason,
      type: type,
    }),
  };
  const response = await fetch(
    `${constants.apiUrl}/admin/leave/new`,
    requestOptions,
  );
  const data = await response.json();
  if (data.status) {
    return data.data.users;
  }
}

export default submitLeave;
