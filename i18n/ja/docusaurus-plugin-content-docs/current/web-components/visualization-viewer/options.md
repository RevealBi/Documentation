import CodePreview from '@site/src/components/CodePreview'

# オプション

`RvRevealView` Web コンポーネントは、既存の jQuery コンポーネントをラップして、その使用を簡素化します。これを容易にするために、UI のさまざまな部分を Web に適した方法で制御できる `options` の概念を導入しました。

# Reveal View (Reveal ビュー)

<CodePreview previewHeight="600" sourceOpen="true">

```html
<rv-visualization-viewer id="viewer" dashboard="Sales" visualization="Leads by Year"></rv-visualization-viewer>
```

```js
const options = {
  crosshairs: true,
  menu: {
    showMenu: true,
    copy: false,
    exportToExcel: false,
  },
};

const viewer = document.getElementById("viewer");
viewer.options = options;
```

```tsx
import { RvVisualizationViewer } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
    const options = {
        crosshairs: true,
        menu: {
            showMenu: true,
            copy: false,
            exportToExcel: false,
        },
    };

    return (
        <RvVisualizationViewer dashboard="Sales" visualization="Leads by Year" options={options} ></RvVisualizationViewer>
    );
};
```

</CodePreview>

## 表示形式ビューアー オプション

`RvVisualizationViewer` には以下のオプションを設定できます:

```ts
export interface VisualizationViewerOptions {
  showFilters?: boolean;
  categoryGroupingSeparator?: string;
  crosshairs?: boolean;
  hoverTooltips?: boolean;
  changeChartType?: boolean;
  statisticalFunctions?: boolean;
  menu?: {
    items?: MenuItem[];
    copy?: boolean;
    duplicate?: boolean;
    exportToExcel?: boolean;
    exportToImage?: boolean;
    showMenu?: boolean;
    refresh?: boolean;
  };
}
```

これらのオプションを構成することで、`RvVisualizationViewer` コンポーネントの動作と外観を特定のニーズに合わせて調整し、よりカスタマイズされたユーザーフレンドリーなエクスペリエンスを提供できます。
