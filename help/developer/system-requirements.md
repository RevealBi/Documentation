### System Requirements

#### Desktop SDK Requirements

The Reveal SDK requires .NET version 4.6.1+ and Visual Studio 2015 or up.

#### Web SDK Requirements

The Reveal Server SDK requires .NET Core 2.2+ server-side projects
targeting .NET framework 4.6.1.

Currently the Reveal Server SDK supports a win7-x64 runtime environment.
To debug your web project you need to add a win7-x64 compatible
*RuntimeIdentifier* platform:

``` xml
<PropertyGroup>

   <TargetFramework>net461</TargetFramework>

   <RuntimeIdentifier>win7-x64</RuntimeIdentifier>

</PropertyGroup>
```
