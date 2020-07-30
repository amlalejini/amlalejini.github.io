---
layout: blog
title: Blog
permalink: /blog/
---

## <a href="#here"><i class='far fa-link' style='color:slategrey;'></i></a> here
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## <a href="#devolab"><i class='far fa-link' style='color:slategrey;'></i></a> [devolab](https://devolab.org/)
<ul class="posts">
  {% for post in site.data.devolab_posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
  <a href="https://devolab.org/author/lalejini/">[all devolab posts]</a>
</ul>

<!-- ## <a href="#mentees_collaborators">🔗</a> mentees & collaborators
<ul class="posts">
  {% for post in site.data.mentees_collaborators_posts %}
    <li>
      <span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a> by <a href="{{ post.who_url }}">{{ post.who }}</a>
      {% if post.where %}
        {% if post.where_url %}
          @ <a href="{{ post.where_url }}">{{ post.where }}</a>
        {% else %}
          @ {{ post.where }}
        {% endif %}
      {% endif %}
    </li>
  {% endfor %}
</ul> -->