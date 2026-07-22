# データ制限

ダウンロードされたファイルのサイズ、結果セット内のセルの数 (集計後)、ピボット テーブルとグリッドのサイズ (セルの数として指定) に関して、Reveal Web を使用する場合のサーバー側のサイズ制限があります。また、Reveal SDK では、クライアント側で 1 つのビジュアライゼーションに要求できるセル数にも制限があります。
これらの制限の目的は、サーバーのリソース (メモリとディスク領域) が不足するのを防ぐことです。

デフォルトの制限値:

-	csv/json/excel をダウンロードする場合は 200 MB
-	1000 万のセル
-	6400 万文字 (すべてのセルのすべての文字列を追加)
-	1 つのビジュアライゼーションに要求できるセル数は 100,000

## デフォルト値を変更

### ソース
[**RevealEmbedSettings**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RevealEmbedSettings.html)


| プロパティ  |   型| 説明  |  
|---|---|---|
|  MaxDownloadSize | `System.Nullable<System.Int64>`  | 1 回のダウンロード (CSV ファイルなど) のサイズに制限を設定します。デフォルトは 200 MB です。|
|  MaxStorageCells | `System.Nullable<System.Int64>`  | このプロパティを、任意のデータ ソース (SQL Server テーブルの行、CSV 行など) から処理されるセルの予想される最大数に設定します。エンジンは、キャッシュにディスク領域を使いすぎないようにします。この設定は、キャッシュ管理のヒントを提供します。デフォルトは 1000 万セルです。 |
|  MaxStringCellSize | `System.Nullable<System.Int32>`  |  データセット列の文字列が持つことができる文字数の制限を設定します。デフォルトは 256 です。 |
|  MaxTotalStringsSize | `System.Nullable<System.Int64>`  | このプロパティを、すべてのセルの文字の総数として指定された、ピボット テーブルまたはグリッドの予想される最大サイズに設定します。エンジンはメモリの使用を避け、この設定はメモリ管理のヒントを提供します。デフォルトは 6400 万です。 |

## クライアント側のビジュアライゼーション制限

`RevealSdkSettings.maxCellsRestriction` は、1 つのビジュアライゼーションでデータ ソースに要求できるセル数 (行 * 列) の上限を制御します。デフォルトは 100,000 です。`RevealView` を作成する前に設定してください。

```ts
import { RevealSdkSettings } from "reveal-sdk";

RevealSdkSettings.maxCellsRestriction = 200000;
```

この値を増やすと、ビジュアライゼーションでより多くのデータを表示できますが、メモリ使用量が増加し、パフォーマンスが低下する可能性があります。
