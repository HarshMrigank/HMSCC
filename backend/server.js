const express = require('express');
const compileRoute = require('./routes/compile');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/compile', compileRoute);

app.get('/', (req, res) => {
  res.send('HMSCC Backend Running');
});

app.listen(PORT, () => {
  console.log(`HMSCC backend listening on port ${PORT}`);
});
