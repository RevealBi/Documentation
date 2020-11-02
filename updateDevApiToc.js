var HTMLParser = require('node-html-parser');
const fs = require('fs');
const htmlPath = `_site/en/developer/toc.html`;

let htmlFile = fs.readFileSync(htmlPath, 'utf8');

const root = HTMLParser.parse(htmlFile);
let allLinks = root.querySelectorAll("a");
let webApiNode=null;

for (var i = 0; i < allLinks.length; i++) {
    let a = allLinks[i];
    if(a.rawAttributes["href"] === "desktop-sdk/api/Reveal.Sdk.html")
    {
        var targetParent = a.parentNode.parentNode.parentNode;
        if(targetParent.querySelector("a").childNodes[0].rawText === 'Server API Reference')
        {
            webApiNode = targetParent;
            break;
        }
    }
}

var test = targetParent.outerHTML.replace(new RegExp('desktop-sdk/api/', 'gi'),"web-sdk/api/server/");
var parentParent = targetParent.parentNode;

parentParent.exchangeChild(targetParent, HTMLParser.parse(test));

fs.writeFileSync(htmlPath, root.outerHTML);