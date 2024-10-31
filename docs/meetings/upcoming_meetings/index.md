---
sort: 1
---

# Upcoming Meetings

{% for p in site.pages %}
{% if p.url contains page.dir and p.url contains 'html' %}
<a href="{{ p.url }}" target="_blank">{{ p.title }}</a>
{% endif %}
{% endfor %}
