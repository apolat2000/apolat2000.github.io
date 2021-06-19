// $('.popover-dismiss').popover({
//     trigger: 'focus'
// });
$(() => {
    updateLanguage();
    //$('[data-toggle="popover"]').popover();
})

function updateLanguage() {

    const lang = window.localStorage.getItem("lang");

    $.getJSON("./all_texts.json", function (data) {

        $("#main_header").html(data.main_header_text[lang]);
        $("#projects_header").html(data.projects_header_text[lang]);
        $("#about_me_header").html(data.about_me_header_text[lang]);
        $("#about_me_corpus").html(data.about_me_corpus_text[lang]);
        $("#collection_header").html(data.collection_header_text[lang]);
        $("#collection_sub_header").html(data.collection_sub_header_text[lang]);
        $("#changeLanguageButton").html(data.lang_verbose[lang]);
        $("#coffee_text").html(data.coffee_text[lang]);

        $('#non_profit').html(data.non_profit_enterprise_text[lang]);
        $('.psych_exp').html(data.psychological_experiment_text[lang]);

        $('#cantOpenModalHeader').html(data.cant_open_modal_header[lang]);
        $('#cantOpenModalP').html(data.cant_open_modal_p[lang]);

        $('#nka_summary').html(data.nka_summary[lang]);
        $('#sip_summary').html(data.sip_summary[lang]);
        $('#bart_summary').html(data.bart_summary[lang]);
        $('#morphing_summary').html(data.morphing_summary[lang]);

        const badgesArray = [{ name: "vue", tit: "confident", tit: "confident" },
        { name: "python", tit: "confident" }, { name: "node", tit: "confident" },
        { name: "mongo", tit: "confident" }, { name: "linux", tit: "satisfactory" },
        { name: "pandas", tit: "confident" }, { name: "git", tit: "confident" },
        { name: "css", tit: "satisfactory" }, { name: "django", tit: "satisfactory" },
        { name: "php", tit: "satisfactory" }, { name: "html", tit: "confident" },
        { name: "matlab", tit: "satisfactory" }, { name: "keras", tit: "learning" },
        { name: "tensorflow", tit: "learning" }];

        badgesArray.forEach(e => {
            $(`#${e.name}_img`).popover({
                trigger: 'focus',
                placement: 'auto',
                content: data[`${e.name}_popover_content_text`][lang],
                title: data[e.tit][lang]
            })
        });

        $('#click_on_symbols').html(data.click_on_symbols_text[lang]);
    });
}

function changeLang(lan) {
    window.localStorage.setItem("lang", lan);
    updateLanguage();
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

function cantOpen(exp) {
    $('#cantOpenModal').modal();
}