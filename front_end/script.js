const API_URL = 'http://localhost:3000';

// Estado da Aplicação
let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let produtosCache = [];

// --- INICIALIZAÇÃO E NAVEGAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
  if (currentUser) {
    showScreen('screen-dashboard');
  } else {
    showScreen('screen-login');
  }

  const inputData = document.getElementById('mov-data');
  if (inputData) {
    inputData.value = new Date().toISOString().split('T')[0];
  }
});

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'screen-dashboard' && currentUser) {
    document.getElementById('user-name-display').innerText = currentUser.nome;
  } else if (screenId === 'screen-produtos') {
    carregarProdutos();
  } else if (screenId === 'screen-producao') {
    carregarProdutosProducao();
  }
}

// Navegação de Login e Cadastro Inicial
document.getElementById('link-go-register').onclick = (e) => {
  e.preventDefault();
  showScreen('screen-cadastro-user');
};

document.getElementById('link-go-login').onclick = (e) => {
  e.preventDefault();
  showScreen('screen-login');
};

// Navegação do Dashboard e Logout
document.querySelectorAll('.btn-to-dashboard').forEach(b => b.onclick = () => showScreen('screen-dashboard'));

document.getElementById('btn-logout').onclick = () => {
  localStorage.removeItem('user');
  currentUser = null;
  
  // Reseta o nome exibido no elemento da interface
  document.getElementById('user-name-display').innerText = 'Usuário';
  
  showScreen('screen-login');
};

document.getElementById('nav-produtos').onclick = () => showScreen('screen-produtos');
document.getElementById('nav-producao').onclick = () => showScreen('screen-producao');

// --- AUTENTICAÇÃO ---
document.getElementById('form-login').onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;
  const errorBox = document.getElementById('login-error');

  try {
    const res = await fetch(`${API_URL}/usuario/listar`);
    if (!res.ok) throw new Error('Erro ao conectar com o servidor');

    const usuarios = await res.json();
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
      throw new Error('E-mail ou senha inválidos!');
    }

    currentUser = usuarioEncontrado;
    localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
    errorBox.classList.add('hidden');
    showScreen('screen-dashboard');
  } catch (err) {
    errorBox.innerText = err.message;
    errorBox.classList.remove('hidden');
  }
};

// --- CADASTRO DE USUÁRIOS ---
document.getElementById('form-cadastro').onsubmit = async (e) => {
  e.preventDefault();
  
  const body = {
    nome: document.getElementById('cad-nome').value,
    email: document.getElementById('cad-email').value,
    senha: document.getElementById('cad-senha').value
  };

  try {
    const res = await fetch(`${API_URL}/usuario/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Erro ao cadastrar usuário');

    showAlert('cadastro-alert', 'Conta criada com sucesso! Faça login para continuar.', 'success');
    document.getElementById('form-cadastro').reset();
    
    setTimeout(() => {
      showScreen('screen-login');
    }, 2000);
  } catch (err) {
    showAlert('cadastro-alert', err.message, 'error');
  }
};

// --- GESTÃO DE PRODUTOS ---
async function carregarProdutos() {
  try {
    const res = await fetch(`${API_URL}/produto/listar`);
    produtosCache = await res.json();
    renderTabelaProdutos(produtosCache);
  } catch (err) {
    showAlert('produto-alert', 'Erro ao carregar produtos', 'error');
  }
}

function renderTabelaProdutos(lista) {
  const tbody = document.getElementById('tbody-produtos');
  tbody.innerHTML = '';

  lista.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>R$ ${Number(p.custo).toFixed(2)}</td>
      <td>${p.quantidade}</td>
      <td>${p.estoqueMin}</td>
      <td>
        <button onclick="prepararEdicao(${p.id})" class="btn btn-primary" style="padding:4px 8px;">Editar</button>
        <button onclick="excluirProduto(${p.id})" class="btn btn-danger" style="padding:4px 8px;">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Filtro / Busca
document.getElementById('search-produto').oninput = (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = produtosCache.filter(p => p.nome.toLowerCase().includes(termo));
  renderTabelaProdutos(filtrados);
};

// Cadastro e Edição de Produtos
document.getElementById('form-produto').onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById('prod-id').value;
  const body = {
    nome: document.getElementById('prod-nome').value,
    custo: parseFloat(document.getElementById('prod-custo').value),
    quantidade: parseInt(document.getElementById('prod-qtd').value),
    estoqueMin: parseInt(document.getElementById('prod-min').value),
    descricao: document.getElementById('prod-desc').value
  };

  const url = id ? `${API_URL}/produto/atualizar/${id}` : `${API_URL}/produto/cadastrar`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Erro ao salvar produto');
    
    resetFormProduto();
    carregarProdutos();
    showAlert('produto-alert', 'Produto salvo com sucesso!', 'success');
  } catch (err) {
    showAlert('produto-alert', err.message, 'error');
  }
};

function prepararEdicao(id) {
  const p = produtosCache.find(item => item.id === id);
  if (!p) return;

  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-nome').value = p.nome;
  document.getElementById('prod-custo').value = p.custo;
  document.getElementById('prod-qtd').value = p.quantidade;
  document.getElementById('prod-min').value = p.estoqueMin;
  document.getElementById('prod-desc').value = p.descricao || '';

  document.getElementById('form-produto-title').innerText = 'Editar Produto';
  document.getElementById('btn-cancelar-edicao').classList.remove('hidden');
}

document.getElementById('btn-cancelar-edicao').onclick = resetFormProduto;

function resetFormProduto() {
  document.getElementById('form-produto').reset();
  document.getElementById('prod-id').value = '';
  document.getElementById('form-produto-title').innerText = 'Novo Produto';
  document.getElementById('btn-cancelar-edicao').classList.add('hidden');
}

async function excluirProduto(id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  try {
    await fetch(`${API_URL}/produto/excluir/${id}`, { method: 'DELETE' });
    carregarProdutos();
    showAlert('produto-alert', 'Produto excluído!', 'success');
  } catch (err) {
    showAlert('produto-alert', 'Erro ao excluir o produto', 'error');
  }
}

// --- GESTÃO DE PRODUÇÃO JIT ---
function ordenarAlfabeticamente(lista) {
  let len = lista.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (lista[j].nome.localeCompare(lista[j + 1].nome, 'pt-BR') > 0) {
        let temp = lista[j];
        lista[j] = lista[j + 1];
        lista[j + 1] = temp;
      }
    }
  }
  return lista;
}

async function carregarProdutosProducao() {
  try {
    const res = await fetch(`${API_URL}/produto/listar`);
    let produtos = await res.json();
    
    produtos = ordenarAlfabeticamente(produtos);

    const select = document.getElementById('mov-produto');
    select.innerHTML = '<option value="">Selecione um produto...</option>';
    produtos.forEach(p => {
      select.innerHTML += `<option value="${p.id}">${p.nome} (Estoque: ${p.quantidade})</option>`;
    });
  } catch (err) {
    showAlert('producao-alert', 'Erro ao carregar a lista de produtos', 'error');
  }
}

document.getElementById('form-producao').onsubmit = async (e) => {
  e.preventDefault();
  const alertBox = document.getElementById('producao-alert');
  alertBox.classList.add('hidden');

  const body = {
    idProduto: parseInt(document.getElementById('mov-produto').value),
    idUsuario: currentUser.id,
    tipo: document.getElementById('mov-tipo').value,
    quantidade: parseInt(document.getElementById('mov-qtd').value),
    dataProducao: document.getElementById('mov-data').value
  };

  try {
    const res = await fetch(`${API_URL}/producao/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Erro ao registrar movimentação');

    if (data.alertaEstoque) {
      showAlert('producao-alert', `⚠️ ALERTA JIT: ${data.mensagemAlerta}`, 'warning');
    } else {
      showAlert('producao-alert', 'Movimentação registrada com sucesso!', 'success');
    }

    document.getElementById('form-producao').reset();
    document.getElementById('mov-data').value = new Date().toISOString().split('T')[0];
    carregarProdutosProducao();
  } catch (err) {
    showAlert('producao-alert', err.message, 'error');
  }
};

function showAlert(elementId, text, type) {
  const el = document.getElementById(elementId);
  el.className = `alert ${type}`;
  el.innerText = text;
  el.classList.remove('hidden');
}