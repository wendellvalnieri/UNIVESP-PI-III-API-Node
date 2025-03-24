import Model from '../models/servicos.model.js';

const title = "servicos";

const Controller = {
    async create(req, res) {
        try {
            const item = await Model.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ message: `error_creating_${title}`, error });
        }
    },

    async getAll(req, res) {
        try {
            const items = await Model.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: `error_fetching_${title}`, error });
        }
    },

    async getById(req, res) {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: `${title}_not_found` });
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: `error_fetching_${title}`, error });
        }
    },

    async update(req, res) {
        try {
            const item = await Model.update(req.params.id, req.body);
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: `error_updating_${title}`, error });
        }
    },

    async delete(req, res) {
        try {
            await Model.delete(req.params.id);
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ message: `error_deleting_${title}`, error });
        }
    }
};

export default Controller;
