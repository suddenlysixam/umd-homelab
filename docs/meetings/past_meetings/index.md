---
sort: 2
---

# Past Meetings

{% for p in site.pages %}
{% if p.url contains page.dir and p.url contains 'html' %}
<a href="{{ p.url }}" target="_blank">{{ p.title }}</a>
{% endif %}
{% endfor %}