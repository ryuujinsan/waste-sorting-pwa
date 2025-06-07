// service-worker.js

const CACHE_NAME = 'waste-sorting-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/data/waste_data.js',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
    // 他にもキャッシュしたい静的ファイルがあればここに追加
    // 例: 'https://via.placeholder.com/80?text=No+Image' のような外部URLもキャッシュ可能だが注意
];

// インストールイベント: キャッシュにファイルを保存
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// フェッチイベント: リクエストをインターセプトし、キャッシュから返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュにレスポンスがあればそれを返す
                if (response) {
                    return response;
                }
                // キャッシュになければネットワークから取得
                return fetch(event.request).catch(() => {
                    // ネットワークエラー時にオフラインページなどを返すことも可能
                    // 例: return caches.match('/offline.html');
                });
            })
    );
});

// アクティベートイベント: 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});