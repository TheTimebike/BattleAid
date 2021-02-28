function createAbilities(name, id, desc) {

    var columnDiv = document.createElement("div");
    columnDiv.id = id
    columnDiv.className = "column"

    columnDiv.innerHTML = `
    <div id="${id}" class="highlight expand headerCard">
        <h2 id="pokename">${name}</h2>
        <hr>
        <h5>${desc}</h5>
    </div>`
    var doc_body = document.getElementById("insertCards");
    doc_body.appendChild(columnDiv);
}