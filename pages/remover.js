const URL_BASE = "https://projeto-final-pyia-python-production.up.railway.app";

async function removerProduto(event) {
  event.preventDefault();

  const id = parseInt(document.getElementById('produto_id').value);
  const chave = document.getElementById('chave').value.trim();

  try {
    const response = await fetch(`${URL_BASE}/produto/remover`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, chave })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('msg').textContent = '✅ Produto removido com sucesso!';
      event.target.reset();
    } else {
      document.getElementById('msg').textContent = '❌ Erro: ' + (data.erro || JSON.stringify(data));
    }
  } catch (err) {
    document.getElementById('msg').textContent = '❌ Erro ao conectar com o servidor.';
    console.error(err);
  }
}

document.getElementById('form-remover').addEventListener('submit', removerProduto);
