# リリース ノート

## 1.3.1 (Jan-2023)

### BREAKING CHANGES
- The `Reveal.Sdk.Wpf.Trial` nuget package has been **deprecated** and is **no longer updated**. 
- The new `Reveal.Sdk.Wpf` nuget package is now available on [nuget.org](https://www.nuget.org/packages/Reveal.Sdk.Wpf), and will work as both a Trial and Licensed version. To unlock the Trial, set the license key in the SDK.
- The license key is now set in the `RevealSdkSettings` of the Reveal SDK (previously, this was done in the installer). Here's how to set it:

```cs
RevealSdkSettings.License = "XYZ123";
```

### Bug Fixes
- Fixed issue: when creating a REST datasource using parameters. If the back button was pressed, values were already populated but they were not really applied.
- Fixed issue: Dashboard filter list of available values was always refreshed when opening a dashboard, no matter what expiration setting was set.
- Fixed issue: Dashboard filter expiration value was not saved.
- Fixed issue: Dashboard horizontal filter lost when maximizing and then restoring.
- Fixed issue: the kebab menu in the dashboard view was not reachable using the keyboard (tab).
- Fixed issue: Dashboard linking stops working after selecting a dashboard filter in the linked visualization.
- Fixed issue: Wrong value shown for Scatter Map mouseover tooltip.
- Fixed issue: Cancelling the MenuOpening event didn't really cancel.

## 1.3.0 (11 月 2022 年)

### 新機能
- 新しいデータ ソース: Google アナリティクス 4
- インタラクティブなダッシュボードのフィルタリング。チャートまたはピボット テーブルのデータ ポイントをクリックして、同じデータ ソースを使用してすべての表示形式をフィルター処理します。`revealView.interactiveFilteringEnabled = true` で有効にします。
- 計算フィールドに新しい 'DateDiff' 関数を追加しました。
- `RevealSdkSettings` にある `DefaultExportPath` プロパティを使用して、**エクスポート パスをカスタマイズできるようになりました**。

### バグ修正
- Postgres & Redshift でブール値をフィルタリングする際の「演算子が存在しません」というエラーを修正しました。
- v1.2.3 で誤って追加され、CORS で問題を引き起こしていた新しい http ヘッダー 'XRID' を削除しました。
