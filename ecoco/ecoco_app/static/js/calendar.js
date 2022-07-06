const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

function showmonth() {
  var month = now.getMonth();
  return month + 1;
}
function showday() {
  var day = now.getDate();
  return day;
}
// 初期表示
window.onload = function () {
  showProcess(today, calendar2);
  //今日の日付を表示
  var now = new Date();
  // document.getElementById("month").innerHTML = showmonth();
  // document.getElementById("date").innerHTML = showday();
};
// 前の月表示
function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  showProcess(showDate);
}

// 次の月表示
function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  showProcess(showDate);
}

//地区変更時
function chnageDistrict() {
  showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

  var calendar2 = createProcess(year, month);
  document.querySelector('#calendar2').innerHTML = calendar2;
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  var calendar2 = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    calendar2 += "<th>" + week[i] + "</th>";
  }
  calendar2 += "</tr>";

  //地区の取得
  const area = document.form.area;
  const num = area.selectedIndex;
  const tiku = area.options[num].value;

  var count = 0;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week.length);

  // 1行ずつ設定
  for (var i = 0; i < row; i++) {
    calendar2 += "<tr>";
    // 1colum単位で設定
    for (var j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        calendar2 += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar2 += "<td class='disabled'>" + (count - endDate) + "</td>";
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        // カレンダーの数字部分を設定
        count++;
        var judgeToday = count == today.getDate();
        var judgeMonth = month == today.getMonth();
        var judgeYear = year == today.getFullYear();
        if (judgeToday && judgeMonth && judgeYear) {
          calendar2 += "<td class='today'>" + count + "</td>";
        } else {
          calendar2 += "<td>" + count + "</td>";
        }
      }
    }
    calendar2 += "</tr>";

    //燃える日などの情報追加
    calendar2 += "<tr>";
    for (var k = 0; k < week.length; k++) {
      var moeruDay = (week[k] == "月" || week[k] == "水" || week[k] == "金");
      var plaDay
      if(tiku == "東岐波"||tiku == "西岐波"||tiku == "常盤"||tiku == "恩田"||tiku == "岬"||
      tiku == "初見"||tiku == "上宇部"||tiku == "神原"||tiku == "琴芝"||tiku == "川上"){
        plaDay = (week[k] == "木");
      }else{
        plaDay = (week[k] == "火");
      }
      if(i == 0 && k < startDayOfWeek || count >= endDate){
        calendar2 += "<td>" + " " + "</td>";
      }else if(moeruDay){
        calendar2 += "<td class='burning'>" + "燃えるゴミ" + "</td>";
      }else if(plaDay){
        calendar2 += "<td class='blueing'>" + "プラゴミ" + "</td>";
      }else{
        calendar2 += "<td>" + " " + "</td>";
      }
    }
    calendar2 += "</tr>";
  }
  return calendar2;
}