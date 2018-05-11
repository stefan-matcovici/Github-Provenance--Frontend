// http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar
// jQuery time
let current_fs, next_fs, previous_fs; //fieldsets
let current_fs_name;
let left, opacity, scale; //fieldset properties which we will animate
let animating; //flag to prevent quick multi-click glitches

$(".repo-list-next").click(function (event) {
    console.log("there");
    let selectedRepository = $(".stored-list").children(".active");
    if (selectedRepository.length === 0) {
        event.stopImmediatePropagation();
        showErrorModal("You didn't select any repository");
    }
});

$(".next").click(function () {
    console.log("here");

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    current_fs_name = $(this).attr("name");

    switch (current_fs_name) {
        case "next":
            next_fs = $(this).parent().next();
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            break;
        case "next-next":
            next_fs = $(this).parent().next().next();
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            break;
        case "next-next-next":
            next_fs = $(this).parent().next().next().next();
            break;
    }

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'transform': 'scale(' + scale + ')'});
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().parent().children("fieldset:first-of-type");

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    $("#progressbar li").eq($("fieldset").index(previous_fs)).addClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function () {
    return false;
});

function showErrorModal(text) {
    $('#modal-text').text(text);
    $('#error-modal').modal('show');
}