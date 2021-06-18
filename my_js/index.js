$('.popover-dismiss').popover({
    trigger: 'focus'
});

const jsonXHR = $.getJSON("./all_texts.json", function (data) {

    $("#main_header").html(data.main_header_text[lang]);
    $("#projects_header").html(data.projects_header_text[lang]);
    $("#about_me_header").html(data.about_me_header_text[lang]);
    $("#about_me_corpus").html(data.about_me_corpus_text[lang]);
    $("#collection_header").html(data.collection_header_text[lang]);
    $("#collection_sub_header").html(data.collection_sub_header_text[lang]);
    $("#changeLanguageButton").html(data.lang_verbose[lang]);
    $("#coffee_text").html(data.coffee_text[lang]);

    $('#non_profit').html(data.non_profit_enterprise_text[lang]);
    $('#psych_exp').html(data.psychological_experiment_text[lang]);

    $('#nka_summary').html(data.nka_summary[lang]);
    $('#sip_summary').html(data.sip_summary[lang]);
    $('#bart_summary').html(data.bart_summary[lang]);
    $('#morphing_summary').html(data.morphing_summary[lang]);

    $("#vue_img").attr({ "data-content": data.vue_popover_content_text[lang], "data-title": data.confident[lang] });

    $("#python_img").attr({ "data-content": data.python_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#node_img").attr({ "data-content": data.node_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#mongo_img").attr({ "data-content": data.mongo_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#linux_img").attr({ "data-content": data.linux_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#pandas_img").attr({ "data-content": data.pandas_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#git_img").attr({ "data-content": data.git_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#css_img").attr({ "data-content": data.css_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#django_img").attr({ "data-content": data.django_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#php_img").attr({ "data-content": data.php_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#html_img").attr({ "data-content": data.html_popover_content_text[lang], "data-title": data.confident[lang] });
    $("#matlab_img").attr({ "data-content": data.matlab_popover_content_text[lang], "data-title": data.satisfactory[lang] });
    $("#keras_img").attr({ "data-content": data.keras_popover_content_text[lang], "data-title": data.learning[lang] });
    $("#tensorflow_img").attr({ "data-content": data.tensorflow_popover_content_text[lang], "data-title": data.learning[lang] });

    $('#click_on_symbols').html(data.click_on_symbols_text[lang]);

    $('[data-toggle="popover"]').popover();
});

function changeLang(lan) {
    window.localStorage.setItem("lang", lan);
    window.location.reload();
}

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.target.id === "trigger_click_tip") {
            if (entry.intersectionRatio > 0) {
                $("#click_tip").css('display', 'flex');
                $("body").css('overflow-y', 'hidden');
                console.log('shown!');
                Obs.unobserve(entry.target);
            }
        } else {
            entry.target.children[0].classList.toggle("is-inViewport", entry.isIntersecting);
            console.log('toggled');
        }


    });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options

// Attach observer to every [data-inviewport] element:
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
});

function closeClickTip() {
    $("#click_tip").remove();
    $("body").css('overflow-y', 'scroll');
}