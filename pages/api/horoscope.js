const cheerio = require('cheerio');

export default async function handler(req, res) {



  const request = await fetch(`https://www.internazionale.it/oroscopo/2021/09/23/cancro-23-29-settembre-2021`);
  var body = await request.text();
  const $ = cheerio.load(body);
  var title = $('title').text();
  console.log(title);
  res.send('ciao');
}


