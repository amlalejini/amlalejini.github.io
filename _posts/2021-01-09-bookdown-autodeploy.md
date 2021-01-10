---
layout: post
title: "Automatically deploy a bookdown ebook with GitHub actions"
date: 2021-01-09
last-updated: 2021-01-10
author: Alexander Lalejini
---

In this post, I'll walk you (or future me 👋 😉) through getting a [bookdown](https://bookdown.org/)-generated ebook to automatically deploy as a static website (using [GitHub pages](https://pages.github.com/)) any time you make changes to your GitHub repository (using [GitHub actions](https://docs.github.com/en/free-pro-team@latest/actions)). This guide is intended to get you started with a (mostly) minimal example.

This guide assumes familiarity with each of the tools and services that we'll use; I'm just here to help you duct tape them all together ☺️!

**TL;DR: See [this GitHub repository](https://github.com/amlalejini/auto-deploying-bookdown-example) for  the fully functional demo.**

Ingredients 🍲

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

With our ebook compiling locally, we want to specify a docker image with the requisite environment to compile everything.

`Dockerfile`

```
# Pull a base image
FROM ubuntu:20.04

# Copy everything (minus anything specified in .dockerignore) into the image
COPY . /opt/auto-deploying-bookdown-example

# To make installs not ask questions about timezones
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York

##############################
# install base dependencies
# - for R repository
#   - dirmngr
#   - gpg-agent
# - for bookdown compilation
#   - pandoc, pandoc-citeproc, texlive-base, texlive-latex-extra
##############################
RUN \
  apt-get update \
    && \
  apt-get install -y -qq --no-install-recommends \
    software-properties-common \
    curl=7.68.0-1ubuntu2.4 \
    g++-10=10.2.0-5ubuntu1~20.04 \
    make=4.2.1-1.2 \
    cmake=3.16.3-1ubuntu1  \
    python3=3.8.2-0ubuntu2 \
    python3-pip \
    python3-virtualenv \
    git=1:2.25.1-1ubuntu3 \
    dirmngr \
    gpg-agent \
    pandoc \
    pandoc-citeproc \
    texlive-base \
    texlive-latex-extra \
    lmodern \
    && \
  echo "installed base dependencies"

########################################################
# install r with whatever r packages we need/want
# - source: https://rtask.thinkr.fr/installation-of-r-4-0-on-ubuntu-20-04-lts-and-tips-for-spatial-packages/
########################################################
RUN \
  gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9 \
    && \
  gpg -a --export E298A3A825C0D65DFD57CBB651716619E084DAB9 | apt-key add - \
    && \
  apt update \
    && \
  add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu focal-cran40/' \
    && \
  apt-get install -y -q --no-install-recommends \
    r-base=4.0.3-1.2004.0 \
    r-base-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    libfreetype6-dev \
    libmagick++-dev \
    libxml2-dev \
    libfontconfig1-dev \
    cargo \
    && \
  R -e "install.packages('rmarkdown', dependencies=NA, repos='http://cran.rstudio.com/')" \
    && \
  R -e "install.packages('knitr', dependencies=NA, repos='http://cran.rstudio.com/')" \
    && \
  R -e "install.packages('bookdown', dependencies=NA, repos='http://cran.rstudio.com/')" \
    && \
  R -e "install.packages('tidyverse',dependencies=NA, repos='http://cran.rstudio.com/')" \
    && \
  R -e "install.packages('cowplot',dependencies=NA, repos='http://cran.rstudio.com/')" \
    && \
  echo "installed r and configured r environment"


########################################################
# build supplemental material (will also run data analyses)
########################################################
RUN \
  cd /opt/auto-deploying-bookdown-example \
    && \
  ./build_book.sh \
    && \
  echo "compiled bookdown ebook
```

This Dockerfile assumes that everything you need to build your bookdown site is inside your GitHub repository. What if you need data that you don't want to add to your GitHub repository (e.g., too big/too much)?

### Using data stored on OSF

Downloading data stored on the [Open Science Framework](https://osf.io/) into your docker image is easy using the [osfclient python package](https://github.com/osfclient/osfclient).

E.g., in your `Dockerfile` before running the `build_book.sh` script, add something along the lines of:

```
########################################################
# install osfclient, use to download project data
########################################################
RUN \
  pip3 install osfclient \
    && \
  export OSF_PROJECT=w95ne \
    && \
  export PROJECT_PATH=/opt/auto-deploying-bookdown-example/ \
    && \
  osf -p ${OSF_PROJECT} fetch data.tar.gz ${PROJECT_PATH}/data.tar.gz \
    && \
  tar -xzf ${PROJECT_PATH}/data.tar.gz -C ${PROJECT_PATH}/ \
    && \
  echo "download"
```

## Step 3. Using GitHub actions to automatically build and deploy your ebook

Now that we have a Dockerfile that specifies how to build our ebook, we can wire up some GitHub actions to watch our repository for new commits, build our ebook, and deploy to github pages.

First, turn on GitHub pages for your repository (under the repo's Settings tab).
Select the `gh-pages` branch, and save the changes.

Next, we need to tell GitHub not to use jekyll to generate your site because we'll be generating the site ourselves using bookdown. All you need to do is add an empty `.nojekyll` file to your gh-pages branch. You can do this manually or directly on GitHub with the Add file button.

Finally, we're ready to add a workflow (`.github/workflows/deploy-bookdown.yml`) to our GitHub repository that will string together GitHub actions to automatically build and deploy our bookdown site.

`.github/workflows/deploy-bookdown.yml`

```
name: Build and deploy to GitHub Pages
on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      - name: docker build
        run:
        |
          docker build . --file Dockerfile --tag example
          docker container create --name pages_build example:latest
          docker cp pages_build:/opt/auto-deploying-bookdown-example/_book ./_book
      - name: deploy to github pages
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages # The branch the action should deploy to
          FOLDER: _book # The folder the action should deploy
          CLEAN: true # Automatically remove deleted files from the deploy branch
```

Done!

You can check out the Actions tab on your github repository to see the output log resulting from your workflow. E.g., [for this example repository](https://github.com/amlalejini/auto-deploying-bookdown-example/actions).

## Useful resources

- bookdown
  - Bookdown has really good documentation in the form of a bookdown-generated ebook, [bookdown: Authoring Books and Technical Documents with R Markdown](https://bookdown.org/yihui/bookdown/)
  - [bookdown demo GitHub repository](https://github.com/rstudio/bookdown-demo)
- GitHub actions/workflows
  - [GitHub's learning lab](https://lab.github.com/) has fantastic interactive tutorials for working with all sorts of GitHub features, including actions!