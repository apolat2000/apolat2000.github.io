var lang = window.localStorage.getItem("lang");

if (!lang) {
    window.localStorage.setItem("lang", "de");
}

$(function () {
    
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

    $("#vue_img").attr({ "data-content": data.vue_popover_content_text[lang], "data-title": data.confident[lang] });

    $("#python_img").attr({ "data-content": data.vue_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#node_img").attr({ "data-content": data.node_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#mongo_img").attr({ "data-content": data.mongo_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#linux_img").attr({ "data-content": data.linux_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#pandas_img").attr({ "data-content": data.pandas_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#css_img").attr({ "data-content": data.css_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#django_img").attr({ "data-content": data.django_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#html_img").attr({ "data-content": data.html_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#matlab_img").attr({ "data-content": data.matlab_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#keras_img").attr({ "data-content": data.keras_popover_content_text[lang], "data-title": data.learning[lang] });
    $("#tensorflow_img").attr({ "data-content": data.tensorflow_popover_content_text[lang], "data-title": data.learning[lang] });





    $('[data-toggle="popover"]').popover()
});

function changeLang(lan) {
    window.localStorage.setItem("lang", lan);
    window.location.reload()
}