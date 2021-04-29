
<h3>API Reference:</h3>
This part of the documentation is your gateway to the Reveal SDK APIs, to get more information please follow:

- <a href="http://rvsdk-docs-dev.infragistics.local:8080/api/Overview.html" target="_blank" rel="noopener\">**.NET Desktop SDK** </a>  
- <a href="http://rvsdk-docs-dev.infragistics.local:8081/api/Overview.html" target="_blank" rel="noopener\">**.NET Web Server-side SDK** </a>  
- <a href="http://rvsdk-docs-dev.infragistics.local/en/developer/java-sdk/api/index.html" target="_blank" rel="noopener\">**Java SDK**  </a>   
-  **JavaScript Client SDK (Work in progress).**

---

**JavaScript Client SDK has Two options:**  

**1.** Generated with <a href="http://rvsdk-docs-dev.infragistics.local:83/" target="_blank" rel="noopener\">**TypeDoc**</a>  

**PROS:**
- **Fully automated** - Displays all information for class members as it works well with JSDoc-style comments - no manual editing required. 
- **Easier to maintain** - Since it reflects the actual types the tool is able to understand the types and we won’t need to manually add annotations about types.
- **Markdown support** - Supports markdown in the comments out of the box.
- **Better look & feel** - The default TypeDoc template looks arguably better than the DocFx one we have right now.


**CONS:**
- **Does not use the Reveal DocFx template** - A different template and layout results in a different look and feel, making it very hard to achieve a similar visual experience. That being said, IgniteUI for Angular docs does use a TypeScript template we can reuse. They even created a plugin to help with localization that we might be able to get as well.

- **Typescript-like output** - TypeDoc generated output uses typescript way of defining and explaining the types, pretty close to JS way. TypeScript annotation arguably adds more value and the potential to cause confusion seems really low.

 
**2.** Generated with <a href="http://rvsdk-docs-dev.infragistics.local:8082/" target="_blank" rel="noopener\">**Node2DocFx(JSDoc)**</a> 

**PROS:**
- **Uses the Reveal template** - same look and feel, same imperfections. 
- **Easy to extend** - We have TOC navigation on the left of the screen and can add new article pages if needed.   

**CONS:**
- **Not fully automated** - Does not display all information about class members. DocFx does not work well with JSDoc-style comments - manual editing is required that takes time. 

