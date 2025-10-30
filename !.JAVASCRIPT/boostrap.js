// Data de nascimento da pessoa (exemplo: 15 de abril de 1990)
const dataNascimento = new Date('1971-12-13');

// Função para calcular a idade
function calcularIdade() {
    const dataAtual = new Date();
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();

    // Verifica se já fez aniversário neste ano
    if (mesAtual < dataNascimento.getMonth() || (mesAtual === dataNascimento.getMonth() && diaAtual < dataNascimento.getDate())) {
        idade--;
    }

    // Atualiza o conteúdo da página com a idade calculada
    document.getElementById('idade').textContent = idade;
}

// Chama a função para exibir a idade assim que a página for carregada
window.onload = calcularIdade;

// Chama a função para atualizar a idade todos os anos (1 ano = 1000 * 60 * 60 * 24 * 365.25 ms)
setInterval(calcularIdade, 1000 * 60 * 60 * 24 * 365.25);





// Função que será chamada ao clicar no ícone do WhatsApp
function openWhatsApp() {
    // Substitua o número de telefone abaixo pelo seu número do WhatsApp
    var phoneNumber = "5511954506530"; // Exemplo: +55 (11) 99999-9999
    var message = "Olá, vim pelo site MLuzia services. Gostaria de tirar dúvidas sobre o trabalho oferecido. "; // Mensagem pré-definida
    
    // URL de redirecionamento para o WhatsApp
    var url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    
    // Redireciona para o link do WhatsApp
    window.location.href = url;
}



















document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById("starRating");
  const form = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviews");
  const filterButtons = document.querySelectorAll("#filter button");
  const emptyMessage = document.querySelector(".empty");

  let selectedRating = 0;
  let reviews = [];

  // Criar estrelas
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.dataset.rating = i;

    star.addEventListener("click", () => {
      selectedRating = i;
      updateStars();
    });

    star.addEventListener("mouseover", () => highlightStars(i));
    star.addEventListener("mouseout", updateStars);

    starContainer.appendChild(star);
  }

  function updateStars() {
    const stars = starContainer.querySelectorAll("span");
    stars.forEach(star => {
      star.classList.toggle("selected", star.dataset.rating <= selectedRating);
    });
  }

  function highlightStars(rating) {
    const stars = starContainer.querySelectorAll("span");
    stars.forEach(star => {
      star.classList.toggle("selected", star.dataset.rating <= rating);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value;
    const comment = form.comment.value;

    if (!selectedRating) {
      alert("Por favor, escolha uma avaliação!");
      return;
    }

    const newReview = { email, comment, rating: selectedRating };
    reviews.push(newReview);
    form.reset();
    selectedRating = 0;
    updateStars();
    renderReviews();
    alert(`Novo comentário de ${email} enviado!`);
  });

  function renderReviews(filter = "all") {
    reviewsContainer.innerHTML = "<h2>Avaliações:</h2>";

    const filteredReviews = filter === "all"
      ? reviews
      : reviews.filter(r => r.rating === parseInt(filter));

    if (filteredReviews.length === 0) {
      reviewsContainer.innerHTML += '<p class="empty">Nenhuma avaliação encontrada.</p>';
      return;
    }

    filteredReviews.forEach(review => {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review");
      reviewDiv.innerHTML = `
        <p><strong>Email:</strong> ${review.email}</p>
        <p><strong>Avaliação:</strong> ${"★".repeat(review.rating)}</p>
        <p>${review.comment}</p>
      `;
      reviewsContainer.appendChild(reviewDiv);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      renderReviews(filter);
    });
  });
});

