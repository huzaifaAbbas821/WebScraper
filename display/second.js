
document.addEventListener('DOMContentLoaded', function () {
  const file = ['products.json', 'products1.json', 'products2.json'];
  let products = []; // Declare products array outside the fetch block

  for (let i = 0; i < file.length; i++) { // Corrected spelling of 'length'
    fetch(file[i])
      .then(response => response.json())
      .then(data => {
        // Loop through the JSON data and create divs
        const productsData = data.map(function (product) {
          // if (product.title.toLowerCase().includes('women')) {
          //   return null; // Skip if title contains 'women'
          // }

          const productDiv = document.createElement('div');
          productDiv.classList.add('product');

          productDiv.innerHTML += `<img src="${product.image}" alt="image">`;
          productDiv.innerHTML += `<h2> ${product.title} </h2>`;
          // productDiv.innerHTML += `<p>Price: ${product.price}</p>`;
          productDiv.innerHTML += `<div> <p>Price: ${product.price}</p> <button class="scrape-button"> <a href="${product.pageUrl}">Go to Page </a> </button> </div>`;
          document.getElementById('productContainer').appendChild(productDiv);

          return {
            title: product.title,
            element: productDiv
          };
        }).filter(product => product !== null); // Remove null entries

        products = products.concat(productsData); // Add data to products array
      })
      .catch(error => console.error('Error fetching data:', error));
  }


    // Event listener for input on the search field
    document.getElementById('search').addEventListener('input', function (event) {
      var searchValue = event.target.value.toLowerCase();

      products.forEach(function (product) {
        var productTitle = product.title.toLowerCase();
        var productElement = product.element;

        var isVisible = productTitle.includes(searchValue);
        if (isVisible) {
          productElement.style.display = 'block';
        } else {
          productElement.style.display = 'none';
        }
      })
  })
});