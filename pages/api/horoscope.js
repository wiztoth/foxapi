const cheerio = require('cheerio');
const moment = require('moment');
var start_date = moment().day(-3).lang('it').format('YYYY/MM/DD');
var first_day_week = moment().day(-3).lang('it').format('DD');
var end_date = moment().day(+3).lang('it').format('DD-MMMM-YYYY');

export default async function handler(req, res) {

  var sign = req.query.sign;
  var json = {

  }
  if(sign != null){
    const url = 'https://www.internazionale.it/oroscopo/'+start_date+'/'+sign+'-'+first_day_week+'-'+end_date;
 
    const request = await fetch(url);
    console.log(url);
    var body = await request.text();
    const $ = cheerio.load(body);
    var title = $("title").text();
    var prediction = $("div.item_text > p").text();
    if(title != 'Pagina non trovata'){
      json = {
        sign: sign,
        prediction : prediction,
        start_date: start_date,
        end_date: end_date,
    
      }
      
      res.send(JSON.stringify(json,null,4));
      res.statusCode = 200;
    }else{
      json = {
        sign: sign,
        prediction : 'No messages from stars for '+sign,
        error_code: 404,
        end_date: sign + ' not found ',
    
      }
      res.send(JSON.stringify(json,null,4));
      res.statusCode = 404;
    }
   
     
  }else{
      var json = {
      endpoint: 'wizoscopo API - endpoint API service',
      version: 'v 1.0',
      message: ' Welcome, to start using me just go to documentation link below and discover how to pass parameter in GET request.',
      documentation: 'https://wizoscopo-api.vercel.app/doc'
  
    }
    JSON.stringify(json,null,4);
    res.send( JSON.stringify(json,null,4));
    res.statusCode = 200;
  }
 
 

    
 
  
}


