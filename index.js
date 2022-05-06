const server = require('./api/server');

const PORT = 9000;


// START YOUR SERVER HERE

server.listen( PORT || 3000, () => {
    console.log(" server is runing at 900");
});