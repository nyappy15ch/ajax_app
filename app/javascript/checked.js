function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      //クリック時の処理を以下の記載している
      const postId = post.getAttribute("data-id")

      //リクエストの作成・レスポンスの指定・リクエストの送信
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();

      //レスポンスの受信とその後の処理
      XHR.onload = () =>{
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true){
          post.setAttribute("data-check","true");
        } else if (item.checked === false){
          post.removeAttribute("data-check")
        }
      }
    });
  });
}
setInterval(check, 1000);