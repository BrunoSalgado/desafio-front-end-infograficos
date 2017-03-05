/**
 * Created by Bruno on 04/03/2017.
 */
$(document).ready(function () {
    if ($('section.slide').length) {
        //GET SLIDE DATA
        $.getJSON('./Arquivos/JSON/slide.json', function (response) {
            var data = response[0];
            var qtd = data.imagens.length;
            if (qtd > 0) {
                var path = './Arquivos/Imagens/Slide/';
                for (var i = 0; i < qtd; i++) {
                    //APPEND IMAGES FROM JSON
                    $('section.slide').find('#list-slide')
                        .append(
                            $('<div><div/>')
                                .addClass(slide.classItem)
                                .attr('id', 'slide' + i)
                                .css('background', 'url(' + path + data.imagens[i] + ') no-repeat center center')
                        );
                }
                slide.init();
            }
        });
    }
    $('header .icon-menu').click(function () {
        $('nav.navbar').slideToggle(200);
    });
});

/*--------- NAVIGATION EVENTS ---------*/
$(document).on('click', '.dot', function () {
    slide.autoPlay = false;
    slide.changeFromDot($(this).data('slide'));
});

$(document).on('click', '.nav-next', function () {
    slide.autoPlay = false;
    slide.next();
});

$(document).on('click', '.nav-prev', function () {
    slide.autoPlay = false;
    slide.prev();
});
/*--------- END NAVIGATION EVENTS ---------*/

var slide = {
    slides: null,
    classActive: 'active-slide',
    classItem: 'item-slide',
    idNavigation: 'navigation-slide',
    time: 6000,
    autoPlay: true,
    qtdSlides: 0,
    init: function () {
        this.slides = $('.' + this.classItem);
        this.qtdSlides = this.slides.length;
        this.play();
        this.makeNavigation();
    },
    play: function () {
        var that = this;
        $(this.slides[0]).addClass(this.classActive);
        setInterval(function () {
            if (that.autoPlay) {
                that.next();
            }
        }, this.time);
    },
    prev: function () {
        var prevElement = $('.' + this.classItem).filter('.' + this.classActive).prev();
        if (prevElement[0] == null) {
            prevElement = $(this.slides[this.qtdSlides - 1]);
        }
        $('.' + this.classItem).filter('.' + this.classActive).hide().removeClass(this.classActive);
        prevElement.addClass(this.classActive).show();
        this.checkDot($(prevElement).attr('id'));
    },
    next: function () {
        var nextElement = $('.' + this.classItem).filter('.' + this.classActive).next();
        if (nextElement[0] == null) {
            nextElement = $(this.slides[0]);
        }
        $('.' + this.classItem).filter('.' + this.classActive).hide().removeClass(this.classActive);
        nextElement.addClass(this.classActive).show();
        this.checkDot($(nextElement).attr('id'));
    },
    checkDot: function (id) {
        $('#' + this.idNavigation)
            .find('.dot')
            .removeClass(this.classActive)
            .filter('[data-slide="#' + id + '"]')
            .addClass(this.classActive);
    },
    makeNavigation: function () {
        var that = this;
        $('#' + this.idNavigation)
            .append(
                $('<div></div>')
                    .addClass('nav-dots')
            )
            .append(
                $('<div></div>')
                    .text('<')
                    .addClass('nav-prev')
            )
            .append(
                $('<div></div>')
                    .text('>')
                    .addClass('nav-next')
            );
        for (var i = 0; i < that.qtdSlides; i++) {
            $('#' + this.idNavigation).find('.nav-dots').append(
                $('<div></div>')
                    .addClass('dot')
                    .attr('data-slide', '#slide' + i)
            )
        }
        $($('#' + this.idNavigation).find('.dot')[0]).addClass(this.classActive);
    },
    changeFromDot: function (id) {
        this.checkDot(id.replace('#', ''));
        $('.' + this.classItem).hide().removeClass(this.classActive);
        $('.' + this.classItem).filter(id).show().addClass(this.classActive);
    }
};
