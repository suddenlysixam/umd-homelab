---
sort: 1
---

# Getting Started

{% for p in site.pages %}
{% if p.url contains page.dir and p.url contains 'html' %}
<a href="{{ p.url | relative_url }}" target="_blank">{{ p.title }}</a>
{% endif %}
{% endfor %}
