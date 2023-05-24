---
layout: post
title: Drag and drop in ##Platform_Name## File manager control | Syncfusion
description: Learn here all about Drag and drop in Syncfusion ##Platform_Name## File manager control of Syncfusion Essential JS 2 and more.
platform: ej2-javascript
control: Drag and drop 
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Drag and drop in ##Platform_Name## File manager control

The file manager allows files or folders to be moved from one folder to another by using the  [allowDragAndDrop](../api/file-manager/#allowdraganddrop) property. It also supports uploading a file by dragging it from Windows Explorer to  FileManager control. You can enable or disable this support by using the [allowDragAndDrop](../api/file-manager/#allowdraganddrop) property of file manager.

The event triggered in drag and drop support are

* [fileDragStart](../api/file-manager/#filedragstart) - Triggers when the file/folder dragging is started.
* [fileDragging](../api/file-manager/#filedragging) - Triggers while dragging the file/folder.
* [fileDragStop](../api/file-manager/#filedragstop) - Triggers when the file/folder is about to be dropped at the target.
* [fileDropped](../api/file-manager/#filedropped) - Triggers when the file/folder is dropped.

{% if page.publishingplatform == "typescript" %}

 {% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/drag-and-drop-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/drag-and-drop-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
        
{% previewsample "page.domainurl/code-snippet/file-manager/drag-and-drop-cs1" %}

{% elsif page.publishingplatform == "javascript" %}

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/file-manager/drag-and-drop-cs1/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/drag-and-drop-cs1/index.html %}
{% endhighlight %}
{% endtabs %}

{% previewsample "page.domainurl/code-snippet/file-manager/drag-and-drop-cs1" %}
{% endif %}