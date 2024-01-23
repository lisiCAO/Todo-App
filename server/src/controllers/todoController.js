const db = require('../models/index');

exports.createTodo = async (req, res, next) => {
    try {
        const todo = await db.todo.create({
            title: req.body.title,
            description: req.body.description,
            ownerId: req.user.userId
        });
        return res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
};

exports.getTodos = async (req, res, next) => {
    try {
        const todos = await db.todo.findAll({ where: { ownerId: req.user.userId } });
        return res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

exports.getTodo = async (req, res, next) => {
    try {
        const todo = await db.todo.findOne({ where: { id: req.params.id, ownerId: req.user.userId } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        return res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const todo = await db.todo.findOne({ where: { id: req.params.id, ownerId: req.user.userId } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await todo.update(req.body);
        return res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const todo = await db.todo.findOne({ where: { id: req.params.id, ownerId: req.user.userId } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await todo.destroy();
        return res.status(204).json({ message: 'Todo deleted' });
    } catch (error) {
        next(error);
    }
};