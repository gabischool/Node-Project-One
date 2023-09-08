// import your node server here
import app from './api/server.js';

const MainHost = 'localhost';

const port = 9000;

 
app.listen(port, () => console.log(`Listening on port http://${MainHost}:${port}/`))


 

