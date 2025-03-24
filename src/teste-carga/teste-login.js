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
    http.get('http://localhost:4333'); // substitua pelo URL da sua aplicação local

    // Testando login
    const payload = JSON.stringify({ username: 'usuario123', password: 'senha123' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    http.post('http://localhost:4333/auth/login', payload, params);

    sleep(1); // Aguarda um segundo antes de repetir
}