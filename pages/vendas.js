const URL_BASE = "https://projeto-final-pyia-python-production.up.railway.app";

async function registrarVenda(event) {
  event.preventDefault();

  const id_produto = parseInt(document.getElementById('id_produto').value);
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const data = document.getElementById('data').value; // formato yyyy-mm-dd

  try {
    const response = await fetch(`${URL_BASE}/venda/adicionar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_produto, quantidade, data })
    });

    const dataResp = await response.json();

    if (response.ok) {
      document.getElementById('msg').textContent = '✅ Venda registrada com sucesso!';
      event.target.reset();
    } else {
      document.getElementById('msg').textContent = '❌ Erro: ' + (dataResp.erro || JSON.stringify(dataResp));
    }
  } catch (err) {
    document.getElementById('msg').textContent = '❌ Erro ao conectar com o servidor.';
    console.error(err);
  }
}

document.getElementById('form-venda').addEventListener('submit', registrarVenda);
