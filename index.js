// import your node server here
import app from "./api/server.js";

const port = 9000;

// START YOUR SERVER HERE
app.listen(9000, () => {
  console.log(`listenin on ${port}`);
});
