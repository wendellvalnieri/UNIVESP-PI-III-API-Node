import http from 'k6/http';
import { sleep } from 'k6';

// Configuração do teste
export const options = {
    vus: 100, // Número de usuários simultâneos
    duration: '10s', // Duração do teste
};

// Função principal do teste
export default function () {
    // Testando a página inicial
    http.get('http://localhost:4333/servicos'); // substitua pelo URL da sua aplicação local
    sleep(1); // Aguarda um segundo antes de repetir
}