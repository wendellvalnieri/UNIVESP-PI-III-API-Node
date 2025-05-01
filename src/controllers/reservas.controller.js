import Model from '../models/reservas.model.js';
import { response_generic, response_success } from '../middlewares/responseHandler.js';

const title = "reservas";

const Controller = {
    async create(req, res) {
        try {
            const item = await Model.create(req.body, req.user.id);
            response_success(res,`${title}_created`, item);
        } catch (error) {
            response_generic(res, 500, false, `creating_${title}`, error);
        }
    },

    async getAll(req, res) {
        try {
            const items = await Model.findAll(req.user);
            response_success(res, `${title}_found`, items);
        } catch (error) {
            response_generic(res, 500, false, `fetching_${title}`, error);
        }
    },

    async getByUser(req, res) {
        try {
            const items = await Model.findByUser(req.user);
            response_success(res, `${title}_found`, items);
        } catch (error) {
            response_generic(res, 500, false, `fetching_${title}`, error);
        }
    },

    async getById(req, res) {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                response_generic(res, 404, false, `${title}_not_found`, error);
            }
            response_success(res, `${title}_found`, item);
        } catch (error) {
            response_generic(res, 500, false, `fetching_${title}`, error);
        }
    },

    async cancelar(req, res) {
        try {
            const item = await Model.cancelar(req.params.id);
            response_success(res, `${title}_cancelled`, item);
        } catch (error) {
            response_generic(res, 500, false, `cancelled_${title}`, error);
        }
    },
    async update(req, res) {
        try {
            const item = await Model.update(req.params.id, req.body);
            response_success(res, `${title}_updated`, item);
            res.status(200).json(item);
        } catch (error) {
            response_generic(res, 500, false, `updating_${title}`, error);
        }
    },

    async delete(req, res) {
        try {
            await Model.delete(req.params.id);
            response_generic(res, 204, false, `${title}_deleted`);
        } catch (error) {
            response_generic(res, 500, false, `deleting_${title}`, error);
        }
    }
};

export default Controller;