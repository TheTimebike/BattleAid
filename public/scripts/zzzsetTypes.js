function setTypes(types) {
    var typeDiv = document.getElementById("poketypeOne");
    typeDiv.innerText = types[0];

    var typeDiv = document.getElementById("typeCardOne");
    typeDiv.className = `typeCard ${types[0].toLowerCase()}`

    if (types.length > 1) {
        var typeDiv = document.getElementById("poketypeTwo");
        typeDiv.innerText = types[1];

        var typeDiv = document.getElementById("typeCardTwo");
        typeDiv.className = `typeCard ${types[1].toLowerCase()}`
    }
}