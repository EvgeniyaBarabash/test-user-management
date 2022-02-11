const dataContainer = document.getElementById("tbody");
const mainTbl = document.getElementById("table_id");
const rowTbl = document.querySelector(".data-row");
const addRowBtn = document.querySelector(".add-row");
const removeAllBtn = document.querySelector(".remove-all");
const confirm = document.querySelector(".confirm");
addRowBtn.addEventListener("click", addRow);
removeAllBtn.addEventListener("click", removeAllItems);
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
            const markup = `<tr class="data-row" id="${user._id}">
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
        <button type="button" class="btn btn-outline-secondary" id="td-pen"><i class="bi-pencil-fill"></i></button>
        <button type="button" class="btn btn-outline-danger td-trash" id="trash-${user._id}"><i class="bi-trash"></i></button>
        <button type="button" class="btn btn-success" id="save-${user._id}">Save</button>
        <button type="button" class="btn btn-danger hidden" id="confirm-${user._id}">Confirm</button>
      </td>
      </tr>`;
            return markup;
        })
        .join("");
    dataContainer.innerHTML = markup;
    updatePut();
}

fetchUsers()
    .then((users) => {
        renderUserList(users);
        getBtn(users);
    })
    .catch((error) => console.log(error));

function getBtn(users) {
    users.map((user) => {
        const btnSave = document.getElementById(`save-${user._id}`);
        const btnConfirm = document.getElementById(`confirm-${user._id}`);
        const btnTrash = document.getElementById(`trash-${user._id}`);
        const trs = document.getElementById(`${user._id}`);
        let newData = { name: `${user.name}`, email: `${user.email}`, phone: `${user.phone}` }
        console.log(newData)
        btnSave.addEventListener("click", () => {
            putFetch(trs.id, newData);

        });
        btnTrash.addEventListener("click", () => {
            btnSave.classList.add("hidden");
            btnConfirm.classList.remove("hidden");
            trs.style.backgroundColor = "rgb(224, 146, 146)";
            btnConfirm.addEventListener("click", () => {
                const trs = document.getElementById(`${user._id}`);
                deleteRow(user._id);
                trs.remove();
            });
        });
    });
}

function deleteRow(id) {
    fetch(`${baseURL}/api/data/${id}`, {
        method: "DELETE",
    });
}

function addRow() {
    let tableBody = document.getElementById("tbody");
    let newRow = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        let newCell = document.createElement("td");
        newRow.appendChild(newCell);
        if (i === 3) {
            newCell.innerHTML = `<button type="button" class="btn btn-outline-secondary" id="td-pen"><i class="bi-pencil-fill"></i></button>
            <button type="button" class="btn btn-outline-danger td-trash" ><i class="bi-trash"></i></button>
             <button type="button" class="btn btn-success" >Save</button>
             <button type="button" class="btn btn-danger hidden">Confirm</button>`;
        }
    }
    tableBody.appendChild(newRow);
    updatePut()
}

function removeAllItems() {
    dataContainer.style.backgroundColor = "rgb(224, 146, 146)";
    confirm.classList.remove("hidden");
    confirm.addEventListener("click", () => {
        fetch(`${baseURL}/api/data/`, {
            method: "DELETE",
        });
        dataContainer.remove();
        confirm.classList.add("hidden");
    });
}

function updatePut() {
    [...document.querySelectorAll("td")].forEach((el) => {
        el.addEventListener("click", (e) => {
            e.target.contentEditable = true;
            e.target.focus();
            console.log(e.target.textContent)
        });
    });
}

function putFetch(id, obj) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    }
    fetch(`${baseURL}/api/data/${id}`, options)
}