# UMD Homelab Club

{% for p in site.pages %}
{% if p.url contains "upcoming" and p.url contains 'html' %}
### **The UMD Homelab Club's next meeting will be on: [{{ p.title }}]({{ p.url | relative_url }})**
{% break %}
{% endif %}
{% endfor %}

[![Follow suddenlysixam on GitHub](https://img.shields.io/github/followers/suddenlysixam?label=suddenlysixam&style=social)](https://github.com/suddenlysixam "Follow suddenlysixam on GitHub")
