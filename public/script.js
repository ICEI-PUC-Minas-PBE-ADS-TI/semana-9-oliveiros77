// =============================================
// B.1 - BASE DE DADOS
// =============================================

const data = {
  produtos: [
    {
      id: 1,
      nome: "Motorola Edge 40",
      preco: 2199.90,
      categoria: "Celulares",
      imagem: "https://placehold.co/150x150?text=Moto+Edge+40",
      descricao: "Smartphone Motorola com tela OLED 144Hz.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Xiaomi Redmi Note 12",
      preco: 1499.90,
      categoria: "Celulares",
      imagem: "https://placehold.co/150x150?text=Redmi+Note+12",
      descricao: "Smartphone Xiaomi com bateria de 5000mAh.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Acer Aspire",
      preco: 2899.90,
      categoria: "Notebooks",
      imagem: "https://placehold.co/150x150?text=Acer+Aspire",
      descricao: "Notebook Acer com Ryzen 5 e 16GB RAM.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air M2",
      preco: 9999.90,
      categoria: "Notebooks",
      imagem: "https://placehold.co/150x150?text=MacBook+Air",
      descricao: "Notebook Apple com chip M2 e tela Liquid Retina.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Headset Gamer HyperX",
      preco: 399.90,
      categoria: "Acessorios",
      imagem: "https://placehold.co/150x150?text=HyperX",
      descricao: "Headset com som surround 7.1 e microfone.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Webcam Logitech C920",
      preco: 599.90,
      categoria: "Acessorios",
      imagem: "https://placehold.co/150x150?text=Webcam",
      descricao: "Webcam Full HD 1080p com microfone embutido.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Nintendo Switch",
      preco: 2799.90,
      categoria: "Games",
      imagem: "https://placehold.co/150x150?text=Switch",
      descricao: "Console Nintendo Switch com controles Joy-Con.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Controle Xbox Wireless",
      preco: 499.90,
      categoria: "Games",
      imagem: "https://placehold.co/150x150?text=Controle+Xbox",
      descricao: "Controle sem fio para Xbox e PC.",
      emEstoque: false
    }
  ]
};


// =============================================
// B.2 - SELEÇÃO DE ELEMENTOS
// =============================================

var productList = document.getElementById("product-list");
var productDetails = document.getElementById("product-details");
var searchInput = document.querySelector("#search");
var categorySelect = document.querySelector("#category");
var btnRender = document.getElementById("btnRender");


// =============================================
// B.3 - FUNÇÕES
// =============================================

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  var card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");
  card.style.padding = "16px";

  var nome = document.createElement("h3");
  nome.classList.add("card-title");
  nome.textContent = produto.nome;

  var imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome);

  var preco = document.createElement("p");
  preco.textContent = formatPrice(produto.preco);

  var categoria = document.createElement("p");
  categoria.textContent = "Categoria: " + produto.categoria;

  var btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Ver detalhes";
  btnDetalhes.addEventListener("click", function() {
    showProductDetails(produto);
  });

  var btnDestacar = document.createElement("button");
  btnDestacar.textContent = "Destacar";
  btnDestacar.addEventListener("click", function() {
    card.classList.toggle("highlight");
  });

  card.appendChild(nome);
  card.appendChild(imagem);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(btnDetalhes);
  card.appendChild(btnDestacar);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";
  produtos.forEach(function(produto) {
    var card = createProductCard(produto);
    productList.appendChild(card);
  });

  // B.5 - querySelectorAll nos cards renderizados
  var todosCards = document.querySelectorAll(".card");
  todosCards.forEach(function(card) {
    console.log("Card renderizado - data-id: " + card.getAttribute("data-id"));
  });
}

function renderCategories() {
  var categorias = ["Todas"];
  data.produtos.forEach(function(produto) {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorySelect.innerHTML = "";
  categorias.forEach(function(cat) {
    var option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML =
    "<h2>" + produto.nome + "</h2>" +
    "<p><strong>Preço:</strong> " + formatPrice(produto.preco) + "</p>" +
    "<p><strong>Categoria:</strong> " + produto.categoria + "</p>" +
    "<p><strong>Em estoque:</strong> " + (produto.emEstoque ? "Sim" : "Não") + "</p>" +
    "<p><strong>Descrição:</strong> " + produto.descricao + "</p>";
}

function filterProducts() {
  var texto = searchInput.value.toLowerCase();
  var categoriaSelecionada = categorySelect.value;

  var filtrados = data.produtos.filter(function(produto) {
    var nomeContem = produto.nome.toLowerCase().includes(texto);
    var categoriaOk = categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;
    return nomeContem && categoriaOk;
  });

  return filtrados;
}


// =============================================
// B.4 - EVENTOS
// =============================================

searchInput.addEventListener("input", function() {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function() {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function() {
  renderProducts(filterProducts());
});


// =============================================
// INICIALIZAÇÃO
// =============================================

renderCategories();
renderProducts(data.produtos);