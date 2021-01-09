---
layout: post
title: "Automatically deploy a bookdown ebook with GitHub actions"
date: 2021-01-09
last-updated: 2021-01-09
author: Alexander Lalejini
---

In this post, I'll walk you (or future me 👋 😉) through getting a [bookdown](https://bookdown.org/)-generated ebook to automatically deploy as a static website (using [GitHub pages](https://pages.github.com/)) any time you make changes to your GitHub repository (using [GitHub actions](https://docs.github.com/en/free-pro-team@latest/actions)). This guide is intended to get you started with a (mostly) minimal example.

This guide assumes familiarity with each of the tools and services that we'll use; I'm just here to help you duct tape them all together ☺️!

See [this GitHub repository](https://github.com/amlalejini/auto-deploying-bookdown-example) for a fully demo.

Ingredients

- [bookdown](https://bookdown.org/) is an R package that can generate an ebook (or pdf, Word doc, etc.) from a collection of R markdown (and vanilla markdown) documents.
  - R markdown supports a wide range of languages in addition to R (e.g., Python, Julia, etc.)
- [GitHub](https://github.com/) - we'll use a GitHub repository to store our bookdown-enabled project.
- [GitHub Pages](https://pages.github.com/) - we'll use GitHub pages to host our bookdown-generated ebook.
- [Github actions](https://docs.github.com/en/free-pro-team@latest/actions) - we'll use GitHub actions to automatically build and deploy our ebook to GitHub pages when changes are made to the GitHub repository.
- [docker](https://www.docker.com/) - we'll compile our ebook using a docker container loaded with the requisite dependencies.


## Step 1. Setting up our bookdown ebook

Make a new GitHub repository, and inside of it, we'll  pull together a minimal-working book that we can compile locally. The files below are a modified subset of the files in [the canonical bookdown demo](https://github.com/rstudio/bookdown-demo). You'll need to install all of [bookdown's prerequisites](https://bookdown.org/yihui/bookdown/get-started.html) if you want to be able to build your book locally (which is useful for debugging).

`index.Rmd` will define the first page of our ebook. This will also be the landing page for our GitHub pages site.

```
---
title: "An automatically deploying ebook"
author: "Alexander Lalejini"
date: "`r Sys.Date()`"
output: bookdown::gitbook
documentclass: book
github-repo: amlalejini/auto-deploying-bookdown-example
description: "This is a demo for automatically deploying your bookdown ebook to GitHub pages."
---

# Introduction

Check out the GitHub repository with all the gears and levers to generate this example: <https://github.com/amlalejini/auto-deploying-bookdown-example>.
```


`_bookdown.yml` contains general configuration for our bookdown build.

```
book_filename: "demo"
language:
  ui:
    chapter_name: "Chapter "
delete_merged_file: true
rmd_files: [
  "index.Rmd"
]
```

`_output.yml` species configuration details for particular output types. [Documentation here](https://bookdown.org/yihui/bookdown/output-formats.html).

```
bookdown::gitbook:
  css: style.css
  split_by: "chapter"
  citation_package: natbib
  config:
    toc:
      before: |
        <li><a href="./">Auto-deploy Example</a></li>
      after: |
        <li><a href="https://github.com/rstudio/bookdown" target="blank">Published with ❤ and bookdown</a></li>
    edit: https://github.com/amlalejini/auto-deploying-bookdown-example/tree/main/%s
    download: ["pdf"]
bookdown::pdf_book:
  latex_engine: pdflatex
  citation_package: natbib
  keep_tex: yes
  split_by: "chapter"
```

`style.css` gives custom styling for the HTML output. The file below is pulled directly from [the canonical bookdown demo](https://github.com/amlalejini/auto-deploying-bookdown-example).

```
p.caption {
  color: #777;
  margin-top: 10px;
}
p code {
  white-space: inherit;
}
pre {
  word-break: normal;
  word-wrap: normal;
}
pre code {
  white-space: inherit;
}
```

`build_book.sh` is a convenience script that will build our ebook using bookdown. This script is modified from [the build script in the canonical bookdown demo](https://github.com/amlalejini/auto-deploying-bookdown-example).

```
#!/bin/sh

set -ev

Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::gitbook')"
Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::pdf_book')"
```

Running `build_book.sh` should compile your bookdown book into both an HTML and pdf document. Run `python -m http.server` for local viewing!

### Adding references using bibtex

Want to incorporate references? How about citing all of the packages that you used to compile your book? Easy!

`book.bib` will hold the bibtex references we want to cite. E.g.,

```

@book{xie_r_2019,
  address = {Boca Raton},
  title = {R {Markdown}: the definitive guide},
  isbn = {978-0-429-78296-1},
  shorttitle = {R {Markdown}},
  publisher = {CRC Press, Taylor and Francis Group},
  author = {Xie, Yihui and Allaire, J. J. and Grolemund, Garrett},
  year = {2019},
  keywords = {Computer programs, Markdown (Document markup language), R (Computer program language), Web site development},
}

```

You can cite things in text like `[@xie_r_2019]`

`tail.Rmd` will define the references section at the end of our ebook.

~~~
`r if (knitr::is_html_output()) '# References {-}'`

```{r, include=FALSE}
knitr::write_bib(c(.packages(), "bookdown"), file="packages.bib")
```
~~~

You'll also notice that `tail.Rmd` writes out `packages.bib`, which will contain bibtex entries for all of the R packages used to generate your bookdown book.

You'll also want to modify the front matter at the top of `index.Rmd` to configuration the bibliography:

```
---
title: "An automatically deploying ebook"
author: "Alexander Lalejini"
date: "`r Sys.Date()`"
output: bookdown::gitbook
documentclass: book
bibliography: ["book.bib", "packages.bib"]
biblio-style: apalike
nocite: '@*'
link-citations: yes
github-repo: amlalejini/auto-deploying-bookdown-example
description: "This is a demo for automatically deploying your bookdown ebook to GitHub pages."
---
```

The `nocite: '@*'` line tells bookdown to add _everything_ from `book.bib` and `packages.bib` to the references section regardless of whether or not it was actually cited in text.

**All of these example files can also be found on GitHub: <https://github.com/amlalejini/auto-deploying-bookdown-example>.**


## Step 2. Setting up a Dockerfile to run bookdown

at this point I also like to hook my repo up to

### Dealing with data that you don't want to store in a GitHub repository.


## Step 3. Using GitHub actions to automatically build and deploy your ebook


## Useful resources


- Bookdown has really good documentation in the form of a bookdown-generated ebook, [bookdown: Authoring Books and Technical Documents with R Markdown](https://bookdown.org/yihui/bookdown/)
- [bookdown demo GitHub repository](https://github.com/rstudio/bookdown-demo)