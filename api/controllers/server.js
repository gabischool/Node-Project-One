// Initialize express app
import express from 'express';
import cors from 'cors';
import { find, findById, insert, remove, update } from '../model/users.model.js';

export const app = express();
app.use(express.json());
app.use(cors());

// GET ALL USERS

app.get('/api/users', async(req, res) => {
    const users = await find()
    res.json(users);
});

// GET USER BY ID

app.get('/api/users/:id', async(req, res) => {
    const id = req.params.id;
    const user_id = await findById(id);
    if (user_id) {
        res.status(200).json(user_id);
    } else {
        res.status(404).json({
            message: 'ID Does not exist'
        })
    }
});

// CREATE A NEW USER

app.post('/api/users', async(req, res) => {
    const new_users = {
        name: req.body.name,
        bio: req.body.bio
    }
    const insert_user = await insert({
        name: new_users.name,
        bio: new_users.bio
    });
    if (!insert_user) {
        res.status(400).json({ message: 'missing request body' });
    }
    res.status(200).json({
        message: 'successfully inserted'
    })
})

// UPDATE A USER

app.put('/api/users/:id', async(req, res) => {
    const id = req.params.id;
    const new_users = {
        name: req.body.name,
        bio: req.body.bio
    }
    const update_user = await update(id, new_users);
    if (!update_user) {
        res.status(400).json({ message: 'missing request body' });
    }
    res.status(200).json({
        message: 'successfully Updated'
    })
})


// DELETE A USER

app.delete('/api/users/:id', async(req, res) => {
    const id = req.params.id;
    const delete_user = await remove(id);
    if (!delete_user) {
        res.status(404).json({
            message: 'missing ID Request'
        });
    } else {

        res.status(200).json({
            message: 'successfully deleted'
        });

    }
})

// export default app
export default app;