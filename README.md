# 🐝🧙 WizAPI

## About the Project

WizAPI is a REST API base for generating horoscopes. The main logic is implemented in the `horoscope.js` file located under the `pages/api` folder. It uses a web scraper (powered by the `cheerio` library in Node.js) to fetch horoscope data from [Free Will Astrology](https://freewillastrology.com/clhoroscopes/). 

The scraped data is transformed into JSON format and served via the API endpoint. For example, you can access the horoscope for a specific zodiac sign by visiting:

```
https://localhost:3000/api/horoscope?sign=zodiac_sign
```

Replace `zodiac_sign` with one of the valid signs (e.g., `aries`, `taurus`, `gemini`, etc.).

There's also a small implemention about a documentation about usage at accessible through home link once development server was run.

```
https://localhost:3000/doc
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, depending on your needs, you can:

- Start the development server:

  ```bash
  npm run dev
  ```

- Build the project for production:

  ```bash
  npm run build
  ```

For more details, refer to the Next.js documentation.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
