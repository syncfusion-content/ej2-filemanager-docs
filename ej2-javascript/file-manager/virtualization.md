---
layout: post
title: Virtualization in ##Platform_Name## File manager control | Syncfusion
description: Learn here all about Virtualization in Syncfusion ##Platform_Name## File manager control of Syncfusion Essential JS 2 and more.
platform: ej2-javascript
control: Virtualization 
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Virtualization in ##Platform_Name## File manager control

File Manager's UI virtualization allows you for the dynamic loading of a large number of directories and files in both the detailsView and largeIconsView without degrading its performance.

## Module Injection

To use UI virtualization, you must import the `virtualization` module from the `ej2-filemanager` package and inject it using the `FileManager.Inject()` function.

```ts

import { FileManager, Virtualization } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Virtualization);

```

## Enable Virtualization

The virtualization of the File Manager component is based on the height and width of the viewport. The items will be loaded in both [largeIconsView](https://ej2.syncfusion.com/documentation/api/file-manager/#view) and [detailsView](https://ej2.syncfusion.com/javascript/documentation/api/file-manager/detailsViewSettings/) based on the viewport size.

In order to enable `virtualization`, you must set the [enableVirtualization](https://ej2.syncfusion.com/documentation/api/file-manager/#enablevirtualization) property to true.

In the instance below, a sizable collection of files can be found in the folders **Documents** and **Text Documents**.

{% if page.publishingplatform == "typescript" %}

 {% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/virtualization-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/virtualization-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
        
{% previewsample "page.domainurl/code-snippet/file-manager/virtualization-cs1" %}

{% elsif page.publishingplatform == "javascript" %}

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/file-manager/virtualization-cs1/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/virtualization-cs1/index.html %}
{% endhighlight %}
{% endtabs %}

{% previewsample "page.domainurl/code-snippet/file-manager/virtualization-cs1" %}
{% endif %}

## Limitations for Virtualization

* Programmatic selection using the **selectAll** method is not supported with virtual scrolling.

* The keyboard shortcut **CTRL+A** will only select the files and directories that are currently visible within the viewport, rather than selecting all files and directories in the entire directory tree.

* Selected file items are not maintained while scrolling, considering the performance of the component.