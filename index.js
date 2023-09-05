// import your node server here
import app from './api/server.js';

const hostname = 'localhost'
const port = 9000;

// START YOUR SERVER HERE
app.listen(port, () => console.log(`Listening on port http://${hostname}:${port}/`))

// Server is online 
// Get All Users : https://different-clam-sundress.cyclic.app/api/users
// Get user by id: https://different-clam-sundress.cyclic.app/api/users/1
// Create user: https://different-clam-sundress.cyclic.app/api/users/create_user
// Update user: https://different-clam-sundress.cyclic.app/api/users/update_user/2
// Delete user: https://different-clam-sundress.cyclic.app/api/users/delete_user/:id
