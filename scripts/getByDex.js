function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPokemon() {
    const dexNumber = document.getElementById('dexInput').value;
    const result = document.getElementById('result');
    // Clear previous result
    result.textContent = "Loading...";
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        return response.json();
    })
    .then(data => {
        result.textContent = `Pokémon #${dexNumber} is ${capitalize(data.name)}`;
    })
    .catch(error => {
        result.textContent = error.message;
    });
}
