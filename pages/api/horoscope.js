// modules needed on request to respond correctly
import 'moment/locale/it';
const cheerio = require('cheerio');



export default async function handler(req, res) {
  var sign = req.query.sign;
  console.log('sign inserted: ' + sign);
  var valid_signs = ['aries', 'taurus', 'gemini', 'cancerian', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  var json = {};
  if (sign != null && valid_signs.includes(sign)) {
    console.log('sign: ' + sign);
    const url = 'https://freewillastrology.com/clhoroscopes/' + sign ;
    console.log(url);
    const request = await fetch(url);
       
    var body = await request.text();
    const $ = cheerio.load(body,{ decodeEntities: true });
    var prediction = $("div.sign_text").text();
    var prediction_period = $("div.fs10").first().text();
    console.log(prediction_period);
    json = {
      astrologer: 'Brezsny',
      sign: sign,
      prediction: " "+prediction+" ",
      prediction_period: prediction_period,
      horoscope: 'weekly',
  
    }
    res.setHeader('content-type', 'application/json;charset=UTF-8');
    res.send(JSON.stringify(json, null, 4));
    res.statusCode = 200;
  } else {
    console.log('sign: errore');
    if (sign == null || sign == '') {
      json = {
        sign: 'Not sign provided',
        prediction: 'No messages from stars in this moment',
        error_code: 404,

      }
      res.send(JSON.stringify(json, null, 4));
      res.statusCode = 404
    }
    var json = {
            sign: sign,
            prediction: 'No messages from stars for ' + sign,
            error_code: 404,


    }
    res.send(JSON.stringify(json, null, 4));
    res.statusCode = 404

  }






}
