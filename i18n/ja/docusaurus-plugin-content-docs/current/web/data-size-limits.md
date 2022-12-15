# データ制限

ダウンロードされたファイルのサイズ、結果セット内のセルの数 (集計後)、ピボット テーブルとグリッドのサイズ (セルの数として指定) に関して、Reveal Web を使用する場合のサーバー側のサイズ制限があります。
これらの制限の目的は、サーバーのリソース (メモリとディスク領域) が不足するのを防ぐことです。

デフォルトの制限値:

-	csv/json/excel をダウンロードする場合は 200mb
-	1000 万のセル
-	6400 万文字 (すべてのセルにすべての文字列を追加)

## デフォルト値を変更

### ソース
[**RevealEmbedSettings**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RevealEmbedSettings.html)


| プロパティ  |   型| 説明  |  
|---|---|---|
|  MaxDownloadSize | `System.Nullable<System.Int64>`  | 1 回のダウンロード (CSV ファイルなど) のサイズに制限を設定します。デフォルトは 200Mb です。|
|  MaxInMemoryCells | `System.Nullable<System.Int64>`  | このプロパティを、任意のデータ ソース (SQL Server テーブルの行、CSV 行など) から処理されるセルの予想される最大サイズに設定します。エンジンは、キャッシュにディスク領域を使いすぎないようにします。この設定は、キャッシュ管理のヒントを提供します。デフォルトは 1000 万セルです。 |
|  MaxStringCellSize | `System.Nullable<System.Int32>`  |  データセット列の文字列が持つことができる文字数の制限を設定します。デフォルトは 256 です。 |
|  MaxTotalStringsSize | `System.Nullable<System.Int64>`  | このプロパティを、すべてのセルの文字の総数として指定された、ピボット テーブルまたはグリッドの予想される最大サイズに設定します。エンジンはメモリの使用を避け、この設定はメモリ管理のヒントを提供します。デフォルトは 6400 万です。 |
