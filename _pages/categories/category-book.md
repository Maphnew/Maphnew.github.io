---
title: "Book"
layout: archive
permalink: categories/book
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.Book %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
