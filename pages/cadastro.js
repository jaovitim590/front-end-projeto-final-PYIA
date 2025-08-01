const URL_BASE = "https://projeto-final-pyia-python-production.up.railway.app";

const form = document.getElementById('form-cadastro');
const botao = form.querySelector('button');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Desabilita o botão e mostra texto de carregando
  botao.disabled = true;
  const textoOriginal = botao.textContent;
  botao.textContent = 'Cadastrando...';

  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  try {
    const response = await fetch(`${URL_BASE}/produto/adicionar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao, quantidade, preco }),
    });

    const data = await response.json();

    if (response.ok) {
      msg.textContent = '✅ Produto cadastrado com sucesso!';
      form.reset();
    } else {
      msg.textContent = '❌ Erro: ' + (data.erro || JSON.stringify(data));
    }
  } catch (error) {
    msg.textContent = '❌ Erro ao conectar com o servidor.';
    console.error(error);
  } finally {
    // Reabilita o botão e restaura texto original depois de 2 segundos
    setTimeout(() => {
      botao.disabled = false;
      botao.textContent = textoOriginal;
    }, 2000);
  }
});
