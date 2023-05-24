---
layout: post
title: Enable disable toolbar item in ##Platform_Name## File manager control | Syncfusion
description: Learn here all about Enable disable toolbar item in Syncfusion ##Platform_Name## File manager control of Syncfusion Essential JS 2 and more.
platform: ej2-javascript
control: Enable disable toolbar item 
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Enable disable toolbar item in ##Platform_Name## File manager control

The toolbar items can be enabled/disabled by specifying the items in [enableToolbarItems](../../api/file-manager/#enabletoolbaritems) or [disableToolbarItems](../../api/file-manager/#disabletoolbaritems) methods respectively.

The following example shows enabling and disabling toolbar items on button click.

The new toolbar button is added using [toolbarSettings](../../api/file-manager/#toolbarSettings). The [toolbarClick](../../api/file-manager/#toolbarClick) event is used to add an event handler to the new toolbar button.

{% if page.publishingplatform == "typescript" %}

 {% tabs %}
{% highlight ts tabtitle="index.ts" %}
{% include code-snippet/file-manager/toolbar-items-cs2/index.ts %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/toolbar-items-cs2/index.html %}
{% endhighlight %}
{% endtabs %}
        
{% previewsample "page.domainurl/code-snippet/file-manager/toolbar-items-cs2" %}

{% elsif page.publishingplatform == "javascript" %}

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/file-manager/toolbar-items-cs2/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/file-manager/toolbar-items-cs2/index.html %}
{% endhighlight %}
{% endtabs %}

{% previewsample "page.domainurl/code-snippet/file-manager/toolbar-items-cs2" %}
{% endif %}