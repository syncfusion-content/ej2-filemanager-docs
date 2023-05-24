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

The toolbar items can be customized using the [toolbarSettings](../../api/file-manager/#toolbarSettings) API and [toolbarClick](../../api/file-manager/#toolbarClick) events.

The following example shows adding a custom item in the toolbar.

The new toolbar button is added using [toolbarSettings](../../api/file-manager/#toolbarSettings). The [toolbarClick](../../api/file-manager/#toolbarClick) event is used to add an event handler to the new toolbar button.

{% if page.publishingplatform == "typescript" %}

 {% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/toolbar-cs3/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/toolbar-cs3/index.html %}
{% endhighlight %}
{% endtabs %}
        
{% previewsample "page.domainurl/code-snippet/file-manager/toolbar-cs3" %}

{% elsif page.publishingplatform == "javascript" %}

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/file-manager/toolbar-cs3/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/toolbar-cs3/index.html %}
{% endhighlight %}
{% endtabs %}

{% previewsample "page.domainurl/code-snippet/file-manager/toolbar-cs3" %}
{% endif %}