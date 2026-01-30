import { bancodedados } from './chavefire.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    const scenarios = [
        {
            text: "Durante o planejamento de um projeto de TI de porte médio, o cliente pede uma redução no prazo de entrega. Ele gostaria que o projeto fosse concluído “para ontem” devido às pressões dos concorrentes e quer um cronograma atualizado com metade do tempo planejado. \n Além disso, o orçamento proposto é cerca de 30% inferior do que o valor estimado para sua equipe. Como gerente de projeto, qual a sua ação?",
            choices: [
                { 
                    text: "A. Concorda com o novo orçamento e prazo exigido, mas planejar o uso de horas extras. Além de pedir à equipe para trabalhar de forma ininterrupta para compensar a redução do cronograma.", 
                    points: 5,
                    feedback: "Decisão Intermediária (+5). Embora entregue no prazo, uso excessivo de horas extras (Crashing) sem planejamento aumenta o risco de erros e o custo total, dminuindo qualidade."
                },
                { 
                    text: "B. Elabora um cronograma realista, documenta os riscos associados ao orçamento reduzido e prazo irreal e volta para negociar de forma ativa com o cliente a adequação das restrições do projeto", 
                    points: 10, 
                    feedback: "Decisão Correta (+10). É crítico o alinhamento de expectativas. Aceitar prazos irreais é uma das principais causas de falhas. A melhor saída é buscar apoio organizacional."
                },
                { 
                    text: "C. Simplesmente reduzir o escopo inicial do projeto para que este encaixe dentro do novo prazo e orçamento propostos, sem consultar ou incluir o cliente na redefinição dessas prioridades.", 
                    points: -10, 
                    feedback: "Decisão Incorreta (-10). Alterar o escopo unilateralmente quebra confiança, destrói o valor do projeto, violando asso a ética do gerenciamento da Tríplice Restrição."
                }
            ]
        },
        {
            text: "Você está gerenciando um projeto de desenvolvimento de um software inovador (o grau de incerteza é alto) e está na fase de planejamento. Os arquitetos sugerem o uso de um componente pronto (COTS/API) para uma das principais funções, com a promessa de reduzir custos e tempo de desenvolvimento. Entretanto, é do seu conhecimento que esse componente possui o código-fonte fechado e fazer essa integração pode causar problemas de manutenção, desempenho e confiabilidade futuramente. Qual a sua ação?",
            choices: [
                { 
                    text: "A. Escolhe desenvolver a funcionalidade do zero, criando o próprio código. De modo a garantir total controle sobre código e manutenção depois, mesmo aumentando prazo de entrega e os custos definidos anteriormente.", 
                    points: 5, 
                    feedback: "Decisão Intermediária (+5). Até garante controle total e manutenção, mas ignora os benefícios de produtividade e custo que o reuso de componentes conseguiria trazer."
                },
                { 
                    text: "B. Implementa o componente COTS/API, aproveitando a redução de tempo e custos. Entretanto, adiciona novos recursos para realizar testes mais rigorosos para avaliar a viabilidade de forma precisa.", 
                    points: 10, 
                    feedback: "Decisão Correta (+10)! Aumenta a economia de tempo e custo, mitigando riscos de caixa-preta através de validação prévia de qualidade."
                },
                { 
                    text: "C. Implementa o COTS/API imediatamente, pois reduzir custos é prioritário para ser competitivo. Além disso, faz testes superficiais para diminuir o tempo de implementação.", 
                    points: -10, 
                    feedback: "Decisão Incorreta (-10). A falta de validação em componentes externos expõe o projeto a riscos de segurança inadimissiveis, além de falhas operacionais."
                }
            ]
        },
        {
            text: "Durante a fase de coleta de requisitos para desenvolvimento de um novo software, é identificado que os stakeholders estão com demandas conflitantes. A gerência quer um nível de segurança alto e a equipe operacional gostaria de simplicidade e rapidez de acesso. Como Gerente de projeto, qual a sua ação?",
            choices: [
                { 
                    text: "A. Reúne os desenvolvedores com os stakeholders em conflito para discutir os requisitos de cada parte e quais requisitos deverão ser desenvolvidos e quais descartados.", 
                    points: 10, 
                    feedback: "Decisão Correta (+10). A Engenharia de Requisitos tem como recomendação a resolução explícita de conflitos através da análise de trade-offs e negociação."
                },
                { 
                    text: "B. Define qualidade como a restrição principal e implementa todos os requisitos da gerência e ignora completamente as demandas da equipe operacional para evitar riscos no futuro.", 
                    points: 5, 
                    feedback: "Decisão Intermediária (+5). Garante apoio político, mas isso gera insatisfação nos usuários finais, o que pode comprometer a adoção do sistema."
                },
                { 
                    text: "C. Deixa os requisitos conflitantes em aberto e continua com o planejamento, na esperança de que a equipe de desenvolvimento se responsabilize em buscar uma solução conciliatória durante a fase de execução", 
                    points: -10, 
                    feedback: "Decisão Incorreta (-10). Conflitos não resolvidos durante a fase de planejamento são as causas raízes de retrabalho futuramente e também aumento de custos."
                }
            ]
        },
        {
            text: "Você é o responsável por gerenciar um projeto de TI e este enfrenta um grande risco de estourar o prazo devido à grande complexidade de desenvolver software de grande porte. O líder técnico sugere usar Programação Orientada a Objetos (POO). Qual a sua ação?",
            choices: [
                { 
                    text: "A. Adota o POO para reutilização de código e componente, com o intuito de reduzir custos e tempo de entrega do produto final.", 
                    points: 10, 
                    feedback: "Decisão Correta (+10). Sobre sistemas complexos, a literatura indica que a POO oferece reuso, modularidade e manutenibilidade superiores."
                },
                { 
                    text: "B. Mantém o paradigma de Programação Estruturada, pois é mais simples de implementar e é mais popular entre os devs, apesar de ser menos eficiente para reuso de código.", 
                    points: 5, 
                    feedback: "Decisão Intermediária (+5). Evita curva de aprendizado imediata, mas deixa a manutenção insustentável à medida que o sistema cresce."
                },
                { 
                    text: "C. Aumenta o número de desenvolvedores no time para cumprir o prazo, afinal, mais gente trabalhando irá reduzir tempo de projeto", 
                    points: -10, 
                    feedback: "Decisão Incorreta (-10). Adicionar mais trabalhadores a um projeto atrasado tende a atrasá-lo ainda mais devido à complexidade de comunicação (Lei de Brooks)."
                }
            ]
        },
        {
            text: "O projeto que você está liderando sofre um com um atraso inesperado: alguns colaboradores deixaram a empresa. Para acelerar o cronograma que resta e ainda cumprir o prazo estipulado em contrato, o time de desenvolvimento sugere que, em vez de seguir o sequenciamento original, as atividades do projeto sejam executadas em paralelo. Qual a sua ação?",
            choices: [
                { 
                    text: "A. Executa as atividades em paralelo, afinal, isso é um modo de readequar o cronograma aos prazos, sendo um método com riscos gerenciáveis.", 
                    points: 10, 
                    feedback: "Decisão Correta (+10). Abordagem padrão para comprimir o cronograma quando riscos de retrabalho são analisados e gerenciados."
                },
                { 
                    text: "B. Mantém o sequenciamento original, pois tentar paralelizar atividades aumenta o risco de retrabalho", 
                    points: 5, 
                    feedback: "Decisão Intermediária (+5). Opção mais segura contra retrabalho, porém falha em reponder a questão do atraso contratual."
                },
                { 
                    text: "C. Aumenta de forma imediata o esforço empregado por tarefa, adiciona mais recursos financeiros e mão de obra, com objetivo de acelerar a conclusão.", 
                    points: -5, 
                    feedback: "Decisão Incorreta (-5). Investimento financeiro sem analisar o custo benefício leva a retornos decrescentes e prejuízo ao projeto."
                }
            ]
        }
    ];

    const containerInicio = document.getElementById('container-inicio');
    const containerJogo = document.getElementById('container-jogo');
    const inputNomeJogador = document.getElementById('nome-jogador');
    const botaoIniciar = document.getElementById('botao-iniciar');
  
    const tituloCenario = document.getElementById('titulo-cenario'); 
    const textoPontuacao = document.getElementById('texto-pontuacao');
    const textoCenario = document.getElementById('texto-cenario');
    const containerEscolhas = document.getElementById('container-escolhas');
    
    // ElementosFeedback
    const modalFeedback = document.getElementById('modal-feedback');
    const textoFeedbackModal = document.getElementById('texto-feedback-modal');
    const botaoProximo = document.getElementById('botao-proximo');

    const containerResultados = document.getElementById('container-resultados');
    const textoPontuacaoFinal = document.getElementById('texto-pontuacao-final');
    const textoFeedback = document.getElementById('texto-feedback');

    let cenarioatual_indice = 0;
    let pontuacao = 0;
    let nome_jogador = "";

    inputNomeJogador.addEventListener('input', () => {
        if (inputNomeJogador.value.trim() !== "") {
            botaoIniciar.disabled = false;
        } else {
            botaoIniciar.disabled = true;
        }
    });

    function iniciar_jogo() {
        nome_jogador = inputNomeJogador.value.trim();
        
        if (nome_jogador === "") {
            alert("Digite seu nome para começar.");
            return;
        }
        
        if (nome_jogador.length > 30) {
            nome_jogador = nome_jogador.substring(0, 30);
        }
        
        containerInicio.classList.add('escondido');
        containerJogo.classList.remove('escondido');
        
        cenarioatual_indice = 0;
        pontuacao = 0;
        textoPontuacao.innerText = pontuacao;
        
        mostrarCenario(cenarioatual_indice);
    }

    function mostrarCenario(indice) {
        tituloCenario.innerText = `Cenário ${indice + 1} de ${scenarios.length}`;
        
        const cenario = scenarios[indice];
        textoCenario.innerText = cenario.text;
        
        containerEscolhas.innerHTML = '';
        cenario.choices.forEach(escolha => {
            const botao = document.createElement('button');
            botao.innerText = escolha.text;
            
            botao.classList.add('botao-escolha');
            // Alterado: agora passamos o objeto 'escolha' inteiro, não só os pontos
            botao.addEventListener('click', () => mostrarFeedback(escolha));
            containerEscolhas.appendChild(botao);
        });
    }

    // explicação
    function mostrarFeedback(escolha) {
        // Atualiza pontuação
        pontuacao += escolha.points;
        textoPontuacao.innerText = pontuacao;

        // Mostra o modal
        textoFeedbackModal.innerText = escolha.feedback;
        modalFeedback.classList.remove('escondido');
    }

    // próximo
    botaoProximo.addEventListener('click', () => {
        modalFeedback.classList.add('escondido'); // Esconder modal
        avancarCenario(); // Vai para o próximo
    });

    function avancarCenario() {
        cenarioatual_indice++;

        if (cenarioatual_indice < scenarios.length) {
            mostrarCenario(cenarioatual_indice);
        } else {
            mostrarResultados();
        }
    }

    async function mostrarResultados() {
        document.querySelector('#container-jogo .area-jogo').classList.add('escondido');
        containerResultados.classList.remove('escondido');
        // esconder cabeçalho
        document.getElementById('cabecalho').classList.add('escondido');

        textoPontuacaoFinal.innerText = pontuacao;
        let mensagemFeedback = '';
        
        if (pontuacao >= 40) {
            mensagemFeedback = "Excelente! Parabéns! Ótimo entendimento sobre os dilemas da Tríplice Restrição.";
        } else if (pontuacao >= 20) {
            mensagemFeedback = "Bom trabalho. Você acertou a maioria dos cenários, entretanto revise alguns pontos críticos.";
        } else {
            mensagemFeedback = "Atenção! Você precisa revisar os conceitos de gestão urgentemente!";
        }
        textoFeedback.innerText = mensagemFeedback;

        try {
            await addDoc(collection(bancodedados, "ranking"), {
                nome: nome_jogador,
                pontuacao: pontuacao,
                timestamp: new Date() 
            });
            console.log("sucesso! pontuação salva!");
        } catch (error) {
            console.error("erro ao salvar pontuação: ", error);
            textoFeedback.innerText += "\n(não foi possível salvar seu score no ranking.)";
        }
        
        // tempo
        setTimeout(() => {
            window.location.href = 'rankingdejogadores.html';
        }, 8000);
    }
    
    botaoIniciar.addEventListener('click', iniciar_jogo);
});



