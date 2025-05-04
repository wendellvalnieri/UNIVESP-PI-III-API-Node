import { sendPushNotification, sendPushNotificationRest } from '../services/pushNotification.service.js'
import pool from '../config/db.js';

const Model = {
    /**
    * @description Envia uma notificação push para um dispositivo específico
    * @param { string } push_key - A chave de push do dispositivo de destino
    * @param { object } mensagem - O conteúdo da mensagem a ser enviada 
    * @returns { boolean}
    */
    async enviarNotificacao(push_key, mensagem) {
        /*      const mensagem =
             {
                 title: 'Título da notificação',
                 body: 'Conteúdo da mensagem',
                 data: {
                     route: '/tela-destino',
                     customKey: 'valorPersonalizado'
                 }
             } */

        try {
            const resultado = await sendPushNotification(push_key, mensagem);
            console.log('Notificação enviada:', resultado);
            return resultado;
        } catch (erro) {
            console.error('Falha ao enviar notificação:', erro);
        }
    },
    async enviarNotificacaoRest(push_key, data) {
        try {
            const resultado = await sendPushNotificationRest(push_key, data);
            console.log('Notificação enviada:', resultado);
            return resultado;
        } catch (erro) {
            console.error('Falha ao enviar notificação:', erro);
        }
    },
    async registrarToken(push_key, id_user) {
        try {
            const query = `update auth_user set token_message = '${push_key}' where id = ${id_user}`;
            const result = await pool.query(query);
            return result.rows[0];
        } catch (erro) {
            console.error('Falha ao registrar token:', erro);
        }
    }
};

export default Model;
