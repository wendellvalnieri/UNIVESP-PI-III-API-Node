import Model from '../models/notificacoes.model.js';
import { response_generic, response_success } from '../middlewares/responseHandler.js';
const title = "notificacoes";

const Controller = {
    async sendNotification(req, res) {
        try {
            const push_key = req.body.push_key;
            const mensagem = req.body.mensagem;
            const item = Model.enviarNotificacao(push_key, mensagem);
            response_success(res, `${title}_sent`, item);
        } catch (error) {
            response_generic(res, 500, false, `creating_${title}`, error);
        }
    },
    async sendNotificationRest(req, res) {
        try {
            const push_key = req.body.push_key;
            const data = req.body.data;
            const item = Model.enviarNotificacaoRest(push_key, data);
            response_success(res, `${title}_sent`, item);
        } catch (error) {
            response_generic(res, 500, false, `creating_${title}`, error);
        }
    },
    async registerToken(req, res) {
        try {
            const token = req.body.token_message;
            const item = Model.registrarToken(token, req.user.id);
            response_success(res, `${title}_registered`, item);
        } catch (error) {
            response_generic(res, 500, false, `creating_${title}`, error);
        }
    }
}
export default Controller;