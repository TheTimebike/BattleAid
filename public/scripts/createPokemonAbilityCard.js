function createPokemonAbilityCard(name, id, types, ha) {

    if (Object.keys(types).length < 2) {
        types["N/A"] = {"id": "N/A", "name": "N/A"}
    }

    if (id.includes("-") && !id.endsWith("-1")) {
        return 
    }

    imageid = id.replace("-1", "")

   var hidden = ""
    if (ha) {
        hidden = "<p>Hidden Ability</p>"
    }

    var columnDiv = document.createElement("div");
    columnDiv.id = id
    columnDiv.className = "column"

    columnDiv.innerHTML = `
    <div id="${name}" class="highlight expand headerCard" onclick="location.href='./pokemon.html?pokemon=${id}';">
        <h2 style="float:left;" id="pokename">${name}</h2>
        <div style="float:right;"><img loading="lazy" class="smallimg" onerror="imgError(this);" src=./images/${imageid}.png></div>
        <div style="clear: left;"/>
        ${hidden}
        <a href="type.html?type=${Object.values(types)[0].id}" id="typeCardOne" class="highlight expand typeCard ${Object.values(types)[0].name.toLowerCase()}">
            <h5 id="poketypeOne" class="antiexpand">${niceName(Object.values(types)[0].name)}</h5>
        </a>
        <a href="type.html?type=${Object.values(types)[1].id}" id="typeCardTwo" class="highlight expand typeCard ${Object.values(types)[1].name.toLowerCase()}">
            <h5 id="poketypeTwo" class="antiexpand">${niceName(Object.values(types)[1].name)}</h5>
        </a>
    </div>`
    var doc_body = document.getElementById("insertPokemon");
    doc_body.appendChild(columnDiv);
}