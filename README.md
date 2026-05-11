# lstudio-demo-assets

Lスタジオ7業種デモの公開アセット集（GitHub Pages で配信）。

## 構成

```
restaurant/menu-image/   飲食店デモのメニュー画像（高級レストラン風）
```

今後ここに `juku/`, `hostess/`, `host/`, `lawyer/`, `tax/`, `clinic/` を追加していく。

## 配信URL

`https://seed-create.github.io/lstudio-demo-assets/<path>`

例：
```
https://seed-create.github.io/lstudio-demo-assets/restaurant/menu-image/m001-hamburg.jpg
```

## 画像最適化

元画像（PNG・2MB前後）を 1024×1024 / JPG q88 に圧縮（90%超削減・150KB前後）。

```bash
npm install
npm run optimize
```

入力: `../restaurant-line-demo/menu-image/*.png`
出力: `./restaurant/menu-image/*.jpg`
