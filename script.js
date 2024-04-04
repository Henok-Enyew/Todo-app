/* Copyright By 👨‍🏫👨‍🏫 Enoch 2023  */

"use strict";

const form = document.querySelector(".form");
const container = document.querySelector(".container");
const btnAdd = document.querySelector(".btn-add");
const btnDelete = document.querySelector(".btn-delete");
const task = document.querySelector(".task");
const tasks = document.querySelector(".tasks");
const marker = document.querySelector(".marker");
const label = document.querySelector(".label");
const statusChecked = document.querySelector(".status");
const checked = document.querySelector(".checked");
const total = document.querySelector(".total");

let numOfChecked = 0;
let numOfTotal = 0;

const countChecked = function (target) {
  const isChecked = target.dataset.checked;
  if (isChecked === "false") {
    numOfChecked++;
    target.dataset.checked = true;
  } else {
    numOfChecked--;
    target.dataset.checked = false;
  }
  showStatus();
  saveData();
};

const showStatus = function () {
  if (numOfChecked > numOfTotal / 2) {
    statusChecked.style.color = "var(--color-primary-opacity)";
    statusChecked.style.border = "3px solid var(--color-primary-opacity)";
  } else {
    statusChecked.style.color = "var(--color-primary)";
    statusChecked.style.border = "3px solid var(--color-primary)";
  }
  document.querySelector(".checked").textContent = numOfChecked;
  document.querySelector(".total").textContent = numOfTotal;
  saveData();
};
const addTask = function (e) {
  e.preventDefault();
  const newTask = form.value;
  if (form.value === "") {
    alert("Wanna do nothing dummy? you have to write something to do 😬");
    return;
  }
  form.value = "";
  const html = `<div class="task" data-checked = false>
  <div class="marker"></div>
  <p class="label">${newTask}</p>
  <button class="btn-delete">✖</button>
</div>`;

  tasks.insertAdjacentHTML("afterbegin", html);
  numOfTotal++;
  showStatus();
  saveData();
};
btnAdd.addEventListener("click", addTask);
tasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("marker")) {
    e.target.classList.toggle("marked");
    e.target.nextElementSibling.classList.toggle("marked-text");
    countChecked(e.target.parentElement);
    saveData();
  } else if (e.target.classList.contains("label")) {
    e.target.previousElementSibling.classList.toggle("marked");
    e.target.classList.toggle("marked-text");
    countChecked(e.target.parentElement);
    saveData();
  } else if (e.target.classList.contains("task")) {
    e.target.firstElementChild.classList.toggle("marked");
    e.target.firstElementChild.nextElementSibling.classList.toggle(
      "marked-text"
    );
    countChecked(e.target);
    saveData();
  } else if (e.target.classList.contains("btn-delete")) {
    e.target.parentElement.remove();
    if (e.target.parentElement.dataset.checked === "true") numOfChecked--;
    numOfTotal--;
    showStatus();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("dataTask", tasks.innerHTML);
  localStorage.setItem("numChecked", numOfChecked);
  localStorage.setItem("numTotal", numOfTotal);
}
function showData() {
  tasks.innerHTML = localStorage.getItem("dataTask");
  numOfChecked = localStorage.getItem("numChecked") || 0;
  numOfTotal = localStorage.getItem("numTotal") || 0;
  showStatus();
}
showData();
