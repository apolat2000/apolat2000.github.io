var lang = window.localStorage.getItem("lang");

if (!lang) {
    window.localStorage.setItem("lang", "de");
}

//document.getElementById("main_header").innerHTML = 