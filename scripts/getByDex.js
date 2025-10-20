function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function checkDate() {
    // now = Date(Date.now()).slice(4,10)
    const d = new Date();
    if (d.getMonth()==7 && d.getDate()==3) return true;
    else if (d.getMonth()==4 && d.getDate()==31) return true;
    else if (d.getMonth()==9 && d.getDate()==27) return true;
    else if (d.getMonth()==0 && d.getDate()==2) return true;
    else if (d.getMonth()==10 && d.getDate()==14) return true;
    else return false;
}
function getPokemon() {
    const dexNumber = document.getElementById('dexInput').value;
    const result = document.getElementById('DexResult');
    const caption = document.getElementById('ResultText');
    // Clear previous result
    caption.textContent = "Loading...";
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        return response.json();
    })
    .then(data => {
        let textContent = `Pokémon #${dexNumber} is ${capitalize(data.species.name)}`;
        caption.textContent = textContent;
        let pic = document.getElementById('ResultPic');
        if (checkDate())
            pic.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${dexNumber}.png`;
        else
            pic.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`;
        result.style = 'text-align:center;'
        if (pic.src !== '') pic.style = 'display: auto';
    })
    .catch(error => {
        result.textContent = error.message;
    });
}
