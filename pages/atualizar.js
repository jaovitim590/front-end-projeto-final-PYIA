const URL_BASE = "https://projeto-final-pyia-python-production.up.railway.app";

const form = document.getElementById('form-atualizar');
const botao = form.querySelector('button');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  botao.disabled = true;
  const textoOriginal = botao.textContent;
  botao.textContent = 'Atualizando...';

  const produto_id = parseInt(document.getElementById('produto_id').value);
  const nova_quantidade = parseInt(document.getElementById('nova_quantidade').value);

  try {
    const response = await fetch(`${URL_BASE}/produto/atualizar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: produto_id, nova_quantidade }),
    });

    const data = await response.json();

    if (response.ok) {
      msg.textContent = '✅ Produto atualizado com sucesso!';
    } else {
      msg.textContent = '❌ Erro: ' + (data.erro || JSON.stringify(data));
    }
  } catch (error) {
    msg.textContent = '❌ Erro ao conectar com o servidor.';
    console.error(error);
  } finally {
    setTimeout(() => {
      botao.disabled = false;
      botao.textContent = textoOriginal;
    }, 2000);
  }
});
