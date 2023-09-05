// import your node server here
import app from './controllers/server.js';

const PORT = 9000;

// START YOUR SERVER HERE

app.listen(PORT, () => {
    console.log(`Lisrening server on Port ${PORT}`);
})