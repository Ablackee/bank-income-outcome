import "./styles.css";

const Title = ["income", "outcome"];
let total_outcome = 0;
let total_income = 0;
let date = new Date();
let balance = 0;

let option = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short"
};

let today = date.toLocaleDateString("fr", option);
let income_array = [];
let outcome_array = [];

const app = document.getElementById("app");

const titre_amount = document.createElement("div");
titre_amount.classList.add("place-items-center");
app.appendChild(titre_amount);

const titre_desc = document.createElement("div");
app.appendChild(titre_desc);

const Amount = document.createElement("p");
Amount.textContent = `Amount`;
Amount.classList.add("font-bold");
titre_amount.appendChild(Amount);

const descrip = document.createElement("p");
descrip.textContent = `Description`;
descrip.classList.add("font-bold");
titre_desc.appendChild(descrip);

const form = document.createElement("form");
app.appendChild(form);
form.classList.add("flex", "justify-around", "mt-10");

const income = document.createElement("button");
income.value = "income";
income.type = "submit";
income.textContent = "income";
income.classList.add("inset-x-0", "top-0");
form.appendChild(income);

const valeur = document.createElement("Input");
valeur.placeholder = "Entrez la valeur";
valeur.required = "required";
valeur.classList.add("border-slate-300", "border-2", "flex", "justify-around");
valeur.type = "number";
titre_amount.appendChild(valeur);

const desc = document.createElement("Input");
desc.placeholder = "description...";
desc.classList.add(
  "border-slate-300",
  "border-2",
  "outline-none",
  "flex",
  "justify-around"
);
desc.required = "required";
titre_desc.appendChild(desc);

const outcome = document.createElement("button");
outcome.value = "outcome";
outcome.type = "submit";
outcome.textContent = "outcome";

form.appendChild(outcome);

income.classList.add(
  "bg-green-600",
  "text-white",
  "font-bold",
  "border-blue-600",
  "hover:bg-green-700",
  "active:bg-blue-700"
);
outcome.classList.add(
  "bg-red-600",
  "text-white",
  "font-bold",
  "border-blue-600",
  "hover:bg-red-700",
  "active:bg-blue-700"
);

/*  Table  */

const table = document.createElement("table");
app.appendChild(table);
table.classList.add("text-center", "w-full", "border-2");
table.classList.add();

const thead = document.createElement("thead");
thead.classList.add("text-center", "w-full", "border-2");
table.appendChild(thead);

const tr_f = document.createElement("tr");

const tbody = document.createElement("tbody");
table.appendChild(tbody);

const createth = (title, parent, classInfo) => {
  const th = document.createElement("th");
  th.textContent = `${title}`;
  th.classList.add("text-center");
  parent.appendChild(th);

  return th;
};

Title.forEach((element) => {
  createth(element, tr_f);
});

let titre = tr_f.childNodes;
titre[0].classList.add("bg-green-600");
titre[1].classList.add("bg-red-600");

thead.appendChild(tr_f);

/* INCOME */

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
income.addEventListener("click", () => {
  if (valeur.value !== "") {
    if (desc.value !== "") {
      let last = income_array.length;
      income_array.push({
        valeur: Number(valeur.value),
        desc: desc.value,
        date: today
      });
      console.log(income_array);

      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let td_2 = document.createElement("td");
      const day_income = document.createElement("p");
      const desc_income = document.createElement("p");
      const valeur_income = document.createElement("p");

      day_income.textContent = `${income_array[last].date}`;
      desc_income.textContent = `${income_array[last].desc}`;
      valeur_income.textContent = `${income_array[last].valeur}$`;

      day_income.classList.add("text-right", "text-slate-900");
      valeur_income.classList.add("text-left");
      desc_income.classList.add("text-left");

      let get_all_tr = document.querySelectorAll("tr");
      let get_outcome_income_tr = get_all_tr[get_all_tr.length - 1];
      get_outcome_income_tr.remove();

      td_2.innerText = "";

      total_income += income_array[last].valeur;

      td_total_income.innerText = `total income : ${total_income}$`;

      td.classList.add("text-green-600", "bg-slate-600", "font-bold");

      td_2.classList.add("bg-slate-600");

      td.appendChild(day_income);
      td.appendChild(valeur_income);
      td.appendChild(desc_income);

      tr.appendChild(td);
      tr.appendChild(td_2);
      tbody.appendChild(tr);
      tbody.append(get_outcome_income_tr);
    }
    updateView();
  }
});

/* OUTCOME */

outcome.addEventListener("click", () => {
  if (valeur.value !== "") {
    if (desc.value !== "") {
      let last = outcome_array.length;
      outcome_array.push({
        valeur: Number(valeur.value),
        desc: desc.value,
        date: today
      });
      console.log(outcome_array);

      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let td_2 = document.createElement("td");
      const day_outcome = document.createElement("p");
      const desc_outcome = document.createElement("p");
      const valeur_outcome = document.createElement("p");

      let get_all_tr = document.querySelectorAll("tr");
      let get_outcome_income_tr = get_all_tr[get_all_tr.length - 1];
      get_outcome_income_tr.remove();

      day_outcome.textContent = `${outcome_array[last].date}`;
      desc_outcome.textContent = `${outcome_array[last].desc}`;
      valeur_outcome.textContent = `${outcome_array[last].valeur}$`;

      day_outcome.classList.add("text-right", "text-slate-900");
      valeur_outcome.classList.add("text-left");
      desc_outcome.classList.add("text-left");
      td.innerText = "";

      td_2.classList.add("text-red-500", "bg-slate-600", "font-bold");

      td.classList.add("bg-slate-600");

      total_outcome += outcome_array[last].valeur;

      td_total_outcome.innerText = `total outcome : ${total_outcome}$`;

      day_outcome.appendChild(td);

      td_2.appendChild(day_outcome);
      td_2.appendChild(valeur_outcome);
      td_2.appendChild(desc_outcome);

      tr.appendChild(td);
      tr.appendChild(td_2);
      tbody.appendChild(tr);
      tbody.append(get_outcome_income_tr);
    }
    updateView();
  }
});

/* total */

let tr_total = document.createElement("tr");
let td_total_income = document.createElement("td");
td_total_income.classList.add("text-green-600", "bg-slate-600", "font-bold");
td_total_income.innerText = `Total income : ${total_income}`;
let td_total_outcome = document.createElement("td");
td_total_outcome.classList.add("text-red-600", "bg-slate-600", "font-bold");
td_total_outcome.innerText = `Total outcome : ${total_outcome}`;

tr_total.appendChild(td_total_income);
tr_total.appendChild(td_total_outcome);
tbody.appendChild(tr_total);

/* balance */

const balancecount = document.createElement("h2");

balancecount.classList.add("text-center", "font-bold");

app.appendChild(balancecount);

const updateView = () => {
  balance = total_income - total_outcome;

  balancecount.textContent = `balance : ${balance}$`;

  if (balance !== 0) {
    if (balance < 0) {
      balancecount.classList.remove("bg-green-600");
      balancecount.classList.add("bg-red-600");
    }
    if (balance > 0) {
      balancecount.classList.remove("bg-red-600");
      balancecount.classList.add("bg-green-600");
    }
  }
};

updateView();
