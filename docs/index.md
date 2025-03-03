# UMD Homelab Club

{% for p in site.pages %}
{% if p.url contains "meetings" and p.url contains 'html' %}
{% unless p.url contains "past" %}
### **The UMD Homelab Club's next meeting will be on: [{{ p.title }}]({{ p.url | relative_url }})**
{% break %}
{% endunless %}
{% endif %}
{% endfor %}

[![Follow suddenlysixam on GitHub](https://img.shields.io/github/followers/suddenlysixam?label=suddenlysixam&style=social)](https://github.com/suddenlysixam "Follow suddenlysixam on GitHub")
