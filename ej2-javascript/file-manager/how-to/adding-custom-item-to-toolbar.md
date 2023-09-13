---
layout: post
title: Adding custom item to toolbar in ##Platform_Name## File manager control | Syncfusion
description: Learn here all about Adding custom item to toolbar in Syncfusion ##Platform_Name## File manager control of Syncfusion Essential JS 2 and more.
platform: ej2-javascript
control: Adding custom item to toolbar 
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Adding custom item to toolbar in ##Platform_Name## File manager control

You can change the items in the toolbar using the [toolbarItems](../../api/file-manager/#toolbarItems) API. To show both the default and customized items, you need to assign a name to them. You can also modify the default items by changing properties like **tooltipText, iconCss, Text, suffixIcon** and more.

For instance, here's an example of how to add a custom checkbox to the toolbar using the **template** property.

{% if page.publishingplatform == "typescript" %}

 {% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/toolbar-cs2/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/toolbar-cs2/index.html %}
{% endhighlight %}
{% endtabs %}
        
{% previewsample "page.domainurl/code-snippet/file-manager/toolbar-cs2" %}

{% elsif page.publishingplatform == "javascript" %}

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/file-manager/toolbar-cs2/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/toolbar-cs2/index.html %}
{% endhighlight %}
{% endtabs %}

{% previewsample "page.domainurl/code-snippet/file-manager/toolbar-cs2" %}
{% endif %}