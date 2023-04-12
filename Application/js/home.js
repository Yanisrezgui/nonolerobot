document.getElementById("settings-page").addEventListener("click", () => {
    document.getElementsByClassName("controleurs")[0].style.display = "block";
    document.getElementsByClassName("controleurs")[1].style.display = "none";
})

document.getElementById("stats-page").addEventListener("click", () => {
    document.getElementsByClassName("controleurs")[0].style.display = "none";
    document.getElementsByClassName("controleurs")[1].style.display = "block";
})

document.getElementsByClassName("controleurs")[1].style.display = "none";
