/**
 * Created by Bruno on 04/03/2017.
 */
$(document).ready(function () {
    if ($('section.editorias').length) {
        news.init();
        $('#change-order').change(function () {
            if ($(this).val() == '1') {
                news.sortNewsByDate();
            } else if ($(this).val() == '2') {
                news.sortNewsByName()
            }
        });
        $('#filter-by').change(function () {
            news.filter($(this).val());
        });
    }
});

var news = {
    imagePath: './Arquivos/Imagens/Notícias/',
    news: [],
    newsFiltered: [],
    filterId: '',
    init: function () {
        var that = this;
        $.getJSON('./Arquivos/JSON/noticias.json', function (response) {
            that.treatNews(response[0].Editorias);
            that.setSelect(response[0].Editorias);
            that.sortNewsByDate();
        });
    },
    treatNews: function (news) {
        var that = this;
        news.forEach(function (editoria) {
            editoria['Notícias'].map(function (news) {
                news.Editoria = editoria.Editoria;
                news.Id = editoria.Id;
                that.news.push(news);
            });
        });
    },
    setSelect: function (editorias) {
        editorias.forEach(function (editoria) {
            $('#filter-by')
                .append(
                    $('<option></option>')
                        .text(editoria['Editoria'].toUpperCase())
                        .val(editoria['Id'])
                );
        });
    },
    sortNewsByName: function () {
        this.news = this.news.sort(function (a, b) {
            if (a['Título'] < b['Título']) {
                return -1;
            } else if (b['Título'] < a['Título']) {
                return 1;
            } else {
                return 0;
            }
        });
        this.mountList();
    },
    sortNewsByDate: function () {
        this.news = this.news.sort(function (a, b) {
            var dateFromA = new Date(a['Data de publicação'].split('-').reverse());
            var dateFromB = new Date(b['Data de publicação'].split('-').reverse());
            if (dateFromA.getTime() > dateFromB.getTime()) {
                return -1;
            } else if (dateFromB.getTime() > dateFromA.getTime()) {
                return 1;
            } else {
                return 0;
            }
        });
        this.mountList();
    },
    mountList: function () {
        $('#list-news').html('');
        var that = this;
        that.news.forEach(function (news) {
            var className = news.Id == that.filterId || that.filterId == '' ? 'visible' : '';
            $('#list-news').append(
                $('<li></li>')
                    .addClass(className)
                    .attr('data-category', news.Id)
                    .append(
                        $('<div></div>')
                            .addClass('box-news')
                            .append(
                                $('<span></span>')
                                    .addClass('date')
                                    .text(news['Data de publicação'].replace(/-/g, '/'))
                            )
                            .append(
                                $('<h3></h3>')
                                    .text(news.Editoria)
                            )
                            .append(
                                $('<img/>')
                                    .attr('src', that.imagePath + news['Foto'])
                            )
                            .append(
                                $('<h4></h4>')
                                    .text(news['Título'])
                            )
                            .append(
                                $('<p></p>')
                                    .text(news['Texto'])
                            )
                            .append(
                                $('<a></a>')
                                    .text('Saiba mais')
                                    .attr('href', '#')
                            )
                    )
            );
        });
        that.make3nMargin();
    },
    filter: function (id) {
        this.filterId = id;
        $('#list-news').find('li').addClass('visible');
        if (id != '') {
            $('#list-news').find('li').not('[data-category="' + id + '"]').removeClass('visible');
        }
        this.make3nMargin();
    },
    make3nMargin: function () {
        $('#list-news').find('li').removeClass('last-news');
        $('#list-news').find('li.visible').filter(function (i) {
            if (i > 0 && (i + 1) % 3 == 0) {
                $(this).addClass('last-news');
            }
        });
    }
}