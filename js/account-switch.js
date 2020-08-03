changeFocus("login", "signup");

$("#login-button").click(function(){changeFocus("login", "signup")});
$("#signup-button").click(function(){changeFocus("signup", "login")});

function changeFocus (focusMode, unfocusMode) {
    focus = $("#" + focusMode + "-button");
    unfocus = $("#" + unfocusMode + "-button");
    if (!focus.hasClass("box-login-type__item--active")) {
        // activate this
        focus.addClass("box-login-type__item--active");
        focus.children("svg").attr("fill", "#4A90E2");
        $("#" + focusMode + "-form").show();
        
        // deactivate other
        unfocus.removeClass("box-login-type__item--active");
        unfocus.children("svg").attr("fill", "#646464");
        $("#" + unfocusMode + "-form").hide();
    }
}
