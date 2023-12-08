function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  var destinationList = event.target.closest(".todo-list, .done-list");

  if (destinationList) {
    destinationList.appendChild(draggedElement);
  }
}

function createCard(id, title, text) {
  var card = document.createElement("div");
  card.className = "card";
  card.id = id;
  card.draggable = true;
  card.ondragstart = drag;

  var cardTitle = document.createElement("h3");
  cardTitle.textContent = title;

  var cardText = document.createElement("p");
  cardText.textContent = text;

  var moveButton = document.createElement("button");
  moveButton.textContent = "Move";
  moveButton.onclick = function () {
    var currentList = card.closest(".todo-list, .done-list");
    var targetList = currentList.id === "todo-list" ? "done-list" : "todo-list";
    document.getElementById(targetList).appendChild(card);
  };

  card.appendChild(cardTitle);
  card.appendChild(cardText);
  card.appendChild(moveButton);

  return card;
}

var tasks = [
  { id: "task1", title: "Kupovina namirnica", description: "Kupiti mleko, hleb, voće i povrće" },
  { id: "task2", title: "Planiranje odmora", description: "Rezervisati smeštaj, kupiti avionske karte i spakovati stvari" },
  { id: "task3", title: "Učenje za test", description: "Pregledati gradivo, rešavati vežbe i praviti beleške" },
  { id: "task4", title: "Vežbe i trening", description: "Odraditi trening u teretani i izvesti vežbe kod kuće" },
  { id: "task5", title: "Pisanje eseja", description: "Istražiti temu, prikupiti izvore i napisati esej" },
];

var todoList = document.getElementById("todo-list");
tasks.forEach(function (task) {
  var card = createCard(task.id, task.title, task.description);
  todoList.appendChild(card);
});
