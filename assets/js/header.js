/**
 * Created by Bruno on 04/03/2017.
 */
$(document).ready(function () {
    if ($('header .navbar').length) {
        $('header .navbar li').mouseenter(function () {
            if ($(this).find('ul').length) {
                $(this).find('ul').slideDown(200);
            }
        });
        $('header .navbar li').mouseleave(function () {
            if ($(this).find('ul').length) {
                $(this).find('ul').slideUp(200);
            }
        });
    }
});