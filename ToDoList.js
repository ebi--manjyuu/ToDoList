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
//完了した予定をチェックする関数
function tcomp(){
	//console.log("intcomp");
	$(".comp").click(
		function(){
			var idx = $(".comp").index(this);
			$(".tooltip p").eq(idx).css("text-decoration","line-through");
			$(".tooltip p").eq(idx).css("background-color","blue");
	});
}

//選択して削除
function seldelt(){
	$(".selectDel").click(
		function(){
			var deldel = $(".selectDel");
			var idx = deldel.index(this);
			var final = localStorage.length - idx -1;
			var key = localStorage.key(final);
			var value = localStorage.getItem(key);
			$("#showStatus").text(value + "を削除しました。");
			localStorage.removeItem(key);
			showText();
	});
}


//スライドボタン
function slideinfo(){
	$(".open").click(function(){
		$(this).next(".slideBox").slideToggle("slow");
	});
}

//マウスオーバー応援関数
function mouseover(){
	$(".tooltip p").hover(function() {
    $(this).next("span").animate({opacity: "show", top: "-45"}, "slow");}, function() {
      $(this).next("span").animate({opacity: "hide", top: "-55"}, "fast");
    });
}

//予定数の表示
function countNum(){
	var tdnum = localStorage.length;
	if(tdnum == 0){
		$("#showNum").text("予定はありません");
	}else{
		$("#showNum").text(tdnum + "個の予定があります。");
	}
}


//入力情報をすべて消去する関数
function clearText(){
	localStorage.clear();
	$("#formText").val("");
}

// 入力された内容をローカルストレージに保存する
function saveText() {
	// 時刻をキーにして入力されたテキストを保存する
	var text = $("#formText");
	var time = new Date();
	var time2 = JSON.stringify(time);
	//入力チェック追加
	if(checkText(text.val())) { 
		var val = escapeText(text.val());
			localStorage.setItem(time2, val);
			// テキストボックスを空にする
			text.val("");
			$("#showStatus").text(val + "追加しました");
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
	var ttime = new Date(JSON.parse(key));
	var retime = ttime.getFullYear() + "年" + (ttime.getMonth() + 1) + "月" + ttime.getDate() + "日"
				+ ttime.getHours() + "時" + ttime.getMinutes() + "分" + ttime.getSeconds() + "秒";
	var str = "<div class='tooltip'><p>" + value + "</p>"
				+ "<span>" + "進捗どうですか？" + "</span></div>"
				+ "<input class=" + "'selectDel'" 
				+ " type=" + "'button'" + " value=" + "'削除'" + ">"
				+ "<input class=" + "'comp'" 
				+ " type=" + "'button'" + " value=" + "'完了!!'" + ">"
				+ "<p class=" + "open" + ">" + value + "の登録日" + "</p>"
				+ "<div class=" + "slideBox" + ">"
				+ "この予定は" + retime + "に登録されました。" + "</div>";
	html.push(str);
  }

  list.append(html.reverse().join(''));
  	countNum();
	mouseover();
	slideinfo();
	seldelt();
	tcomp();
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
