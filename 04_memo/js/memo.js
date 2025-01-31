"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function () {
    // 1. localStorageが使えるか確認
    if (typeof localStorage === "undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      viewStorage();
      saveLocalStorage(); // 2. localStorageへの保存（ほぞん）
      delLocalStorage();
      allClearLocalStorage();
      selectTable();
    }
  }
);

// 2. localStorageへの保存（ほぞん）
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click",
    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      // 値の入力チェック
      if (key == "" || value == "") {
        window.alert("Key, Memoはいずれも必須（ひっす）です。");
        return;
      } else {
        let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存します。よろしいですか?");

        if (w_confirm === true) {
          localStorage.setItem(key, value);
          viewStorage();
          let w_msg = "LocalStorageに" + key + "と" + value + "を保存（ほぞん）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    }, false
  );
};

function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click", function (e) {
    e.preventDefault();
    let w_sel = "0";
    w_sel = selectCheckBox();

     if (w_sel === "1") {
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;
      let w_confirm = window.confirm("LocalStorageから\n「" + key + " " + value + "」\nを削除します。よろしいですか?");

       if (w_confirm === true) {
        localStorage.removeItem(key);
        viewStorage();
        let w_msg = "LocalStorageから" + key + " " + value + "を削除しました。";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
       }
     }
   }, false
  );
};

function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
    function (e) {
      e.preventDefault();
      let w_confirm = window.confirm("LocalStorageのデータを全て削除します。\よろしいですか?");

      if (w_confirm === true) {
        localStorage.clear();
        viewStorage();
        let w_msg = "LocalStorageのデータを全て削除しました。";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    }, false
  );
};

function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",
    function (e) {
      e.preventDefault();
      selectCheckBox();
    }, false
  );
};

function selectCheckBox() {
  let w_sel = "0";
  let w_cnt = 0;
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";
  let w_textMemo = "";

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if(w_cnt === 0){
        w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
      //return w_sel = "1";
      }
      w_cnt++
    }
  }
  
  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;
  if(w_cnt === 1){
    return w_sel = "1";
  }else{
    window.alert("１つ選択してください。");
  }
};

function viewStorage() {
  const list = document.getElementById("list");
  while (list[0]) list.deleteRow(0);
  while (list.rows[0]) list.deleteRow(0);

  for (let i = 0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML = "<input name ='chkbox1' type ='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }

  $("#table1").tablesorter({
    sortList: [[1, 0]]
  });

  $("#table1").trigger("update");
};