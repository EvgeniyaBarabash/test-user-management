const dataContainer = document.getElementById("tbody");
const baseURL = "http://localhost:3000";

function fetchUsers() {
    return fetch(`${baseURL}/api/data`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((data) => data.data.result)
        .catch((error) => console.log(error));
}

function renderUserList(users) {
    const markup = users
        .map((user) => {
            return `<tr class="data-row">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
          </tr>`;
        })
        .join("");
    dataContainer.insertAdjacentHTML("beforeend", markup);
}
fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));


const mainTbl = document.getElementById("table_id")
const trs = mainTbl.getElementsByTagName("tr");

const tds = document.createElement('td');




