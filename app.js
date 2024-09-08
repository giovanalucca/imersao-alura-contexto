// app.js

function pesquisar() {
    // Get the search input value and convert to lowercase
    const searchTerm = document.getElementById("campo-pesquisa").value.toLowerCase();

    // Get the results section
    const resultsSection = document.getElementById("palavra-buscada");

    // Clear previous results
    resultsSection.innerHTML = '';

    // Check if the search term is empty
    if (!searchTerm) {
        resultsSection.innerHTML = "<p>Digite uma palavra para buscar.</p>";
        return; 
    }

    // Find matching words in the data.js
    let found = false;
    for (let palavra of dados) {
        // Check if the word is in the title, tag, or videos array
        if (palavra.titulo.toLowerCase().includes(searchTerm) || 
            palavra.tag.toLowerCase().includes(searchTerm) || 
            palavra.gifs.some(gifUrl => gifUrl.toLowerCase().includes(searchTerm))) {
            found = true;
            resultsSection.innerHTML += `
                <div class="item-resultado">
                    <h2>${palavra.titulo}</h2>
                    <p class="descricao-meta">${palavra.texto}
                        <a href="${palavra.assim1}" target="_blank">${palavra.assim1}</a>,
                        <a href="${palavra.assim2}" target="_blank">${palavra.assim2}</a>,
                        <a href="${palavra.assim3}" target="_blank">${palavra.assim3}</a>,
                        <a href="${palavra.assim4}" target="_blank">${palavra.assim4}</a>,
                        <a href="${palavra.assim5}" target="_blank">${palavra.assim5}</a>,
                    </p>
                    <div class="gifs">
                        ${palavra.gifs.map(gifUrl => `
                            <img src="${gifUrl}" alt="${palavra.titulo}" class="gif-item">
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    // Add the back button AFTER the results are populated
    if (found || !searchTerm) {
        // Hide the header logo
        const headerLogo = document.getElementById("header-logo");
        headerLogo.style.display = "none";

        // Hide the search bar
        const searchBar = document.querySelector(".search-bar");
        searchBar.style.display = "none";

        // Add a white box around the results
        resultsSection.style.backgroundColor = "white";
        resultsSection.style.padding = "2rem";
        resultsSection.style.borderRadius = "0.6rem";
        resultsSection.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

        // Add a back button
        const backButton = document.createElement("button");
        backButton.textContent = "Voltar";
        backButton.onclick = () => {
            // Reset the layout
            headerLogo.style.display = "block";
            searchBar.style.display = "flex";
            resultsSection.style.backgroundColor = "";
            resultsSection.style.padding = "";
            resultsSection.style.borderRadius = "";
            resultsSection.style.boxShadow = "";
            resultsSection.innerHTML = ''; 
        };

        // Add the back button to the results section
        resultsSection.appendChild(backButton);
    } else {
        resultsSection.innerHTML = "<p>Ainda não temos essa palavra.</p>";
    }
}