'use strict';

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

    var url = 'http://www.imdb.com/title/tt1229340';

    request(url, function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title: "", release: "", rating: ""};

            $('.title_wrapper').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                release = data.children().last().children().last().text();

                json.title = title;
                json.release = release;
            })
            $('.imdbRating').filter(function(){
                var data = $(this);

                rating = data.children().first().text();
                json.rating = rating;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File written success');
        })

        res.send('Check console')
    });
})

app.listen('8081')

console.log('Things just happens here');

exports = module.exports = app;