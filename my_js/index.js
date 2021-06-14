var lang = window.localStorage.getItem("lang");

if (!lang) {
    window.localStorage.setItem("lang", "de");
}

const jsonXHR = $.getJSON("./all_texts.json", function (data) {


    $("#main_header").html(data.main_header_text[lang]);
});

console.log(jsonXHR);