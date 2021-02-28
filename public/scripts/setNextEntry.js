function setNext(id) {
    if (id !== "151") {
        var statDiv = document.getElementById("nextbutton");
        statDiv.href = `pokemon.html?pokemon=${parseInt(id)+1}`
    }
}