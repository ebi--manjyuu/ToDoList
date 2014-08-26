$(loaded);
function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
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
	});
}

//以下関数群
//全部消す
function clearText(){
	localStorage.clear();
	$("#formText").val("");
}

// 入力された内容をローカルストレージに保存する
function saveText() {
	// 時刻をキーにして入力されたテキストを保存する
	var text = $("#formText");
	var time = new Date();
	//入力チェック追加
	if(checkText(text.val())) { 
		var val = escapeText(text.val());
			localStorage.setItem(time, val);
			// テキストボックスを空にする
			text.val("");
			$("#showStatus").text("追加しました");
	}
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
  console.log(html.join(''));
  list.append(html.reverse().join(''));
}


// 文字をエスケープする
function escapeText(text) {
return $("<div>").text(text).html();
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 20 < text.length) {
	alert("文字数は1〜20字にしてください");
	$("#showStatus").text("入力しなおしてください。");
	return false;
  }
  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
	var key = localStorage.key(i);
	var value = localStorage.getItem(key);
	// 内容が一致するものがあるか比較
	if (text === value) {
		$("#showStatus").text("再入力をお願いします。");
	  alert("同じ内容は避けてください");
	  return false;
	}
  }
  // すべてのチェックを通過できれば可
  return true;
}
