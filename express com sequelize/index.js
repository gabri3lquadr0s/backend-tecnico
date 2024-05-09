const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATEONLY, allowNull: false}
});

(async () => {
    await sequelize.sync({ force: true });
    console.log("Modelos sincronizados com o banco de dados.");
})();

app.get('/getUsers', async (req, res) => {
    const user = await User.findAll();
    res.json(user);
});

app.get('/getUserById/:id', async (req, res) => {
    const { id } = req.params;
    const idExists = await User.findOne({ where: { id } });
    if (idExists) {
        res.json(idExists);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
    }
})

app.post('/createUser', async (req, res) => {
    const { username, email, password, birthDate } = req.body;
    try {
        const newUser = await User.create({ username, email, password, birthDate });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso.', newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/updateUser/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, birthDate } = req.body;
    try {
        const [updated] = await User.update({ username, password, birthDate }, { where: { id } });
        if (updated) {
            const updatedUser = await User.findOne({ where: { id } });
            res.json({ message: 'Informações do veículo atualizadas com sucesso.', user: updatedUser });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Usuário excluído com sucesso.' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});







