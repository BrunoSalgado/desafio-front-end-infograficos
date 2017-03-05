/**
 * Created by Bruno on 04/03/2017.
 */
$(document).ready(function () {
    if ($('section.editorias').length) {
        news.makeHome();
        $('#change-order').change(function () {
            if ($('#filter-by').val() == '') {
                if ($(this).val() == '1') {
                    news.sortNewsByDate();
                } else if ($(this).val() == '2') {
                    news.sortNewsByName()
                }
            } else {
                news.filter($('#filter-by').val(), $(this).val());
            }
        });
        $('#filter-by').change(function () {
            news.filter($(this).val(), $('#change-order').val());
        });
    }
});

var news = {
    imagePath: './Arquivos/Imagens/Notícias/',
    news: [],
    newsFiltered: [],
    makeHome: function () {
        var that = this;
        $.getJSON('./Arquivos/JSON/noticias.json', function (response) {
            that.news = response[0].Editorias;
            that.sortNewsByDate();
            that.setSelect();
        });
    },
    setSelect: function () {
        this.news.forEach(function (editoria) {
            $('#filter-by')
                .append(
                    $('<option></option>')
                        .text(editoria['Editoria'].toUpperCase())
                        .val(editoria['Id'])
                );
        });
    },
    sortNewsByName: function () {
        this.news.forEach(function (editoria) {
            if (editoria['Notícias'].length) {
                editoria['Notícias'] = editoria['Notícias'].sort(function (a, b) {
                    var dateFromA = new Date(a['Data de publicação'].split('-').reverse());
                    var dateFromB = new Date(b['Data de publicação'].split('-').reverse());
                    return (dateFromB > dateFromA);
                });
            }
        });
        this.news = this.news.sort(function (a, b) {
            return (a['Notícias'][0]['Título'] > b['Notícias'][0]['Título']);
        });
        this.mountList();
    },
    sortNewsByDate: function () {
        this.news.forEach(function (editoria) {
            if (editoria['Notícias'].length) {
                editoria['Notícias'] = editoria['Notícias'].sort(function (a, b) {
                    var dateFromA = new Date(a['Data de publicação'].split('-').reverse());
                    var dateFromB = new Date(b['Data de publicação'].split('-').reverse());
                    return (dateFromB > dateFromA);
                });
            }
        });
        this.news = this.news.sort(function (a, b) {
            var dateFromA = new Date(a['Notícias'][0]['Data de publicação'].split('-').reverse());
            var dateFromB = new Date(b['Notícias'][0]['Data de publicação'].split('-').reverse());
            return (dateFromB > dateFromA);
        });
        this.mountList();
    },
    mountList: function () {
        $('#list-news').html('');
        var that = this;
        that.news.forEach(function (editoria) {
            //CHECK IF EXISTS ONE NEWS
            if (editoria.Notícias[0] == null) {
                return;
            }
            $('#list-news').append(
                $('<li></li>')
                    .append(
                        $('<div></div>')
                            .addClass('box-news')
                            .append(
                                $('<span></span>')
                                    .addClass('date')
                                    .text(editoria.Notícias[0]['Data de publicação'].replace(/-/g, '/'))
                            )
                            .append(
                                $('<h3></h3>')
                                    .text(editoria.Editoria)
                            )
                            .append(
                                $('<img/>')
                                    .attr('src', that.imagePath + editoria.Notícias[0]['Foto'])
                            )
                            .append(
                                $('<h4></h4>')
                                    .text(editoria.Notícias[0]['Título'])
                            )
                            .append(
                                $('<p></p>')
                                    .text(editoria.Notícias[0]['Texto'])
                            )
                            .append(
                                $('<a></a>')
                                    .text('Saiba mais')
                                    .attr('href', '#')
                            )
                    )
            );
        });
    },
    filter: function (filterId, orderId) {
        var that = this;
        var hasFiltered = false;
        this.news.forEach(function (editoria) {
            if (editoria['Id'] == filterId) {
                that.newsFiltered = editoria;
                hasFiltered = true;
            }
        });
        if (hasFiltered == false) {
            if (orderId == '1') {
                this.sortNewsByDate();
            } else if (orderId == '2') {
                this.sortNewsByName();
            }
        } else {
            if (orderId == '1') {
                this.sortFilteredNewsByDate();
            } else if (orderId == '2') {
                this.sortFilteredNewsByName();
            }
        }
    },
    sortFilteredNewsByName: function () {
        this.newsFiltered['Notícias'] = this.newsFiltered['Notícias'].sort(function (a, b) {
            var dateFromA = new Date(a['Data de publicação'].split('-').reverse());
            var dateFromB = new Date(b['Data de publicação'].split('-').reverse());
            return (dateFromB > dateFromA);
        });
        this.newsFiltered['Notícias'] = this.newsFiltered['Notícias'].sort(function (a, b) {
            return (a['Título'] > b['Título']);
        });
        this.mountListByEditoria();
    },
    sortFilteredNewsByDate: function () {
        this.newsFiltered['Notícias'] = this.newsFiltered['Notícias'].sort(function (a, b) {
            var dateFromA = new Date(a['Data de publicação'].split('-').reverse());
            var dateFromB = new Date(b['Data de publicação'].split('-').reverse());
            return (dateFromB > dateFromA);
        });
        this.mountListByEditoria();
    },
    mountListByEditoria: function () {
        $('#list-news').html('');
        var that = this;
        this.newsFiltered['Notícias'].forEach(function (news) {
            //CHECK IF EXISTS ONE NEWS
            if (news == null) {
                return;
            }
            $('#list-news').append(
                $('<li></li>')
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
                                    .text(that.newsFiltered['Editoria'])
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
    }
}