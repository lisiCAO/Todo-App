const express = require('express');
const cors  = require('cors');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./src/middleware/authenticateToken');
const authController = require('./src/controllers/authController');
const todoController = require('./src/controllers/todoController');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080' ,
    credentials: true,
}));

const todosRouter = express.Router();
todosRouter.use(authenticateToken);

todosRouter.get('/', todoController.getTodos);
todosRouter.get('/:id', todoController.getTodo);
todosRouter.put('/:id', todoController.updateTodo);
todosRouter.delete('/:id', todoController.deleteTodo);
todosRouter.post('/add', todoController.createTodo);

app.use('/api/todos', todosRouter);

app.get('/api/me', authenticateToken, authController.getMe);
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`) );