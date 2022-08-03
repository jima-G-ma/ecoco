const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

const ide = sessionStorage.getItem('ide');

const ideObj = JSON.parse(ide);
console.log(ideObj);

//地区の取得
var tiku;
const area = document.form.area;
const num = area.selectedIndex;
tiku = area.options[num].value;
var tikuInfo = [];
var todayInfo;  createProcess(today.getFullYear(), today.getMonth())[1];
var month = today.getMonth();
var year = today.getFullYear();

function showmonth() {
  var month = now.getMonth();
  return month + 1;
}
function showday() {
  var day = now.getDate();
  return day;
}
// 初期表示
window.addEventListener('load', function () {
  showProcess(today, calendar2);
  rel();
  //今日の日付を表示
  var now = new Date();
  todayInfo = createProcess(today.getFullYear(), today.getMonth())[1];
  document.querySelector('#todayInfo').innerHTML = todayInfo;
});
// 前の月表示
function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  showProcess(showDate);
  document.querySelector('#todayInfo').innerHTML = todayInfo;
}

// 次の月表示
function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  showProcess(showDate);
  document.querySelector('#todayInfo').innerHTML = todayInfo;
}

//地区変更時
function changeDistrict(str) {
  tikuInfo = [];
  let tiku2 = str;
  tiku = tiku2;
  for (var i = 0; i < ideObj.length; i++) {
    if (tiku2 == ideObj[i].name) {
      tikuInfo.push({ name: ideObj[i].name, categoly: ideObj[i].categoly, date: ideObj[i].date });
    }
  }
  document.querySelector('#todayInfo').innerHTML = createProcess(today.getFullYear(), today.getMonth())[1];
  console.log(tiku)
  console.log(tikuInfo);
  showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

  var calendar2 = createProcess(year, month);
  document.querySelector('#calendar2').innerHTML = calendar2[0];
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  var calendar2 = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    calendar2 += "<th>" + week[i] + "</th>";
  }
  calendar2 += "</tr>";

  var todayInfo="";
  var count = 0;
  var count2 = 1;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week.length);
  var month2 = month + 1;

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
      var plaDay;
      let boolean1 = tikuInfo.some(item => item.date == year + '/' + month2 + '/' + count2);
      console.log(boolean1)
      if (boolean1) {
        console.log(year + '/' + month2 + '/' + count2);
      }
      if (tiku == "東岐波" || tiku == "西岐波" || tiku == "常盤" || tiku == "恩田" || tiku == "岬" ||
        tiku == "初見" || tiku == "上宇部" || tiku == "神原" || tiku == "琴芝" || tiku == "川上") {
        plaDay = (week[k] == "木");
      } else if(tiku == ""){
        plaDay = "";
      }else {
        plaDay = (week[k] == "火");
      }
      if (i == 0 && k < startDayOfWeek || count2 >= endDate + 1) {
        calendar2 += "<td>" + " " + "</td>";

      } else if (boolean1) {
        let found = tikuInfo.findIndex(v => v.date == year + '/' + month2 + '/' + count2);
        if (tikuInfo[found].categoly == "燃やせないごみ") {
          calendar2 += "<td class='no_burnig'>" + tikuInfo[found].categoly + "</td>";
          if (judgeMonth && judgeYear && count2 == today.getDate()){
            todayInfo += "<span class='text-secondary'>" + "燃やせないごみ</span>の日です";
          }
        } else {
          calendar2 += "<td class='paper'>" + tikuInfo[found].categoly + "</td>";
          if (judgeMonth && judgeYear && count2 == today.getDate()){
            todayInfo += "<span class='text-success'>" + "古紙・紙製容器包装</span>の日です";
          }
        }
        count2++;
      } else if (moeruDay) {
        calendar2 += "<td class='burning'>" + "燃えるごみ" + "</td>";
        if (judgeMonth && judgeYear && count2 == today.getDate()){
          todayInfo += "<span class='text-danger'>" + "燃えるごみ</span>の日です";
        }

        count2++;
      } else if (plaDay) {
        calendar2 += "<td class='blueing'>" + "プラごみ" + "</td>";
        if (judgeMonth && judgeYear && count2 == today.getDate()){
          todayInfo += "<span class='text-primary'>" + "プラごみ</span>の日です";
        }

        count2++
      } else {
        calendar2 += "<td>" + " " + "</td>";
        count2++;
      }
    }
    calendar2 += "</tr>";
  }
  return [calendar2, todayInfo];
}

//ページ遷移した来た時に一度だけリロードする
function rel() {
  if (window.name != "any") {
    location.reload();
    window.name = "any";
  } else {
    window.name = "";
  }
}

var Data = [];
fetch("{% static 'json/gomi.json' %}")
  .then(response => {
    return response.json();
  })
  .then(jsondata => {
    var data = [];
    data = jsondata;
    const dataStr = JSON.stringify(data);
    sessionStorage.setItem('ide', dataStr);
  });