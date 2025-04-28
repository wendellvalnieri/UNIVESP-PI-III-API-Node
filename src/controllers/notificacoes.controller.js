import Model from '../models/notificacoes.model.js';

const title = "notificacoes";

const Controller = {
    async sendNotification(req, res) {
        try {
            const push_key = req.body.push_key;
            const mensagem = req.body.mensagem;
            const item = Model.enviarNotificacao(push_key, mensagem);
            response_generic(res, true, `${title}_sent`, item);
        } catch (error) {
            response_generic(res, 500, false, `creating_${title}`, error);
        }
    }
}
export default Controller;