function createCard(name, id, types, url, stats, gender, ability, HA, form) {
    var columnDiv = document.createElement("div");
    columnDiv.id = id
    columnDiv.className = "column detailed"

    imgurl = id.replace("-1", "")
    console.log(form);
    if (form !== "") {
        imgurl = `${id.split("-")[0]}-${form}`
    }

    if (Object.keys(types).length < 2) {
        types["N/A"] = {"id": "N/A", "name": "N/A"}
    }

    if (Object.keys(ability).length < 2) {
        ability.push({"id": "N/A", "name": "N/A"})
    }

    var paddedID = id
    if (paddedID.includes("-")) {
        paddedID = pad(id.split("-")[0], 3) +"-"+ id.split("-")[1]
    } else {
        paddedID = pad(id, 3)
    }

    var female_chance = (gender / 8) * 100
    var male_chance = 100 - female_chance

    columnDiv.innerHTML = `
    <div id="${id}" class="card">
        <div class="pokedexnumber">${paddedID}</div>
        <h2 id="pokename">${name}</h2>
        <hr>
        <a href="pokemon.html?pokemon=${name.toLowerCase()}"><img loading="lazy" id="pokeimg" class="pimg" src=./images/${imgurl}.png></a>
        <a href="type.html?type=${Object.values(types)[0].id}" id="typeCardOne" class="highlight expand typeCard ${Object.values(types)[0].name.toLowerCase()}">
            <h5 id="poketypeOne" class="antiexpand">${niceName(Object.values(types)[0].name)}</h5>
        </a>
        <a href="type.html?type=${Object.values(types)[1].id}" id="typeCardTwo" class="highlight expand typeCard ${Object.values(types)[1].name.toLowerCase()}">
            <h5 id="poketypeTwo" class="antiexpand">${niceName(Object.values(types)[1].name)}</h5>
        </a>
        <div class="statHolder">
            <div id="hp" class="sixsplit healthCard">
                <p>${stats[0]}</p>
                <p>HP</p>
            </div>
            <div id="attack" class="sixsplit attackCard">
                <p>${stats[1]}</p>
                <p>Atk</p>
            </div>
            <div id="defense" class="sixsplit defenseCard">
                <p>${stats[2]}</p>
                <p>Def</p>
            </div>
            <div id="spattack" class="sixsplit spAttackCard">
                <p>${stats[3]}</p>
                <p>Sp.Atk</p>
            </div>
            <div id="spdefense" class="sixsplit spDefenseCard">
                <p>${stats[4]}</p>
                <p>Sp.Def</p>
            </div>
            <div id="speed" class="sixsplit speedCard">
                <p>${stats[5]}</p>
                <p>Speed</p>
            </div>
        </div>
        <div class="statHolder">
            <a href="ability.html?ability=${ability[0].id}" class="highlight expand sixsplit ability abilityCard">
                <h5 class="antiexpand">${ability[0].name}</h5>
            </a>
            <a href="ability.html?ability=${ability[1].id}" class="highlight expand sixsplit ability abilityCard">
                <h5 class="antiexpand">${ability[1].name}</h5>
            </a>
        </div>
        <div class="statHolder">
            <a href="ability.html?ability=${HA.id}" class="highlight expand sixsplit abilityHA">
                <h5 class="antiexpand">${HA.name}</h5>
            </a>
        </div>
        <div class="progresscontainer">
            <div class="progressbar">
                <div class="progress" style="width:${male_chance}%"></div>
            </div>
        <div class="progressbarundertext male">${male_chance}% Male</div><div class="progressbarundertext female">${female_chance}% Female</div>
        </div>
        </div>`

    var doc_body = document.getElementById("insertCards");
    doc_body.appendChild(columnDiv);
}