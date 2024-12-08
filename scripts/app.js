import { getProducts, saveProducts } from "./storage.js";

/**
 * Gestion du formulaire pour ajouter un produit.
 */
const form = document.getElementById("productForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const libelle = document.getElementById("libelle").value;
    const prix = parseFloat(document.getElementById("prix").value);
    const qteStock = parseInt(document.getElementById("qteStock").value);
    const dateExpiration = document.getElementById("dateExpiration").value;

    // Créer un objet produit
    const product = { libelle, prix, qteStock, dateExpiration };

    // Récupérer les produits existants depuis le LocalStorage
    const products = getProducts();

    // Ajouter le nouveau produit
    products.push(product);

    // Sauvegarder dans le LocalStorage
    saveProducts(products);

    // Message de confirmation et réinitialisation du formulaire
    alert("Produit ajouté avec succès !");
    form.reset();
  });
}


/**
 * Gestion de l'affichage des produits dans le tableau.
 */
const tableBody = document.getElementById("productTableBody");
if (tableBody) {
  /**
   * Charger et afficher les produits depuis le LocalStorage.
   */
  function loadProducts() {
    const products = getProducts();
    tableBody.innerHTML = ""; // Réinitialiser le contenu du tableau

    products.forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.libelle}</td>
        <td>${product.prix.toFixed(2)} cfa</td>
        <td>${product.qteStock}</td>
        <td>${product.dateExpiration}</td>
        <td>
          <button onclick="deleteProduct(${index})">Supprimer</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  /**
   * Supprimer un produit par son index.
   * @param {number} index - Index du produit à supprimer.
   */
  window.deleteProduct = function (index) {
    const products = getProducts();
    products.splice(index, 1); // Supprimer le produit de la liste
    saveProducts(products); // Mettre à jour le LocalStorage
    loadProducts(); // Recharger le tableau
  };

  // Charger les produits au démarrage
  loadProducts();
}
