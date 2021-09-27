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



export default async function handler(req, res) {
      // The scraping magic will happen here
      let sign = req.query.sign;
      let json = '';
      let url = BASE_URL + last_thursday + '/' + sign + '-' + every_thursday + '-' + every_next_wednesday + '-' + month_string + '-' + year;
      res.setHeader('content-type', 'application/json');
      
     
      var r = request(url, async function (error, response, body) {
        var $ = await cheerio.load(body);
        var prediction = $('div.item_text > p').text();
        console.log(prediction);
        var json = {
            sign: sign,
            text: prediction,
            start_date: every_thursday + ' ' + month_string + ' ' + year,
            end_date: every_next_wednesday + ' ' + month_string + ' ' + year,
        };

        // Send the JSON as a response to the client
        
        json = JSON.stringify(json, null, 4);
        res.send(json);
        res.statusCode = 200;
        res.end();
       });

       console.log(r);
    
  
    
}










