// modules needed on request to respond correctly
import 'moment/locale/it';
const cheerio = require('cheerio');
const moment = require('moment');
//--- variables needed to calculate dynamically url
var start_date = moment().day(-3).locale('it').format('YYYY/MM/DD');
var start_month = moment().day(-3).locale('it').format('MMMM');
var end_month = moment().day(+3).locale('it').format('MMMM');
var first_day_week = moment().day(-3).locale('it').format('DD');
var end_date = moment().day(+3).locale('it').format('D-MMMM-YYYY');
// --- just used to display on json object 
var display_start_date = moment().day(-3).locale('it').format('DD MMMM YYYY');
var display_end_date = moment().day(+3).locale('it').format('DD MMMM YYYY');


export default async function handler(req, res) {
  var sign = req.query.sign;
  var json = {};
  if (sign != null) {
    // check if month it's the same, if not url to get messages change a little bit and month_variation it's needed.
    if (start_month == end_month) {
     
      const url = 'https://www.internazionale.it/oroscopo/' + start_date + '/' + sign + '-' + first_day_week + '-' + end_date;

      const request = await fetch(url);
     
      var body = await request.text();
      const $ = cheerio.load(body,{ decodeEntities: true });
      var title = $("h2.hentry__title").text();
     
      var prediction = $("div.item_text > p").html();
      if (title != 'Pagina non trovata') {
        json = {
          sign: sign,
          prediction: " "+prediction+" ",
          start_date: display_start_date,
          end_date: display_end_date,

        }
        res.setHeader('content-type', 'application/json;charset=UTF-8');
        res.send(JSON.stringify(json, null, 4));
        res.statusCode = 200;
      } else {
        if( sign == ''){
          sign = 'null';
        }
        json = {
          sign: sign,
          prediction: 'No messages from stars for ' + sign,
          error_code: 404,
          end_date: sign + ' not found ',

        }
        res.send(JSON.stringify(json, null, 4));
        res.statusCode = 404;
      }
    } else {
      var month_variation = end_month;
      const url = 'https://www.internazionale.it/oroscopo/' + start_date + '/' + sign + '-' + first_day_week + '-' + month_variation + '-' + end_date;

      const request = await fetch(url);
      
      var body = await request.text();
      const $ = cheerio.load(body,{ decodeEntities: true });
      var title = $("title").text();
      
      var prediction = $("div.item_text > p").text();
     
      if (title != 'Pagina non trovata') {
        json = {
          sign: sign,
          prediction: " "+prediction+" ",
          start_date: display_start_date,
          end_date: display_end_date,

        }
        res.setHeader('content-type', 'application/json;charset=UTF-8');
        res.send(JSON.stringify(json, null, 4));
        res.statusCode = 200;
      } else {
        json = {
          sign: sign,
          prediction: 'No messages from stars for ' + sign,
          error_code: 404,
          end_date: sign + ' not found ',

        }
        res.send(JSON.stringify(json, null, 4));
        res.statusCode = 404;
      }
    }




  } else {
    var json = {
      endpoint: 'wizoscopo API - endpoint API service',
      version: 'v 1.0',
      message: ' Welcome, to start using me just go to documentation link below and discover how to pass parameter in GET request.',
      documentation: 'https://wizoscopo-api.vercel.app/doc'

    }
    JSON.stringify(json, null, 4);
    res.send(JSON.stringify(json, null, 4));

  }






}


