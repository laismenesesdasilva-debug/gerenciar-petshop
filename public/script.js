const form = document.getElementById('loginForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const petInput = document.getElementById('pet');
const tipoPetInput = document.getElementById('tipoPet');
const servicoInput = document.getElementById('servico');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const pet = petInput.value.trim();
  const tipoPet = tipoPetInput.value;
  const servico = servicoInput.value;

  if (!nome || !email || !telefone || !pet || !tipoPet || !servico) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        email,
        telefone,
        pet,
        tipoPet,
        servico
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      alert(data.message);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Não foi possível conectar ao servidor.');
  }
});
