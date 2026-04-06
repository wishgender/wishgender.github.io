
function reveal() {
    document.getElementById("kobyDiv").style.display = "block";
}
document.getElementById("revButton").addEventListener("click", () => {
    reveal();
    document.getElementById("revButton").style.display = "none";
})