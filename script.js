let div = document.createElement("div");
div.classList.add("container");

let row = document.createElement("div");
row.classList.add("row", "d-flex", "justify-content-center");
row.setAttribute("id", "content");

//for pagination
let pagi_div = document.createElement("div");
pagi_div.classList.add(
  "container-fluid",
  "d-flex",
  "justify-content-center",
  "p-1"
);
pagi_div.setAttribute("id", "buttons");

//appending to document
div.append(row);
document.body.append(div, pagi_div);

async function fetchData() {
  try {
    const fetchData = await fetch("https://mmo-games.p.rapidapi.com/games", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ca5f9128ccmsh07230a7ccb435a2p1f9605jsn5273172688dc",
        "X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
      },
    });
    const details = await fetchData.json();

    const content = document.getElementById("content");
    const pagination = document.getElementById("buttons");

    let currentPage = 1;

    // content per page
    let number_of_cols = 30;

    function displaylist(details, wrapper, rows_per_page, page) {
      wrapper.innerHTML = " ";
      page--;
      let loop_start = rows_per_page * page;
      let paginated_items = details.slice(
        loop_start,
        rows_per_page + loop_start
      );

      for (let i = 0; i < paginated_items.length; i++) {
        createCol(paginated_items[i]);
      }
    }

    function setupPagination(details, wrapper, rows_per_page) {
      wrapper.innerHTML = " ";
      let page_count = Math.ceil(details.length / rows_per_page);

      for (let i = 1; i <= page_count; i++) {
        let btn = paginationButton(i);
        wrapper.appendChild(btn);
      }
    }

    function paginationButton(page) {
      let button = document.createElement("button");
      button.setAttribute("value", page);
      button.classList.add("btn", "btn-outline-secondary");
      button.innerText = page;

      //adding eventlistners to buttons

      if (currentPage == page) button.classList.add("active");
      button.addEventListener("click", () => {
        let currentPage = page;
        displaylist(details, content, number_of_cols, currentPage);

        let current_btn = document.querySelector("#buttons button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
      });
      return button;
    }

    //calls to set data

    displaylist(details, content, number_of_cols, currentPage);
    setupPagination(details, pagination, number_of_cols);
  } catch (error) {
    console.log(error);
    createCol("Something Went Wrong");
  }
}
fetchData();

//function to create column inorder to display data

function createCol(data) {
  let col = document.createElement("div");
  col.classList.add("col-4");
  col.innerHTML = `
    
    
    <div class="card text-white bg-light mb-3 mt-3 shadow-lg" >
    <img src="${data.thumbnail}" class="card-img-top mb-2" alt="...">
    
    <div class="card-body  bg-transparent">
    <h4 class="card-text text-dark text-center">${data.title}</h4>
    <div class="card-text text-dark text-center mb-2">${data.short_description}</div>
        <div class="card-text text-dark"><b>Genre :</b> ${data.genre}</div>
        <div class="card-text text-dark"> <b>Publisher :</b> ${data.publisher}</div>
<div class="text-center mt-4"><a href="${data.game_url}" class="btn btn-outline-info  btn-lg"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Website</a>
    </div>
        
    </div>
    
    </div>`;

  row.append(col);
}
