$(loaded);
function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
 //$("#hoge").text(ごめんなさい);
	$("#clearButton").click(
		function(){
			clearText();
			showText();
			$("#showStatus").text("全削除しました");
	});

  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
	  $("#showStatus").text("追加しました");
    });
}

//以下関数群
//全部消す
function clearText(){
	localStorage.clear();
}

// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var time = new Date();
  localStorage.setItem(time, text.val());
  // テキストボックスを空にする
  text.val("");
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list")
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    html.push("<p>" + value + "</p>");
  }
  list.append(html.join(''));
}

