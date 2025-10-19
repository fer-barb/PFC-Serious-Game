
import { bancodedados } from './chavefire.js';

import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    const corpoRanking = document.getElementById('corpo-ranking');

  
    async function carregar_ranking() {
        try {
            
            const consulta = query(
                collection(bancodedados, "ranking"),      
                orderBy("pontuacao", "desc"),   
                limit(60)                       
            );
            
            const querySnapshot = await getDocs(consulta);

            corpoRanking.innerHTML = ""; 

            if (querySnapshot.empty) {
                corpoRanking.innerHTML = '<tr><td colspan="3">Ninguém jogou ainda. Seja o primeiro! :) </td></tr>';
                return;
            }

            let posicao = 1;
            querySnapshot.forEach((doc) => {
                const dados_jogador = doc.data();
                const linha_tabela = document.createElement('tr');
                linha_tabela.innerHTML = `
                    <td>${posicao}º</td>
                    <td>${dados_jogador.nome}</td>
                    <td>${dados_jogador.pontuacao}</td>
                `;
                corpoRanking.appendChild(linha_tabela);
                posicao++;
            });

        } catch (error) {
            console.error("Erro ao carregar o ranking: ", error);
            corpoRanking.innerHTML = '<tr><td colspan="3">Erro ao carregar o ranking.</td></tr>';
        }
    }

    
    carregar_ranking();
});
