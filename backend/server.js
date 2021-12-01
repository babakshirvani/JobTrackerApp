const Client = require('pg').Client;
const { development } = require('./knexfile');
const db = new Client(development['connection']);
db.connect();

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const morgan = require('morgan');
const axios = require('axios');
const cheerio = require('cheerio');
// const cors = require("cors")

// App.use(cors())

// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:3000/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));



App.use(morgan('dev'));

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

const jobs = require("./routes/jobs");
App.use('/api', jobs(db));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

axios(`https://ca.indeed.com/viewjob?jk=5487b262f16f4a05`).then(response => {
  const html = response.data
  const $ = cheerio.load(html)
  const jobTitle = $('.jobsearch-JobInfoHeader-title', html).text()
  const jobType = $('.jobsearch-JobMetadataHeader-item').find('span').text()
  const companyName = $('.jobsearch-CompanyReview--heading').text()
  const jobPostDate = $('.jobsearch-JobMetadataFooter').find(1).text()

  console.log(jobPostDate)
})

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});