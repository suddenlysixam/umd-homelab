# Projects

{% for p in site.pages %}
{% if p.url contains page.dir %}
{% assign item_crumbs = p.url | remove_first: page.dir | split: '/' %}
{% if item_crumbs.size == 1 %}
<a href="{{ p.url | relative_url }}" target="_blank">{{ p.title }}</a>
{% endif %}
{% endif %}
{% endfor %}
