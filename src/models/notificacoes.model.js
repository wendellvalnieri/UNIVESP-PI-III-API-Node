import { sendPushNotification } from '../services/pushNotification.service.js'

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
    }
};

export default Model;
