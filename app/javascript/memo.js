function memo () {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form")) //formに入力された文字を取得するために設定

    //リクエストの作成・レスポンスの指定・リクエストの送信
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true)
    XHR.responseType = "json";
    XHR.send(formData);

    //レスポンスの受信とその後の処理
    XHR.onload = () => {

      //エラー時の動作
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      //正常時の動作
      const item = XHR.response.post; //レスポンスの内容を使用するために設定
      const list = document.getElementById("list"); //描画する親要素を指定するために設定
      const formText = document.getElementById("content"); //メモの入力フォームをリセットするために設定
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML); //listのの直後にHTMLを代入
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);