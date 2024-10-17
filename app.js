// Inicializa um array vazio para armazenar os números já sorteados.
let listaDeNumerosSorteados = []; 

// Define o limite máximo para o número secreto.
let numeroLimite = 10; 

// Gera um número secreto aleatório entre 1 e numeroLimite, garantindo que não se repita.
let NumeroSecreto = gerarNumeroAleatorio(); 

// Inicializa a contagem de tentativas do jogador.
let tentativas = 1;

// Função para exibir um texto na tela e lê-lo em voz alta.
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com a tag especificada.
    let campo = document.querySelector(tag); 
    // Atribui o texto ao conteúdo do elemento.
    campo.innerHTML = texto; 
    // Utiliza a biblioteca responsiveVoice para ler o texto em voz alta.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

// Função para exibir as mensagens iniciais do jogo.
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

// Chama a função para exibir as mensagens iniciais.
exibirMensagemInicial();

// Função para verificar o chute do jogador.
function verificarChute() {
    // Obtém o valor do chute digitado pelo jogador.
    let chute = document.querySelector('input').value; 

    // Verifica se o chute é igual ao número secreto.
    if (chute == NumeroSecreto) {
        // Exibe mensagem de parabéns e o número de tentativas.
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativas = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        // Habilita o botão de reiniciar.
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Se o chute for diferente, verifica se é maior ou menor que o número secreto.
        if (chute > NumeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor...');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior...');
        }

        // Incrementa a contagem de tentativas e limpa o campo de entrada.
        tentativas++;
        limparCampo();
    }
}

// Função para gerar um número aleatório entre 1 e numeroLimite, garantindo que não se repita.
function gerarNumeroAleatorio() {
    // Gera um número aleatório e converte para inteiro.
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Verifica se a lista de números sorteados já está cheia.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;    
    if (quantidadeDeElementosNaLista == numeroLimite){
        // Se a lista estiver cheia, limpa a lista para começar novamente.
        listaDeNumerosSorteados = [];
    }

    // Verifica se o número gerado já foi sorteado anteriormente.
    if (listaDeNumerosSorteados.includes(numeroEscolido)){
        // Se o número já foi sorteado, chama a função novamente para gerar outro número.
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número à lista de números sorteados e o retorna.
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada do chute.
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo.
function reiniciarJogo() {
    // Gera um novo número secreto, limpa o campo de entrada, reinicia a contagem de tentativas e exibe as mensagens iniciais.
    NumeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Desabilita o botão de reiniciar.
    document.getElementById('reiniciar').setAttribute('disabled', true);
}