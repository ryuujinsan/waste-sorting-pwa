// data/waste_data.js

const wasteData = [
  {
    "item": "ペットボトル",
    "category": "資源",
    "details": "キャップとラベルを外す、中を洗う",
    "notes": "極力油汚れのないようにお願いします",
    "imageUrl": "",
    "officeId": "common"
  },
  {
   "item": "生たまご",
   "category": "一般",
   "details": "",
   "notes": "",
   "imageUrl": "",
   "officeId": "common"
 },
 {
   "item": "生魚",
   "category": "一般",
   "details": "",
   "notes": "",
   "imageUrl": "",
   "officeId": "common"
 },
 {
   "item": "新聞紙",
   "category": "資源",
   "details": "紙",
   "notes": "袋に入れずひもで括って出してください",
   "imageUrl": "",
   "officeId": "common"
 },
  // ... 他の分別ルールデータをここに貼り付け
];

const calendarData = [
 // {
   // "date": "2025-06-10",
    //"day": "火",
    //"category": "可燃ごみ",
    //"notes": "通常通り",
    //"officeId": "common"
  //},
  //{
    //"date": "2025-06-13",
    //"day": "金",
    //"category": "資源ごみ",
    //"notes": "祝日のため収集なし",
    //"officeId": "officeA" // 事業所A専用の場合
  //},
  // ... 他の収集カレンダーデータをここに貼り付け
  {
   "day": "月",
   "category": "一般",
   "notes": "",
   "officeID": 1
 },
 {
   "day": "月",
   "category": "資源",
   "notes": "",
   "officeID": 1
 },
 {
   "day": "火",
   "category": "一般",
   "notes": "",
   "officeID": 1
 },
 {
   "day": "水",
   "category": "一般",
   "notes": "",
   "officeID": 1
 },
 {
   "day": "木",
   "category": "一般",
   "notes": "",
   "officeID": 1
 },
 {
   "day": "金",
   "category": "一般",
   "notes": "",
   "officeID": 1
 },
 {
   "day": "月",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
 {
   "day": "火",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
 {
   "day": "水",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
 {
   "day": "木",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
 {
   "day": "金",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
 {
   "day": "土",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
 {
   "day": "日",
   "category": "一般",
   "notes": "",
   "officeID": 2
 },
];

// 必要に応じて、事業所リストも追加できます
const officeList = [
  { "id": "common", "name": "全事業所共通" },
  { "id": "1", "name": "野村證券和歌山支店" },
  { "id": "2", "name": "イズミヤ和歌山店" },
  // ...
];