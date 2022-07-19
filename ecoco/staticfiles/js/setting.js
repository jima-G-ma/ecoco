function clickBtn(){

	const area = document.form.area;

	// 値(数値)を取得
	const num = area.selectedIndex;
	//const num = document.form1.color1.selectedIndex;

	// 値(数値)から値(value値)を取得
	const str = area.options[num].value;
	//const str = document.form1.color1.options[num].value;

	document.getElementById("selectedarea").textContent = str; 
	console.log(str);
	//カレンダー変更
	changeDistrict(str);
}

