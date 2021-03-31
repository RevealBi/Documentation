## Server-side Export Configuration

<< **CURRENTLY IN PROGRESS** >>

---


The Java SDK uses some native components for exporting dashboards to different formats: Image, PDF, PPT and Excel.



Export feature and also documented better what native dependencies need to be installed in the server (mainly if you’re using Linux)

We use Playwright for Java for exporting images and our own native application (called ExportTool) for exporting PDF, PPT and Excel documents.

The required downloads (some tools required by Playwright and the ExportTool binary) are automatically triggered the first time a Dashboard is opened, trying to get these tools ready for the first Export request, but for some platforms there are some dependencies that need to be installed in advance, and also your server environment might restrict external downloads and you might need to setup these tools manually.