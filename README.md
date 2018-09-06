# Implementation guide to my personal website

**Website:** [https://lalejini.com](https://lalejini.com)

This document is as much for future me as it is for anyone else, but anyone else
is welcome to comment, file issues, yell at me for doing something boneheaded, 
make suggestions, correct mistakes, etc. 
Here, I document how my static personal website is put together and the thought
process behind my decisions. I've also tried to make sure the source files themselves
are well commented. 

Guide navigation:

<!-- TOC -->

- [Dependencies](#dependencies)
- [Running this site locally](#running-this-site-locally)
- [Source companion guide](#source-companion-guide)
  - [The technology](#the-technology)
  - [The components](#the-components)
    - [data](#data)
    - [pages](#pages)
    - [includes](#includes)
    - [layouts](#layouts)
    - [miscellaneous](#miscellaneous)
- [License](#license)

<!-- /TOC -->

## Dependencies

This website is hosted by [GitHub pages](https://pages.github.com/) and is otherwise
powered by the following dependencies:

- [Jekyll](https://jekyllrb.com/) is the static site generater used to power GitHub
  pages
  - This site can be generated and served locally [just as with any Jekyll site](https://jekyllrb.com/docs/).
- [Bootstrap](https://getbootstrap.com/) is an open source toolkit for developing 
  with HTML, CSS, and JS, providing sleek and (fairly) easy to use front-end components.
- [Font Awesome](https://fontawesome.com/) provides an awesome collection of really
  nice icons. As one of Font Awesome's kickstarter backers, I have a Pro license
  for this, giving me access to a more icons than the free version. However,
  [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome) is open source
  and still has a huge number of awesome icons.

## Running this site locally

Step-by-step guide (this is as much for future me as it is for anyone else):

1. To run this site locally, you'll need Jekyll. If you don't already have Jekyll
  installed locally, follow the first two steps of the Jekyll Quickstart guide.
2. Clone this repository.
3. In a terminal, cd into your local copy of this repository.
4. In this repository's directory, execute `bundle exec jekyll serve`
5. In a browser, navigate to [http://localhost:4000](http://localhost:4000)

## Source companion guide

### The technology

As stated previously, this site is powered by Jekyll, so a delve into the depths
of this repository might encounter content/source in the following forms (often all mishmashed
together): 
[YAML](https://en.wikipedia.org/wiki/YAML), [JSON](https://en.wikipedia.org/wiki/JSON),
[Markdown](https://en.wikipedia.org/wiki/Markdown), [HTML](https://en.wikipedia.org/wiki/HTML), [Liquid](https://shopify.github.io/liquid/basics/introduction/),
and [sass](https://sass-lang.com/).

YAML is used both to configure Jekyll for this site ([_config.yml](./_config.yml))
and used to define Jekyll [variables](https://jekyllrb.com/docs/variables/) in either
data files ([_data/](./_data/)) or pages' [front matter](https://jekyllrb.com/docs/front-matter/).

HTML is used to specify each page's *structure*. I've tried to minimize the amount of
*content* specified directly in HTML. The website's structure is specified using custom
Jekyll layouts ([_layouts/](./_layouts/)) combined with useful and reusable HTML snippets ([_includes/](./_includes/))
that can be included in a layout (*e.g.*, the navigation bar, footer, or page head information).

Within an HTML file, you are likely to encounter some strange syntax that looks
like `{{ page.title }}` or `{% if page.overview %}`. This syntax is [Liquid](https://shopify.github.io/liquid/). Liquid is a template language that lets us
'script' HTML content generation when Jekyll generates our static site. This is
a super neat and powerful tool that lets us cleanly separate page content from page
structure. Definitely checkout [Liquid's documentation](https://shopify.github.io/liquid/basics/introduction/) 
for more details on its syntax and how it does what it does.

I specify content using Markdown (often in .md files but sometimes embedded in
data files - .yml, .json) and fields/attributes in data files (.json, .yml).

And, finally Sass (which gets processed into CSS) is used to specify styling.

### The components

Each of the components described below has an associated directory in
this repository. Here, I attempt a high level overview of each component's role
in generating this site.

As a general practice, I've tried to minimize the amount of site content present
in .html files. Instead, content is housed in data files (in the [_data/](./_data/)
directory) and in page files (in the [_pages/](./_pages/)). The structure of this
site is defined by Jekyll layouts. 

#### data

[_data/](./_data/) contains data files. In addition to built-in variables provided
by Jekyll, data files can be used to specify custom data accessible through the
Liquid templating system. Read more about Jekyll data files [here](https://jekyllrb.com/docs/datafiles/).

In this website, I generally use data files to specify content that may have multiple
entries (e.g., citation information for publications) or to specify variables that are
used across multiple pages (e.g., icons) that I may want to change in the future.
For example, each of the different parts of my CV (e.g., education, research experience,
etc) have their own data file, which is setup to allow me to easily come back and add
more entries. 

#### pages

[_pages/](./_pages/) pages are the most basic building block for content. Read
more about them [here](https://jekyllrb.com/docs/pages/). Pages define, err well,
pages. Each page is defined either by a HTML file (.html) or by a markdown file (.md).
One of the wonderful things about Jekyll is that, if you don't want to, you never
need to touch any HTML. You can use off-the-shelf/default layouts (often referred
to as themes - e.g., [http://jekyllthemes.org/](http://jekyllthemes.org/)) and use only markdown to make your Jekyll site; when Jekyll generates your site, it'll convert all of those
markdown files into HTML. In fact, this is what GitHub pages does by default when
you flip the pages switch in a repository's settings (see GitHub's default themes - i.e.,
Jekyll layouts [here](https://pages.github.com/themes/)). 

At the top of each page is [front matter](https://jekyllrb.com/docs/front-matter/).
where you can specify predefined and page-specific [variables](https://jekyllrb.com/docs/variables/) 
accessible via the Liquid templating system. 
In the front matter, you can specify a pages layout (more on that
later), [permalink](https://jekyllrb.com/docs/permalinks/), *etc*. Below the front
matter is the page's content, which is accessible via the `{{ content }}` Liquid
tag.

On this site, I'm exclusively using markdown files to define site pages. Minimally, 
each page specifies a page title and its layout. None of my page files actually
include anything below the front matter. I've exclusively specified content in
page-specific variables and in data files (*e.g.*, the overview text on my publications
page).

#### includes

[_includes/](./_includes/) contains snippets of reusable HTML components. 
Read more about includes [here](https://jekyllrb.com/docs/includes/).
For example, my navigation bar, which is used on all pages, is defined in [./_includes/nav.html](./_includes/nav.html). 

Using Liquid include tags, I can 'paste' the contents of any include file where
I need it. Includes, in combination with layouts, minimizes the need to copy and
paste HTML code anywhere in my website's source.

#### layouts

[_layouts/](./_layouts/) contains my Jekyll layouts. Read more about layouts [here](https://jekyllrb.com/docs/layouts/) because they're awesome! Layouts are at the
front lines of structuring pages and can be applied hierarchically. For example,
I have a base layout, [default.html](./_layouts/default.html) that specifies the
overall structure of all of my site's pages: 
  ```html
  <!DOCTYPE html>
  <html lang="en">
    {% include head.html %}
    <body>
      {% include header.html %}
      {{ content }}
      {% include footer.html %}
      {% include scripts.html %}
    </body>
  </html>
  ```
  
With a default layout to specify the highest level of HTML structure for my pages,
I've made a layout for each page where each page-specific layout defines the structure
for that page. Because layouts can be applied hierarchically, each page-specific
layout specifies that it uses the 'default' layout, which means the page-specific
layout's (.html file) gets dumped into the default layout where you see `{{ content }}`. 
For example, my publications page (defined by [./_pages/publications.md](./_pages/publications.md))
uses the publications layout (defined by [./_layouts/publications.html](./_layouts/publications.html)),
which uses the default layout (defined by [./_layouts/default.html](./_layouts/default.html)).
And, that's just two layers of layouts! Just to round out the publications layout
example: inside the publications layout, I loop
over my [publications data](./_data/publications.yml) (yes, Liquid lets you do that!),
to generate listing of publications.

#### miscellaneous

- [_sass/](./_sass/)
  - I use [sass](https://sass-lang.com/) to specify all of the styling for my site.
    The _sass/ directory is where Jekyll knows to look for raw sass files. Because
    I'm loading Font Awesome's stylesheets via CDN, the only sass in this directory
    is Bootstrap, which is just the scss directory contained in the archive you get
    when you download bootstrap.
    Almost *all* of my website's styling is just default Bootstrap styling; I like
    the look and feel of Bootstrap, the documentation and community support is solid,
    and I find it to be pretty simple to use.
    My main sass file is in assets, but more on that later.
- [_site/](./_site/)
  - After generating your site, this is where Jekyll dumps everything. This is a
    'behind-the-scenes' directory, and you will only see it locally (I have mine
    ignored in my .gitignore). GitHub pages will run Jekyll, which generates this
    _site/ directory, which is what gets served as your static site.
- [assets/](./assets/)
  - This is where I dump my main.scss file, which specifies minimal custom styling
    and includes all of the Bootstrap styling. This gets processed into a main.css,
    which is what I link to in my [head information](./_includes/head.html).
    Notice that my main.scss has empty front matter at the top of the file. The 
    presence of front matter in a file (even if its empty) tells Jekyll to process
    the file. How Jekyll processes the file will depend on the file type, but front
    matter tells Jekyll that the file *should* be processed in some way.
- [imgs/](./imgs/)
  - Contains images. Not much to see here. My only comment is that I've tried
    to output images to be used on my website as .svg, which ensures that they
    scale nicely when the page scales, and I don't need to worry about image
    resolutions. To download .svg versions of D3 visualizations that I've written,
    I used the [nytime's svg crowbar](https://github.com/NYTimes/svg-crowbar).
- [pubs/](./pubs/)
  - Contains .pdf versions of my publications available to download.

## License
This site's source code is MIT Licensed, but the website content is not. 
The following directories and their contents are copyright Alexander Lalejini:

  - _data/
  - pubs/
  - imgs/

You may not reuse anything therein without my permission.