const textHabit = document.getElementById("grocery");
const containerHabits = document.querySelector(".lists");
const btnSubmit = document.querySelector(".add-habit");
const alertRed = document.querySelector(".alert");
const clearBtn = document.querySelector(".clear-btn");

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
});

function hiddenAlert() {
  alertRed.textContent = "";
  alertRed.classList.value = "alert";
}
btnSubmit.addEventListener("click", function () {
  if (textHabit.value === "") {
    alertRed.textContent = "الحقل فارغ، اكتب عادة جديدة ليتم إضافتها";
    alertRed.classList.add("danger");
  } else {
    const article = document.createElement("article");
    article.className = "item-habit hov";
    article.innerHTML = `<span class='done'></span>
    <p title="This is your habit. Do it" class="title">${textHabit.value}</p>
    <input type='text' placeholder='قم بتعديل عادتك...'  class='edit' >
    <div class="btn-container">
      <button type="button" class="edit-btn two">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    containerHabits.append(article);
    clear();
    alertRed.textContent = "تمت إضافة عادة جديدة";
    alertRed.classList.add("success");
  }
  set();
  btnDone();
  btnEdit();
  btnDelete();
  btnClear();
  setTimeout(hiddenAlert, 1000);
  textHabit.value = "";
});
function btnDone() {
  const arrArt = Array(...containerHabits.children);
  arrArt.forEach((e) => {
    let btn = e.children[0];
    let test = 0;
    btn.addEventListener("click", function (ev) {
      if (test === 0) {
        ev.currentTarget.classList.add("do");
        e.children[1].style = `filter: opacity(0.7);text-decoration: line-through;`;
        e.className = "item-habit";
        test++;
        e.style = `transition: var(--transition);background-color: rgb(107 230 117 / 48%);order: ${test};`;
        alertRed.textContent = "أحسنت، استمر في النجاح كل يوم";
        alertRed.classList.add("success");
        setTimeout(hiddenAlert, 1000);
      } else {
        ev.currentTarget.classList.remove("do");
        e.style = "background-color: transparent;";
        e.children[1].style = "filter: opacity(1);text-decoration: none;";
        e.className = "item-habit hov";
        test = 0;
      }
      set();
    });
  });
}
function btnEdit() {
  let changed = 0;
  const arrArt = Array(...containerHabits.children);
  arrArt.forEach((e) => {
    let btnEdit = e.children[3].children[0];
    let p = e.children[1];
    let input = e.children[2];
    btnEdit.addEventListener("click", function () {
      if (changed === 0) {
        btnEdit.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        btnEdit.style = "color: var(--clr-green-dark); font-size: 1rem;";
        e.style.background = "#e6c16b63";
        input.value = p.textContent;
        input.style = "display: block;";
        p.style = "display: none;";
        e.className = "item-habit";
        changed = 1;
      } else {
        btnEdit.innerHTML = `<i class="fas fa-edit"></i>`;
        btnEdit.style = "color: rgb(255 187 29); font-size: 0.7rem;";
        e.style.background = "transparent";
        p.textContent = input.value;
        input.style = "display: none;";
        p.style = "display: block;";
        e.className = "item-habit hov";
        alertRed.textContent = "تم تعديل العادة بنجاح";
        alertRed.classList.add("success");
        clear();
        if (p.textContent === "") {
          p.parentElement.remove();
          alertRed.textContent = "تم حذف العادة";
          alertRed.classList.remove("success");
          alertRed.classList.add("danger");
          set();
        }
        setTimeout(hiddenAlert, 1000);
        set();
        changed = 0;
      }
    });
  });
}
function btnDelete() {
  const arrArt = Array(...containerHabits.children);
  arrArt.forEach(function (e) {
    e.lastElementChild.lastElementChild.addEventListener("click", () => {
      e.remove();
      alertRed.textContent = "تم حذف العادة";
      alertRed.classList.add("danger");
      setTimeout(hiddenAlert, 1000);
      set();
    });
  });
}

function btnClear() {
  const sha = document.querySelector(".sha");
  const box = document.querySelector(".box-clear");
  const buttons = document.querySelector(".buttons");
  clearBtn.addEventListener("click", () => {
    box.style = "transform: translate(-50%, -50%) scale(1);";
    sha.style = "background-color: #0000006e;z-index: 5;";

    buttons.children[0].addEventListener("click", function () {
      box.style = "transform: translate(-50%, -50%) scale(0);";
      sha.style = "background-color: #00000000;z-index: -1;";
      const arrArt = Array(...containerHabits.children);
      arrArt.forEach((e) => e.remove());
      alertRed.textContent = "تم حذف جميع العادات";
      alertRed.classList.add("danger");
      setTimeout(hiddenAlert, 1000);
      clear();
      set();
    });
    buttons.children[1].addEventListener("click", function () {
      box.style = "transform: translate(-50%, -50%) scale(0);";
      sha.style = "background-color: #00000000;z-index: -1;";
    });
    sha.addEventListener("click", function () {
      box.style = "transform: translate(-50%, -50%) scale(0);";
      sha.style = "background-color: #00000000;z-index: -1;";
    });
  });
}
function clear() {
  if (containerHabits.children.length === 0) {
    clearBtn.style = "visibility: hidden;";
  } else {
    clearBtn.style = "visibility: visible;";
  }
}

function set() {
  window.localStorage.setItem("tasks", containerHabits.innerHTML);
}

function get() {
  containerHabits.innerHTML = window.localStorage.getItem("tasks");
}

get();
btnDone();
btnEdit();
btnDelete();
btnClear();
clear();
