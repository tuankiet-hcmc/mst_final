const app = require('./app');
const port = 3000;

app.listen(port, function(err) {
    if(err) {
        throw err;
    }
    else {
        console.log(`Server is listening on ${port}...`)
    }
})