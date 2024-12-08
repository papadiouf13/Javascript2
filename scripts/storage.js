// Fonction pour récupérer les produits depuis LocalStorage
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
  }
  
  // Fonction pour enregistrer les produits dans LocalStorage
  function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  
  // Export des fonctions
  export { getProducts, saveProducts };
  