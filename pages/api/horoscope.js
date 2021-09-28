const cheerio = require('cheerio');
const moment = require('moment');
var start_date = moment().day(-3).locale('it').format('YYYY/MM/DD');
var first_day_week = moment().day(-3).locale('it').format('DD');
var end_date = moment().day(+3).locale('it').format('DD-MMMM-YYYY');

export default async function handler(req, res) {

  var sign = req.query.sign;
 
  if(sign != null){
    const url = 'https://www.internazionale.it/oroscopo/'+start_date+'/'+sign+'-'+first_day_week+'-'+end_date;
 
  const request = await fetch(url);
  var body = await request.text();
  const $ = cheerio.load(body);
  var result = $('h2.hentry__title').text();
  var prediction = $('div.item_text > p ').text();

  var json = {
    sign : sign,
    message: prediction,
    start_date: start_date,
    end_date: end_date
  }
 
  res.send(json);
}else{
  res.send(' nessun segno immesso ');
}
    
 
  
}


