---
layout: post
title: Getting started with ##Platform_Name## File manager control | Syncfusion
description:  Checkout and learn about Getting started with ##Platform_Name## File manager control of Syncfusion Essential JS 2 and more details.
platform: ej2-javascript
control: Getting started 
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Getting started in ##Platform_Name## File manager control

This section briefly explains how to create File Manager component and configure its available functionalities in TypeScript, using Essential JS 2 quickstart seed repository.

## Dependencies

The following are the dependencies required to use the File Manager component in your application:

```javascript
|-- @syncfusion/ej2-filemanager
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-layouts
    |-- @syncfusion/ej2-popups
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-lists
    |-- @syncfusion/ej2-buttons
    |-- @syncfusion/ej2-splitbuttons
    |-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-grids
```

## Set up your development environment

To get started with the File Manager component, you have to clone the Essential JS 2 [`quickstart`](https://github.com/syncfusion/ej2-quickstart) project and install the npm packages by using the following commands.

```
git clone https://github.com/syncfusion/ej2-quickstart.git quickstart
cd quickstart
npm install
```

>The [project](https://github.com/syncfusion/ej2-quickstart) is preconfigured with common settings (`src/styles/styles.css`, `system.config.js` ) to start all the Essential JS 2 components.

## Configuring system JS

Refer the [File Manager component dependencies](#dependencies) in the `system.config.js` configuration file.

```javascript
System.config({
    paths: {
        'npm:': './node_modules/',
        'syncfusion:': 'npm:@syncfusion/'
    },
    map: {
        app: 'app',

        //Syncfusion required source packages mapping for File Manager component

        "@syncfusion/ej2-base": "syncfusion:ej2-base/dist/ej2-base.umd.min.js",
        "@syncfusion/ej2-data": "syncfusion:ej2-data/dist/ej2-data.umd.min.js",
        "@syncfusion/ej2-inputs": "syncfusion:ej2-inputs/dist/ej2-inputs.umd.min.js",
        "@syncfusion/ej2-buttons": "syncfusion:ej2-buttons/dist/ej2-buttons.umd.min.js",
        "@syncfusion/ej2-splitbuttons": "syncfusion:ej2-splitbuttons/dist/ej2-splitbuttons.umd.min.js",
        "@syncfusion/ej2-lists": "syncfusion:ej2-lists/dist/ej2-lists.umd.min.js",
        "@syncfusion/ej2-navigations": "syncfusion:ej2-navigations/dist/ej2-navigations.umd.min.js",
        "@syncfusion/ej2-popups": "syncfusion:ej2-popups/dist/ej2-popups.umd.min.js",
        "@syncfusion/ej2-calendars": "syncfusion:ej2-calendars/dist/ej2-calendars.umd.min.js",
        "@syncfusion/ej2-grids": "syncfusion:ej2-grids/dist/ej2-grids.umd.min.js",
        "@syncfusion/ej2-filemanager": "syncfusion:ej2-filemanager/dist/ej2-filemanager.umd.min.js",
        "@syncfusion/ej2-dropdowns": "syncfusion:ej2-dropdowns/dist/ej2-dropdowns.umd.min.js",
        "@syncfusion/ej2-excel-export": "syncfusion:ej2-excel-export/dist/ej2-excel-export.umd.min.js",
        "@syncfusion/ej2-pdf-export": "syncfusion:ej2-pdf-export/dist/ej2-pdf-export.umd.min.js",
        "@syncfusion/ej2-compression": "syncfusion:ej2-compression/dist/ej2-compression.umd.min.js",
        "@syncfusion/ej2-file-utils": "syncfusion:ej2-file-utils/dist/ej2-file-utils.umd.min.js",
        "@syncfusion/ej2-layouts": "syncfusion:ej2-layouts/dist/ej2-layouts.umd.min.js"
    },
    packages: {
        'app': { main: 'app', defaultExtension: 'js' }
    }
});

System.import('app');

```

## Adding Style sheet to the Application

Import the File Manager and its dependent component styles as given below in `style.css`.

```
/* refer the styles from package folder */
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-icons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-filemanager/styles/material.css';
```

>Note: If you want to refer the combined component styles, please make use of our [CRG](https://crg.syncfusion.com/) (Custom Resource Generator) in your application.

## Initialize the File Manager

Now, you can start initializing the Essential JS 2 File Manager component in your application. To get started, add a HTML `<div>` element with id attribute value `filemanager` to your `index.html`.

```
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 File Manager component</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2" />
    <meta name="author" content="Syncfusion" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />

    <!--style reference from app-->
    <link href="/styles/styles.css" rel="stylesheet" />

    <!--system js reference and configuration-->
    <script src="node_modules/systemjs/dist/system.src.js" type="text/javascript"></script>
    <script src="system.config.js" type="text/javascript"></script>
</head>

<body>
    <!--element which is going to render the File Manager-->
    <div id="filemanager"></div>
</body>

</html>
```

Now, import the File Manager component to your `app.ts` and append to `#filemanager` as follows.

```ts
import { FileManager } from '@syncfusion/ej2-filemanager';

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations'
    }
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');
```

>**Note:** The [ajaxSettings](../api/file-manager/#ajaxsettings) must be defined while initializing the file manager. File manager utilizes the URL's mentioned in ajaxSettings to send [file operation](./file-operations) request to the server.
>The File Manager service link is given in `hostUrl`.

## Run the application

Now use the `npm run start` command to run the application in the browser.

```
npm run start
```

The following example shows the basic File Manager component.

{% tabs %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/getting-started-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
          
{% previewsample "page.domainurl/code-snippet/file-manager/getting-started-cs1" %}

## File Download support

To perform the download operation, initialize the `downloadUrl` property in a [ajaxSettings](../api/file-manager/#ajaxsettings) of File Manager component.

```ts
import { FileManager } from '@syncfusion/ej2-filemanager';

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    }
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');
```

## File Upload support

To perform the upload operation, initialize the `uploadUrl` property in a [ajaxSettings](../api/file-manager/#ajaxsettings) of File Manager Component.

```ts
import { FileManager } from '@syncfusion/ej2-filemanager';

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        uploadUrl: hostUrl + 'api/FileManager/Upload'
    }
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');
```

## Image Preview support

To perform the image preview support in the File Manager component, need to initialize the `getImageUrl` property in a [ajaxSettings](../api/file-manager/#ajaxsettings) of File Manager component.

{% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/getting-started-cs2/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/getting-started-cs2/index.html %}
{% endhighlight %}
{% endtabs %}
          
{% previewsample "page.domainurl/code-snippet/file-manager/getting-started-cs2" %}

## Injecting feature modules

Basically, the file manager component contains a context menu for performing file operations, large-icons view for displaying the files and folders, and a breadcrumb for navigation. However, these basic functionalities can be extended by using the additional feature modules like toolbar, navigation pane, and details view to simplify the navigation and file operations within the file system. The above modules can be injected using the `FileManager.Inject()` method.

```ts
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    }
});
// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');
```

The following example shows you the File Manager with all feature modules.

{% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/overview-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/overview-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
          
{% previewsample "page.domainurl/code-snippet/file-manager/overview-cs1" %}

>**Note:** The appearance of the File Manager can be customized by using [cssClass](../api/file-manager/#cssclass) property. This adds a css class to the root of the File Manager which can be used to add new styles or override existing styles to the File Manager.

## Switching initial view of the File Manager

The initial view of the File Manager can be changed to details or largeicons view with the help of [view](../api/file-manager/#view) property. By default, the File Manager will be rendered in large icons view.
When the File Manager is initially rendered, [created](../api/file-manager/#created) will be triggered. This event can be utilized for performing operations once the File Manager has been successfully created.

{% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/view-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/view-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
          
{% previewsample "page.domainurl/code-snippet/file-manager/view-cs1" %}

## Maintaining component state on page reload

The File Manager supports maintaining the component state on page reload. This can be achieved by enabling [enablePersistence](../api/file-manager/#enablepersistence) property which maintains the following,
* Previous view of the File Manager - [View](../api/file-manager/#view)
* Previous path of the File Manager - [Path](../api/file-manager/#path)
* Previous selected items of the File Manager - [SelectedItems](../api/file-manager/#selecteditems)

For every operation in File Manager, ajax request will be sent to the server which then processes the request and sends back the response. When the ajax request is success, [success](../api/file-manager/#success) event will be triggered and [failure](../api/file-manager/#failure) event will be triggered if the request gets failed.

{% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/persistence-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/persistence-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
          
{% previewsample "page.domainurl/code-snippet/file-manager/persistence-cs1" %}

>**Note:** The files of the current folder opened in the File manager can be refreshed programatically by calling [refreshFiles](../api/file-manager/#refreshfiles) method.

## Rendering component in right-to-left direction

It is possible to render the File Manager in right-to-left direction by setting the [enableRtl](../api/file-manager/#enablertl) API to true.

{% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/rtl-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/rtl-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
          
{% previewsample "page.domainurl/code-snippet/file-manager/rtl-cs1" %}

## Specifying the current path of the File Manager

The current path of the File Manager can be specified initially or dynamically using the [path](../api/file-manager/#path) property.

The following code snippet demonstrates specifying the current path in File Manager on rendering.

```ts
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    // Specify the required current path
    path: '/Food'
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');
```