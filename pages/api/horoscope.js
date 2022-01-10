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
var today_date = moment().locale('it').format('DD-MMMM-YYYY');
var today_date2 = moment().locale('it').format('DD-MMMM');


export default async function handler(req, res) {
  var sign = req.query.sign;
  var astrologer = req.query.astrologer;
  var json = {};
  console.log(sign+' - '+astrologer+' - '+today_date)
  if (sign != null & astrologer != null) {
    // check if month it's the same, if not url to get messages change a little bit and month_variation it's needed.
    
    if(astrologer == 'brezsny'){
      if (start_month == end_month) {
     
        const url = 'https://www.internazionale.it/oroscopo/' + start_date + '/' + sign + '-' + first_day_week + '-' + end_date;
        console.log(url);
        const request = await fetch(url);
       
        var body = await request.text();
        const $ = cheerio.load(body,{ decodeEntities: true });
        var title = $("h2.hentry__title").text();
       
        var prediction = $("div.item_text > p").html();
        if (title != 'Pagina non trovata') {
          json = {
            astrologer: astrologer,
            sign: sign,
            prediction: " "+prediction+" ",
            start_date: display_start_date,
            end_date: display_end_date,
            horoscope: 'weekly',

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
        var month_variation = start_month;
        const url = 'https://www.internazionale.it/oroscopo/' + start_date + '/' + sign + '-' + first_day_week + '-' + month_variation + '-' + end_date;
        console.log(url);

        const request = await fetch(url);
        
        var body = await request.text();
        const $ = cheerio.load(body,{ decodeEntities: true });
        var title = $("title").text();
        
        var prediction = $("div.item_text > p").text();
       
        if (title != 'Pagina non trovata') {
          json = {
            sign: sign,
            astrologer: astrologer,
            prediction: " "+prediction+" ",
            start_date: display_start_date,
            end_date: display_end_date,
            horoscope: 'weekly',
  
          }
          res.setHeader('content-type', 'application/json;charset=UTF-8');
          res.send(JSON.stringify(json, null, 4));
          res.statusCode = 200;
        } else {
          json = {
            astrologer: astrologer,
            sign: sign,
            prediction: 'No messages from stars for ' + sign+ ' from '+astrologer,
            error_code: 404,
            end_date: sign + ' not found ',
  
          }
          res.send(JSON.stringify(json, null, 4));
          res.statusCode = 404;
        }
      }
    }else{
      if( astrologer == 'fox'){
        const url = getFoxUrl(sign);
        const request = await fetch(url);
        
        var body = await request.text();
        const $ = cheerio.load(body,{ decodeEntities: true });
        var title = $("title").text();

        var prediction = $("p").text();
        if( title != 'Pagina non trovata - ZON'){
          json = {
            astrologer: astrologer,
            sign: sign,
            prediction: " "+prediction+" ",
            today: moment().locale('it').format('DD MMMM YYYY'),
            horoscope: 'daily'
            
  
          }
          res.setHeader('content-type', 'application/json;charset=UTF-8');
          res.send(JSON.stringify(json, null, 4));
          res.statusCode = 200;
        }else{
          json = {
            astrologer: astrologer,
            sign: sign,
            prediction: 'No messages from stars for ' + sign+ ' from '+astrologer,
            error_code: 404,
            end_date: sign + ' not found ',
  
          }
          res.send(JSON.stringify(json, null, 4));
          res.statusCode = 404;
        }
      }else{
        var json = {
        astrologer: astrologer,
        sign: sign,
        prediction: 'I am '+astrologer+' , not Paolo or Rob, i can not read stars',
        error_code: 404,
        end_date: astrologer + ' is not a valid astrologer, retry with fox or brezsny ',
        }
        res.send(JSON.stringify(json, null, 4));
          res.statusCode = 404;
      }
    }
    
    
   




  } else {
    var json = {
      endpoint: 'foxapi API - endpoint API service',
      version: 'v 1.0',
      message: ' Welcome, you are in endpoint . Probably you miss some parameters or you do not inserted one. Get started checking usage reference linked below.',
      documentation: 'https://foxapi.vercel.app/doc'

    }
    JSON.stringify(json, null, 4);
    res.send(JSON.stringify(json, null, 4));

  }






}

function getFoxUrl(sign){
  var error = 0
  var fox_url = "https://zon.it/oroscopo-di-paolo-fox-"+today_date
  console.log(fox_url)
  if(sign == 'ariete'){
    error = 1;
    fox_url = fox_url;
  }
  if(sign == 'toro'){
    error = 1;
    fox_url = fox_url+'/2/';
  }
  if(sign == 'gemelli'){
    error = 1;
    fox_url = fox_url+'/3/';
  }
  if(sign == 'cancro'){
    error = 1;
    fox_url = fox_url+'/4/';
  }
  if(sign == 'leone'){
    error = 1;
    fox_url = fox_url+'/5/';
  }
  if(sign == 'vergine'){
    error = 1;
    fox_url = fox_url+'/6/';
  }
  if(sign == 'bilancia'){
    error = 1;
    fox_url = fox_url+'/7/';
  }
  if(sign == 'scorpione'){
    error = 1;
    fox_url = fox_url+'/8/';
  }
  if(sign == 'sagittario'){
    error = 1;
    fox_url = fox_url+'/9/';
  }
  if(sign == 'capricorno'){
    error = 1;
    fox_url = fox_url+'/10/';
  }
  if(sign == 'acquario'){
    error = 1;
    fox_url = fox_url+'/11/';
  }
  if(sign == 'pesci'){
    error = 1;
    fox_url = fox_url+'/12/';
  }
  if(error == 0){
    fox_url = fox_url+'/null/'
  }
  console.log(fox_url)
  return fox_url;
}
