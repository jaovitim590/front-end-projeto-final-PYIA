const URL_BASE = "https://projeto-final-pyia-python-production.up.railway.app";

let paginaAtual = 1;
const itensPorPagina = 15;
let todosProdutos = [];

async function carregarProdutos() {
    try {
        const resposta = await fetch(`${URL_BASE}/listar/produtos`);
        const dados = await resposta.json();
        todosProdutos = dados;
        exibirPagina(paginaAtual);
        criarPaginacao();
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

function exibirPagina(pagina) {
    const tabela = document.getElementById("tabela-produtos");
    tabela.innerHTML = "";

    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const produtosPagina = todosProdutos.slice(inicio, fim);

    produtosPagina.forEach(produto => {
        const linha = `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
            </tr>`;
        tabela.innerHTML += linha;
    });
}

function criarPaginacao() {
    const totalPaginas = Math.ceil(todosProdutos.length / itensPorPagina);
    const paginacao = document.getElementById("paginacao");
    paginacao.innerHTML = "";

    // Botão Anterior
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = (paginaAtual === 1);
    btnAnterior.onclick = () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            exibirPagina(paginaAtual);
            criarPaginacao();
        }
    };
    paginacao.appendChild(btnAnterior);

    // Botões numéricos
    for (let i = 1; i <= totalPaginas; i++) {
        const botao = document.createElement("button");
        botao.textContent = i;
        botao.disabled = (i === paginaAtual);
        botao.onclick = () => {
            paginaAtual = i;
            exibirPagina(paginaAtual);
            criarPaginacao();
        };
        paginacao.appendChild(botao);
    }

    // Botão Próximo
    const btnProximo = document.createElement("button");
    btnProximo.textContent = "Próximo";
    btnProximo.disabled = (paginaAtual === totalPaginas);
    btnProximo.onclick = () => {
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            exibirPagina(paginaAtual);
            criarPaginacao();
        }
    };
    paginacao.appendChild(btnProximo);
}

carregarProdutos();
