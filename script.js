// script.js

// === UI要素の取得 ===
const searchInput = document.getElementById('search-input');
const searchResultsDiv = document.getElementById('search-results');
const calendarViewDiv = document.getElementById('calendar-view');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const officeSelect = document.getElementById('office-select');

let currentOfficeId = 'common'; // デフォルトは共通ルール

// === 事業所選択の初期化とイベントリスナー ===
function initOfficeSelector() {
    if (typeof officeList !== 'undefined' && officeList.length > 0) {
        officeList.forEach(office => {
            const option = document.createElement('option');
            option.value = office.id;
            option.textContent = office.name;
            officeSelect.appendChild(option);
        });
    } else {
        // officeList が定義されていない、または空の場合
        // 事業所選択コンテナを非表示にするなどの処理
        document.querySelector('.office-selector-container').style.display = 'none';
        console.warn("officeList が定義されていないか空です。事業所選択機能は利用できません。");
    }

    officeSelect.addEventListener('change', (event) => {
        currentOfficeId = event.target.value;
        renderSearchResults(searchInput.value); // 事業所変更時に再検索
        renderCalendar(); // 事業所変更時にカレンダーを再描画
    });
}

// === タブ切り替え機能 ===
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // activeクラスの切り替え
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // タブコンテンツの表示/非表示
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(button.dataset.tab).classList.add('active');

        // タブ切り替え時にコンテンツを更新
        if (button.dataset.tab === 'search') {
            renderSearchResults(searchInput.value);
        } else if (button.dataset.tab === 'calendar') {
            renderCalendar();
        }
    });
});

// === 検索機能 ===
searchInput.addEventListener('input', (event) => {
    renderSearchResults(event.target.value);
});

function renderSearchResults(query) {
    searchResultsDiv.innerHTML = ''; // 検索結果をクリア
    const normalizedQuery = query.toLowerCase().trim();

    // 現在の事業所IDに合致するデータ、または 'common' のデータをフィルタリング
    const filteredData = wasteData.filter(item =>
        (item.officeId === currentOfficeId || item.officeId === 'common') &&
        item.item.toLowerCase().includes(normalizedQuery)
    );

    if (filteredData.length === 0) {
        searchResultsDiv.innerHTML = '<p class="no-results">検索結果が見つかりませんでした。</p>';
        return;
    }

    filteredData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('waste-item');

        const imageUrl = item.imageUrl || 'https://via.placeholder.com/80?text=No+Image'; // 画像がない場合の代替
        itemDiv.innerHTML = `
            <img src="${imageUrl}" alt="${item.item}">
            <div class="waste-item-content">
                <h3>${item.item}</h3>
                <p><strong>分別区分:</strong> ${item.category}</p>
                <p><strong>分別詳細:</strong> ${item.details}</p>
                ${item.notes ? `<p><strong>注意点:</strong> ${item.notes}</p>` : ''}
            </div>
        `;
        searchResultsDiv.appendChild(itemDiv);
    });
}

// === 収集カレンダー機能 ===
function renderCalendar() {
    calendarViewDiv.innerHTML = ''; // カレンダーをクリア

    // 未来の日付に限定してフィルタリング（例: 今日から30日後まで）
    const today = new Date();
    const futureDateLimit = new Date();
    futureDateLimit.setDate(today.getDate() + 30); // 今から30日後

    const filteredCalendarData = calendarData.filter(event => {
        const eventDate = new Date(event.date);
        return (event.officeId === currentOfficeId || event.officeId === 'common') &&
               eventDate >= today && eventDate <= futureDateLimit;
    });

    // 日付でソート
    filteredCalendarData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 日付ごとにグループ化
    const groupedByDate = filteredCalendarData.reduce((acc, event) => {
        const dateStr = event.date;
        if (!acc[dateStr]) {
            acc[dateStr] = [];
        }
        acc[dateStr].push(event);
        return acc;
    }, {});

    if (Object.keys(groupedByDate).length === 0) {
        calendarViewDiv.innerHTML = '<p class="no-results">今後の収集予定が見つかりませんでした。</p>';
        return;
    }

    for (const date in groupedByDate) {
        const eventsOnDate = groupedByDate[date];
        const dateObj = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        const formattedDate = dateObj.toLocaleDateString('ja-JP', options);

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.innerHTML = `<h3>${formattedDate}</h3><ul></ul>`;

        const ul = dayDiv.querySelector('ul');
        eventsOnDate.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.category} ${event.notes ? `(${event.notes})` : ''}`;
            ul.appendChild(li);
        });
        calendarViewDiv.appendChild(dayDiv);
    }
}


// === 初期化処理 ===
document.addEventListener('DOMContentLoaded', () => {
    initOfficeSelector(); // 事業所選択を初期化
    renderSearchResults(''); // 初期表示として全て表示（空検索）
    // カレンダーはタブが選択された時に表示
});