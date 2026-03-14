# CLAUDE.md

## 專案概覽

**心境水彩日記 (Tomo)** — 語音情緒日記 Prototype。使用者說話，App 偵測情緒並即時生成水彩暈染動畫，結束後可儲存為一篇日記。

## 檔案結構

```
tomo/
└── voice-diary.html   # 整個應用程式，單一 HTML 檔案，約 630 行
```

所有邏輯（HTML、CSS、JavaScript）都在這一個檔案裡。沒有 build 流程，沒有 npm，沒有框架。

## 技術棧

- 純 Vanilla JS + HTML5 + CSS3
- Web Speech Recognition API（語音轉文字，繁體中文 `zh-TW`）
- Web Audio API（麥克風音量分析）
- Canvas 2D API（水彩動畫）
- Google Fonts（Noto Serif TC、Playfair Display）

## 核心架構

### 情緒系統

`emotionConfig` 定義 10 種情緒，每種有：
- `color`：水彩暈染顏色
- `keywords`：關鍵字陣列（繁體中文）

偵測邏輯在 `detectEmotion(text)`：
- 掃描 keywords，計算分數（分數 = keyword 長度，避免短詞誤觸）
- 支援否定詞前綴（不/沒/別/未/非/莫/無）——否定詞出現時該情緒分數減半
- 取得分數最高的情緒作為當前情緒

### 水彩 Canvas

兩層 blob 系統：
- **Ambient blobs**（`waterBlobs` 陣列）：背景常態飄浮的柔和色塊，上限 80 個
- **Emotion blooms**（`emotionBlooms` 陣列）：偵測到情緒時觸發，較大且顏色更飽和，上限 30 個

動畫由 `animateCanvas()` 驅動（requestAnimationFrame），每幀：
1. 半透明覆蓋（製造水彩漸淡效果）
2. 更新並繪製所有 blobs
3. 錄音中每 8 幀 spawn 一個 ambient blob；閒置時每 60 幀

### 日記儲存

`diaryEntries` 陣列（記憶體內，無持久化）。每篇日記包含：
- `id`、`timestamp`
- `text`：語音轉文字內容
- `emotions`：情緒陣列
- `canvasSnapshot`：Canvas `toDataURL()` 擷取的快照（640×220）

### 已實作的關鍵流程

1. **錄音 → 情緒偵測 → 水彩動畫**：錄音中每 600ms 分析新增文字
2. **儲存日記**：停止錄音後，擷取 canvas 快照並存入 `diaryEntries`
3. **日記瀏覽**：卡片列表 → 點擊開 modal 查看詳情

## 尚未完成的部分

- **資料持久化**：目前所有日記在頁面重整後消失，需接 localStorage 或後端
- **刪除 / 編輯日記**：目前只能新增
- **情緒分析**：關鍵字比對較粗略，可考慮更完整的 NLP
- **行動裝置優化**：觸控體驗尚未特別處理
- **無障礙功能**：ARIA labels、鍵盤導航等
