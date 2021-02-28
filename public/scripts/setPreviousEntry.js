function setPrev(id) {
    if (id !== "001") {
        var statDiv = document.getElementById("prevbutton");
        statDiv.href = `pokemon.html?pokemon=${parseInt(id)-1}`
    }
}