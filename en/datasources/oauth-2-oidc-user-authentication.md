---
title: OAuth 2 / OIDC User Authentication with REST, OData, and Web Resources
_description: Ways to set up an OAuth 2 / OIDC account and grant access to your resources when using OData Service, Rest API or Web.
---

# OAuth 2 / OIDC User Authentication with REST, OData, and Web Resources

When using [OData Service](supported-data-sources/odata-feed.md), [Rest API](supported-data-sources/rest-api.md) or [Web resources](supported-data-sources/web-resource.md), some of your resources might be protected. In
this case, you need to grant Reveal access to these resources by setting
up an OAuth 2 / OIDC account.

## What is OAuth 2?

OAuth 2.0 is an authorization framework that supersedes the original
OAuth protocol. It is commonly used to grant users limited access to
specific resources, without exposing their credentials. Like OAuth 1.0,
this protocol enables access from one location (third-party application
or website) called OAuth client to another location with protected data.

For further information, please refer to
[OAuth 2.0](https://oauth.net/2/)

## What is OIDC?

OIDC is a simple identity layer on top of the OAuth 2.0 protocol. OIDC
enables websites or applications to grant users access to their content
by authenticating the user through their account in another service or
application (е.g. Google, Office 365) saving them the trouble of
maintaining a bunch of different accounts.

For further information, please refer to [OpenID Connect](https://openid.net/connect/).

## Using protected resources with an OAuth 2 / OIDC Account

To use data sources with an OAuth 2 / OIDC аccount you will need to
perform these 4 steps:

1.  **Register the OAuth Client** (Reveal) on your resource server (this
    is the server hosting the resource, protected with OAuth, that you
    want to use - e.g. Microsoft, Google, etc.)

2.  Choose one of the three **data sources** in Reveal, which are
    enabled to work with OAuth 2 / OIDC accounts - [OData Service](supported-data-sources/odata-feed.md), [Rest API](supported-data-sources/rest-api.md) or [Web Resource](supported-data-sources/web-resource.md).

3.  Use credentials provided for the Client by the resource server to
    **set up your OAuth 2 / OIDC account in Reveal**

4.  **Give Reveal permissions** to access and use your data.

## Registering an OAuth Client

Navigate to the **resource server** (e.g. Microsoft, Google, etc.) and
register Reveal as an OAuth Client/Application by filling in the
required information. Usually the name of the application and a redirect
URL are required.

>[!NOTE]***Redirect URL***.
>Pay attention that the redirect URL is provided in the Reveal's *OAuth 2 / OIDC Account Details* screen.

When you complete the registration, the resource server will generate
the credentials necessary for configuring the *OAuth 2 account* in
Reveal.

## Choosing your data source

1.  Navigate to Reveal and **choose a data source** - *OData Feed*,
    *Rest API* or *Web Resource*.

2.  Provide the *URL* where the data is located.

3.  Click/tap on *Credentials*.

Once you've clicked/tapped on **+ Credentials** you can select *OAuth 2 / OIDC Credentials* from the **Credential Type** dropdown menu:

 <img src="images/credential-type-options.png" alt="Accessing OAuth2/OIDC Credentials menu" class="responsive-img" width="55%"/>

## Setting up your OAuth 2 / OIDC account in Reveal

In the *OAuth 2 / OIDC Account Details* screen you will need to fill in
the credentials that are already generated for Reveal by the resource
server.

<img src="images/required-credentials-oauth2.png" alt="Required Credentials OAuth Account" class="responsive-img" width="55%"/>

The following fields are mandatory:

3.  **Authenticate Url**: The authenticate URL is usually in a format
    such as: <https://authorization-server.com/oauth2/authorize> (e.g.
    <https://login.microsoftonline.com/common/oauth2/authorize>).

4.  **Token Url**: The format of the token url is similar to the one of
    the authenticate url (e.g.
    <https://login.microsoftonline.com/common/oauth2/token>).

5.  **Client ID**: The Client ID is the identifier for your app
    (Reveal). Its format is a random combination of symbols. You will
    receive a Client ID when you first register Reveal as an OAuth
    Client.

Other fields are not marked as mandatory in Reveal but depending on your
OAuth service you might also need to provide the following:

*  **Client Secret**: The client secret is used as additional
    protection. Its format is a random combination of symbols.

* **Logout Url**: 

*  **Scope**: Scope values are used to request additional levels of
    access. The values will depend on the particular service.

*  **Resource**: Here you need to input the url to the service, which
    hosts the protected data (e.g.
    <https://infragisticsinc297.sharepoint.com>)

* **Additional Parameters**: 

* **Alias** of the data source: Your data source name will be displayed in the list of accounts. You can always change it.


