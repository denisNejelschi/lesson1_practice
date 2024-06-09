const content = document.querySelector("#content");
const form = document.querySelector("#form");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputField = document.querySelector("#input");
  const input = inputField.value.trim();

  const inputNumber = parseInt(input);
  if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 20) {
    displayError("Please enter a valid number between 1 and 20.");
    inputField.value = "";
    return;
  }

  errorMessage.style.display = "none";
  content.innerHTML = "";

  const loading = document.createElement("p");
  loading.textContent = "Loading...";
  loading.classList.add("loading");
  content.append(loading);

  setTimeout(() => {
    getProducts(inputNumber);
    inputField.value = "";
  }, 1000);
});

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

async function getProducts(amount) {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();

    content.innerHTML = "";

    data.products.slice(0, amount).forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("h3");
      title.textContent = element.title;
      title.classList.add("title");
      card.append(title);

      const description = document.createElement("p");
      description.textContent = element.description;
      description.classList.add("description");
      card.append(description);

      const meta = document.createElement("div");
      meta.classList.add("meta");

      card.append(meta);
      const img = document.createElement("img");
      img.classList.add("image");
      img.src = element.images[0];
      card.append(img);
      content.append(card);
    });
  } catch (error) {
    console.error("Fetch error: ", error);
    content.innerHTML =
      "<p class='error'>Failed to load products. Please try again later or not.</p>";
  }
}

async function getCategories() {
    
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    const category = document.querySelector("#category");
    category.innerHTML = "";

    data.forEach((element) => {
      const button = document.createElement("button");
      button.classList.add("cat-button");
      button.textContent = element.slug;
      button.addEventListener("click", () => {
        getByCategory(element.slug);
      });
      category.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
getCategories();


async function getByCategory(slug) {
    content.innerHTML = "";
    
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();  
      
  
      data.products.forEach((element) => {
        if (slug===element.category) {
            
            
          const card1 = document.createElement("div");
          card1.classList.add("card");
          const title = document.createElement("h3");
          title.textContent = element.title;
          title.classList.add("title");
          card1.append(title);
          const description = document.createElement("p");
          description.textContent = element.description;
          description.classList.add("description");
          card1.append(description);
          const meta = document.createElement("div");
          meta.classList.add("meta");
          const cat = document.createElement("p");
          cat.classList.add("category");          
          const tags = document.createElement("p");
          tags.classList.add("tags");
          tags.textContent = element.tags.join(", ");
          meta.append(tags);
          card1.append(meta);
          const img = document.createElement("img");
          img.classList.add("image");
          img.src = element.images[0];
          card1.append(img);
          content.append(card1); 
        }
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
}


  