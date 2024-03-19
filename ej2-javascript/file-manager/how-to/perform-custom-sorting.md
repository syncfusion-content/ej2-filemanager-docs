---
layout: post
title: Perform custom sorting in ##Platform_Name## FileManager component | Syncfusion
description: Learn here all about How to perform custom sorting in Syncfusion ##Platform_Name## FileManager component of Syncfusion Essential JS 2 and more.
platform: ej2-javascript
control: Perform custom sorting 
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Perform custom sorting in ##Platform_Name## FileManager component

The FileManager component provides a way to customize the default sort action for the LargeIconsView by defining the [sortComparer](../../api/file-manager/#sortcomparer) property and for sorting individual columns in the DetailsView by defining the [sortComparer](../../api/file-manager/column/#sortcomparer) property in the [columns](../../api/file-manager/column/) property.

>Note: To achieve natural sorting like Windows Explorer, you can import the `SortComparer` function from the `'@syncfusion/ej2-javascript-filemanager'`. If you want to perform your own custom sorting, you can define your own `SortComparer` function.

The following example demonstrates how to define custom sort comparer function to achieve natural sorting behavior for the LargeIconsView and name column in DetailsView.

{% if page.publishingplatform == "typescript" %}

 {% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/customsorting-cs1/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/customsorting-cs1/index.html %}
{% endhighlight %}
{% endtabs %}
        
{% previewsample "page.domainurl/code-snippet/file-manager/customsorting-cs1" %}

{% elsif page.publishingplatform == "javascript" %}

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/file-manager/customsorting-cs1/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/customsorting-cs1/index.html %}
{% endhighlight %}
{% endtabs %}

{% previewsample "page.domainurl/code-snippet/file-manager/customsorting-cs1" %}
{% endif %}