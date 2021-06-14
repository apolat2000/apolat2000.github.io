var lang = window.localStorage.getItem("lang");

if (!lang) {
    window.localStorage.setItem("lang", "de");
}

$(function () {
    $('[data-toggle="popover"]').popover()
});

$('.popover-dismiss').popover({
    trigger: 'focus'
});

const jsonXHR = $.getJSON("./all_texts.json", function (data) {


    $("#main_header").html(data.main_header_text[lang]);
    $("#projects_header").html(data.projects_header_text[lang]);
    $("#collection_header").html(data.collection_header_text[lang]);
    $("#collection_sub_header").html(data.collection_sub_header_text[lang]);
    $("#changeLanguageButton").html(data.lang_verbose[lang]);
});

console.log(jsonXHR);

function changeLang(lan) {
    window.localStorage.setItem("lang", lan);
    window.location.reload()
}