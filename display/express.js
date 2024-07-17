const  express = require('express')

const app = express();

app.use(express.static('display'));
app.get('/data', ( res, req) => {
    res.sendFile(search + '../scraped_data.json');
  });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});