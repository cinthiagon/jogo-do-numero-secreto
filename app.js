// Variáveis globais
let listaDeNumerosSorteados = []; // Array para armazenar os números já sorteados
let numeroLimite = 10; // Limite máximo para o número secreto
let NumeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto inicial
let tentativas = 1; // Contador de tentativas

// Função para exibir texto na tela e falar em voz alta
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com a tag especificada
    let campo = document.querySelector(tag);
    // Atualiza o conteúdo do elemento com o texto
    campo.innerHTML = texto;
    // Utiliza a biblioteca responsiveVoice para falar o texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

// Chama a função para exibir a mensagem inicial
exibirMensagemInicial();

// Função para verificar o chute do usuário
function verificarChute() {
    // Obtém o valor do chute digitado pelo usuário
    let chute = document.querySelector('input').value;

    // Verifica se o chute é igual ao número secreto
    if (chute == NumeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns!');
        // Constrói a mensagem de parabéns com base no número de tentativas
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        // Habilita o botão de reiniciar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Verifica se o chute é maior ou menor que o número secreto
        if (chute > NumeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor...');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior...');
        }

        // Incrementa o contador de tentativas e limpa o campo de entrada
        tentativas++;
        limparCampo();
    }
}

// Função para gerar um número aleatório único
function gerarNumeroAleatorio() {
    // Gera um número aleatório entre 1 e o limite
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    // Verifica se o número já foi sorteado
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se já foi sorteado, chama a função novamente para gerar um novo número
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número sorteado à lista e retorna o número
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    // Seleciona o elemento de entrada e limpa seu valor
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Gera um novo número secreto, limpa o campo, zera o contador de tentativas
    // e exibe a mensagem inicial
    NumeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Desabilita o botão de reiniciar
    document.getElementById('reiniciar').setAttribute('disabled', true);
}