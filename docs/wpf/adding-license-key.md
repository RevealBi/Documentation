# Adding a License Key

When you install the Reveal SDK, a license key must be provided or the SDK will not function. There are two types of license keys
- Trial - obtained when requesting a trial from the [Reveal SDK Website](https://www.revealbi.io/download-sdk)
- Licensed - obtained when the Reveal SDK is purchased

## Key File
By default, the Reveal SDK will look for a valid license in a file called `license.key` within a folder named `.revealbi-sdk` in the user's "Home" directory.

When you receive your license key, create a text file named `license.key` within a directory named `.reveabi-sdk` located in your "Home" directory. Populate this file with your license key as its content.

The license file location should be located at `C:/Users/your-user-name/.revealbi-sdk/license.key`.

## Set In Code

The license key can also be provide in the application code.

```cs
RevealSdkSettings.License = "LICENSE_KEY";
```