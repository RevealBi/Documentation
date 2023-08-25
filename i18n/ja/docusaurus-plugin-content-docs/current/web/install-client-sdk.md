# Client SDK のインストール

## スクリプト ファイルを使用してインストールする

### CDN を使用してインストールする
`index.html` ファイルを変更し、ページの下部に (`</body>` 終了タグの直前) `infragistics.reveal.js` スクリプトを含めます。

```html
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
```

### JavaScript ファイルを使用してインストールする
Reveal CDN を使用できない場合は、独自のドメインで Reveal SDK JavaScript ファイルをホストすることもできます。Reveal SDK 配布ファイルは、次のリンクからダウンロードできます:

https://download.infragistics.com/reveal/libs/[var:sdkVersion].0/reveal-sdk-distribution-js.zip

1 - クライアント アプリケーションで `assets` と呼ばれる新しいフォルダーを作成し、`assets` フォルダー内に `reveal` と呼ばれる別のフォルダーを作成します。

![](images/javascript-create-reveal-folder.jpg)

2 - Reveal SDK ディストリビューション ファイルからすべての JavaScript ファイルを、前に作成した `assets/reveal` フォルダーにコピーします。

![](images/javascript-copy-reveal-files.jpg)

3 - `index.html` ファイルを変更し、ページの下部に (`</body>` 終了タグの直前) `infragistics.reveal.js` スクリプトを含めます。

```html
<script src="./assets/reveal/infragistics.reveal.js"></script>
```

### 依存関係の追加
Reveal SDK が正しく機能するには、次の依存関係が必要です。

**Jquery 2.2 またはそれ以降**

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

**Day.js 1.8.15 またはそれ以降**

```html
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**Spectrum v 1.8.0 またはそれ以降 (オプション)** - これは、エンドユーザーが特定の表示形式の背景色を設定できるように UI を有効にする場合にのみ必要です。

``` html
<link href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" rel="stylesheet" type="text/css" >
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
```

`index.html` ファイルを変更し、ページの下部に (`infragistics.reveal.js` スクリプトの直前) すべての依存関係スクリプトを含めます。

最終の `index.html` ファイルは以下のようになります。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title> 
</head>
<body>

    // highlight-start
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>    
    <script src="./assets/reveal/infragistics.reveal.js"></script>   
    // highlight-end
</body>
</html>
```