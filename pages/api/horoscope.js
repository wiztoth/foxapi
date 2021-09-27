// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const request = require('request');
const moment = require('moment');
const cheerio = require('cheerio');
const expressPrettier = require('express-prettier');
var today = moment().locale('it').format('DD-MMMM-YYYY');
var today_pretty =  moment().locale('it').format('DD MMMM YYYY');
var every_thursday = moment().day(-3).locale('it').format('DD');
var every_next_wednesday = moment().day(+3).locale('it').format('DD');
var year = moment().year();
var month = '0' + (moment().month() + 1);
var month_string = moment().locale('it').format('MMMM');
var last_thursday = moment().day(-3).locale('it').format('YYYY/MM/DD');
const BASE_URL = 'https://www.internazionale.it/oroscopo/';
//var prediction = $('div.item_text > p').text();
var wordOfDay = [];


export default  function handler(req, res) {
      // The scraping magic will happen here
      let sign = req.query.sign;
      let url = BASE_URL + last_thursday + '/' + sign + '-' + every_thursday + '-' + every_next_wednesday + '-' + month_string + '-' + year;
      res.setHeader('content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
      console.log(url);
      request({
        method: 'GET',
        url: url,

      }, function(err, response, body, callback) {
          if (err) return console.error(err);
          
          // get the HTML body from WordThink.com
          var $ = cheerio.load(body);
    
          if(wordOfDay.length > 0){
            wordOfDay = [];
          }
    
          var post = $('h2.hentry__title > a ').text();
          
          // create an object
          wordOfDay.push(post);
          res.send(wordOfDay);
    
      });
      
    
     
    
}










