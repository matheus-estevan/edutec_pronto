let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;



carregaListaAutomatica();

// ... Seu código existente ...

// Crie um mapa de dicas associando nomes de animais a dicas
const dicas = new Map();
dicas.set("MAMUTE", "É um animal pré-histórico conhecido por sua grande envergadura.");
dicas.set("PAPAGAIO", "É uma ave colorida que pode imitar sons humanos.");
dicas.set("PATO DO LABRADOR", "É uma raça de cão retriever conhecida por ser amigável e obediente.");
dicas.set("ARARA AZUL", "É uma espécie de ave tropical colorida encontrada na América do Sul.");
dicas.set("MICO LEAO", "É um pequeno primata encontrado em florestas da América do Sul.");
dicas.set("PICA PAU", "É uma ave conhecida por seu bico afiado e habilidade de perfurar árvores.");
dicas.set("LINCE EUROASIÁTICO", "É um felino encontrado nas regiões da Eurásia.");
dicas.set("VISON", "É um mamífero carnívoro que pertence à família dos mustelídeos.");
dicas.set("ANTILOPES", "São mamíferos herbívoros conhecidos por sua velocidade e chifres.");
dicas.set("PANDA", "É um mamífero encontrado principalmente na China, conhecido por sua pelagem preta e branca.");
dicas.set("PANDA VERMELHO", "É uma espécie de mamífero arbóreo encontrado nas montanhas da Ásia.");
dicas.set("GATO DE PALLAS", "É um felino de pequeno porte encontrado nas montanhas da Ásia Central.");
dicas.set("COALA", "É um marsupial arborícola encontrado na Austrália.");
dicas.set("ORNITORRINCO", "É um mamífero monotremado que vive na Austrália.");
dicas.set("CANGURU", "É um marsupial saltador encontrado principalmente na Austrália.");
dicas.set("ZEBRA", "É um mamífero listrado encontrado na África.");
dicas.set("LEAO", "É um grande felino conhecido como o rei da selva.");
dicas.set("CAMELO", "É um mamífero adaptado para ambientes desérticos, com uma ou duas corcovas.");
// Adicione dicas para os outros animais da sua lista...

// Função para exibir a dica do animal atual
function exibirDica() {
    const palavraAtual = palavraSecretaSorteada.toUpperCase();
    if (dicas.has(palavraAtual)) {
        const dica = dicas.get(palavraAtual);
        abreModal("DICA", dica);
    } else {
        abreModal("DICA", "Desculpe, não temos uma dica para este animal.");
    }
}

// Adicione um botão de dica no seu HTML, por exemplo:
// <button id="botaoDica">Dica</button>

// Adicione um evento que chama a função exibirDica quando o usuário desejar ver a dica
const botaoDica = document.getElementById("botaoDica"); // Substitua "botaoDica" pelo ID do seu botão de dica, se aplicável.
if (botaoDica) {
    botaoDica.addEventListener("click", exibirDica);
}

// ... O restante do seu código ...


criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavras = {
            nome : "MAMUTE",
            categoria : "AMÉRICA DO NORTE"
        },
        palavras = {
            nome : "PAPAGAIO",
            categoria : "AMÉRICA DO NORTE"
            },
        palavras = {
            nome : "PATO DO LABRADOR",
            categoria : "AMÉRICA DO NORTE"
            },
        palavras = {
            nome  : "ARARA AZUL",
            categoria : "AMÉRICA DO SUL"
            },
        palavras = {
            nome  : "MICO LEAO",
            categoria : "AMÉRICA DO SUL"
            },
        palavras = {
            nome  : "PICA PAU",
            categoria : "AMÉRICA DO SUL"
            },
        palavras = {
            nome : "LINCE EUROASIATICO",
            categoria : "EUROPA"
            },
        palavras = {
            nome  : "VISON",
            categoria : "EUROPA"
            },
        palavras = {
            nome  : "ANTILOPES",
            categoria : "EUROPA"
            },
        palavras = {
            nome  : "PANDA",
            categoria : "ÁSIA"
            },
        palavras = {
            nome  : "PANDA VERMELHO",
            categoria : "ÁSIA"
            },
        palavras = {
            nome  : "GATO DE PALLAS",
            categoria : "EUROPA"
            },
        palavras = {
            nome  : "COALA",
            categoria : "OCEANIA"
            },
        palavras = {
            nome  : "ORNITORRINCO",
            categoria : "OCEANIA"
            },
        palavras = {
            nome  : "CANGURU",
            categoria : "OCEANIA"
            },
        palavras = {
            nome  : "ZEBRA",
            categoria : "ÁFRICA"
            },
        palavras = {
            nome  : "LEAO",
            categoria : "ÁFRICA"
            },
        palavras = {
            nome  : "CAMELO",
            categoria : "ÁFRICA"
            },
    ];
}


function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


