---
layout: post
title: "Supplemental material++"
subtitle: "a collection of tools and services to spice up (and improve) your supplemental material"
date: 2020-12-13
last-updated: 2020-12-18
author: Alexander Lalejini
---

**This post is meant to serve as a living bestiary for nifty tools and resources that I use (in practice or aspirationally) to compose supplemental material for academic papers (or really whatever I might want supplemental material for).**

Apparently, I'm just really into supplemental material; this is the _second_ blog post on ❤️supplemental material❤️ that I've scraped together, and blog posts aren't really my thing!

Most often, I see supplemental material provided as a pdf file with links to code and/or data hosted somewhere on the internet (or worse, pasted directly into the file 😱). PDFs just don't cut it for me. The pdf is not an expressive enough medium 🎨 to hold all of the miscellaneous artifacts that should go along with a publication.

Who is this post for?

- Mostly future me
- Anyone looking for inspiration for building beautiful supplemental material

_Disclaimer:_ this bestiary isn't meant to be exhaustive! Because my primary audience is future me, I'm only adding tools/services that _I_ regularly use. There's lots of awesome stuff out there that you might not find here. For example, You'll notice that I don't include jupyter notebooks at the moment; those are great, I just don't use them very often because I do most of my analyses with R + R Markdown.

☎️ I'm always curious about other folks' workflows and favorite tools for putting together manuscripts/supplemental material! Reach out, send me suggestions!

## Git + GitHub

![backbone](https://img.shields.io/badge/-backbone-ff69b4)
![versioning](https://img.shields.io/badge/-versioning-ff69b4)
![code](https://img.shields.io/badge/-code%20storage-ff69b4)
![data](https://img.shields.io/badge/-data%20storage%20(only%20a%20little)-ff69b4)

[Git](https://git-scm.com/) repositories are the backbone of my entire workflow for every project.
Git is your friendly neighborhood version control system.
Track (and show) the history of your project, tag versions to easily access older versions of your project, make collaborating with other folks on your source code so much easier.
Want to know when (and maybe why) exactly you added that line of code? Git blame is your friend!

[GitHub](https://github.com/) gives your git repository a _really_ nice home; there are other services out there that give git repositories a home in the cloud, but nothing has pulled me away from GitHub.
I won't list all the advantages/disadvantages of these tools here; google (or duckduckgo) around and you'll find an abundance of relevant blog posts/tech articles.

In some ways, a comprehensive and well managed GitHub repository is the ultimate supplemental material for any publication on its own; folks can access your project's history, file issues (_e.g._, to ask you questions), reproduce your work, or fork and extend your project.
I try to put _almost_ everything associated with a paper inside of a designated GitHub repository (minus large amounts of data and usually not my LaTex source files).
Anything that I don't include (like large data files), I am sure to link to in the repository's README.
All of this allows me use a paper's GitHub repository as a one-stop-shop for all of that paper's supplemental material.
Even better, services like [Zenodo](https://zenodo.org/) allow you to easily cite your repository by assigning it a permanent DOI (check out [this guide](https://lalejini.com/2020/04/02/gh-supplemental-material-guide.html) for setting that up).

**Tips**

- 🛑, I don't recommend storing large data files on GitHub. There are [better services](#open-science-framework-osf) for storing data that you can link to from your repo!
- README files aren't just for your root directory! Add README.md files to important directories in your repository. If someone clicks into a directory with a README file on GitHub, the contents of the readme are automatically rendered below the directory listing. This is a great way to give folks a quick and convenient guide to the directory's contents.

**Resources**

- [Software carpentry lesson on git](http://swcarpentry.github.io/git-novice/)
- [Enrichment seminar given by Dr. Emily Dolson on git/GitHub](https://mmore500.com/waves/enrichment/week1.html)
- <https://mmore500.com/waves/blog/extra-git.html>

## Zenodo

![doi](https://img.shields.io/badge/-citable%20doi-ff69b4)

[Zenodo](https://zenodo.org/) is a nifty service that you can use to attach a DOI to a GitHub repository (and to other things).
Zenodo makes is super easy to cite GitHub repositories in a paper ([see this guide](https://lalejini.com/2020/04/02/gh-supplemental-material-guide.html)).

**Tips**

- For bibtex users, Zenodo will spit out the citation for your repo in bibtex format!
  - BUT, you should always sanity check the reference in your compiled document. Depending on your bibliography format, it may leave important things off like the actual DOI or the url. I can often get around this by adding a `note` field to the bibtex entry (_e.g._, `note={DOI: xxxx}`).
  - Also, if you're using the DOI'd repository as your supplemental material, consider updating the `title` field of your bibtex entry to make that obvious because the default `title` is just the name of the repository on GitHub.


## Repository badges

![fun](https://img.shields.io/badge/-fun-ff69b4)
![informative](https://img.shields.io/badge/-information%20at%20a%20glance-ff69b4)

Sticking badges on a repository (or any document, really) is just good fun.
And useful, too!
You often find badges at the top of README files on GitHub repositories.
For example,

[![readme-badges-example]( {{ site.baseurl }}/imgs/blog/2020-12-13-supplemental++/readme-badges.png)](https://github.com/amlalejini/Tag-based-Genetic-Regulation-for-LinearGP)

Badges can give you an at-a-glance overview of the state of a repository.
Often folks will report whether or not their code is passing tests, testing coverage, _et cetera_.
Even more directly relevant to supplemental material, you can grab a badge from Zenodo that will report your repository's DOI and link to the associated Zenodo page.
Create custom badges to direct folks to where your data are hosted or where they can download your paper.

**Places to generate badges**

- <https://shields.io/>
  - I most commonly use this one. Lots of fantastic options to choose from, and you can generate [![custom-badge-badge](https://img.shields.io/badge/custom-badges%21%21-blueviolet)](https://shields.io/#your-badge)
- Lot's of services that you can hook into your GitHub repository (_e.g._, code coverage, continuous integration, etc) will provide a badge that indicates the status of your repository on their service.

## GitHub Pages

![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4)

What's way cooler than pdf-bound supplemental material? Web-enabled supplemental material!

GitHub pages is a minimal effort (and free!) way to generate and host a static website directly from a GitHub repository.
Generating a website for a repository is actually as easy as toggling a switch in your repository's settings.
If you do nothing but flip on the GH pages switch and write a decent readme, you'll have solid landing page for paper ([here's one I did when I was first figuring out github pages](https://lalejini.com/GECCO-2018-Evolving-Event-driven-Programs-with-SignalGP/)).

By default, GH pages compiles your site using [Jekyll](https://jekyllrb.com/), which is really flexible, fairly easy to use, and has a huge community using it.
You don't _have_ to use jekyll; you can use whatever you'd like (_e.g._, [bookdown!](#bookdown)).

GH pages _really_ shines for supplemental material in combination with other tools, like R markdown (_e.g._, R analyses => pretty HTML files) or nbconvert for jupyter notebooks (_e.g._, python notebook analyses => pretty HTML files). For example, instead of pointing readers to your raw source code, point them to a nicely formatted HTML file generated from your analysis code that weaves readable explanations together with code and output (_e.g._, stats, visualizations, etc.).

**Tips**

- Separate the main branch from the pages branch (`gh-pages` by default).
  - You can use another service (_e.g._, github action) to push/deploy your site to the gh-pages anytime your push to the main branch if the changes pass automated testing. This way, your supplemental material will stay in lock-step with _working_ versions of your project 😉
- GitHub pages is also great for personal websites (_e.g._, [this website](https://github.com/amlalejini/amlalejini.github.io), lab websites, conference workshop websites, _et cetera!

**Resources**

- [blog post on making supplemental material web-accessible](https://lalejini.com/2020/04/02/gh-supplemental-material-guide.html#bonus-make-your-supplemental-material-web-accessible)

## Open Science Framework (OSF)

![code](https://img.shields.io/badge/-code%20storage-ff69b4)
![data](https://img.shields.io/badge/-data%20storage-ff69b4)
![doi](https://img.shields.io/badge/-citable%20doi-ff69b4)

OSF lets you create repositories (which will get a citable DOI) that you can put stuff in (_e.g._, code, data, documentation, _etc_.).
OSF repositories have all sorts of integrations that let you associate disparate backend components together in a sustainable/citable way.

I've primarily used OSF repositories as a place to dump compressed data files (instead of dealing with git/github's large file storage system).
I'll also link my OSF repository with my project's associated GitHub repository (and whatever other integrations make sense).

In my aspirational supplemental material, I like to include a 'Data Availability' section that links to/cites the OSF repository that holds my experiment data.

**Tips**

- [osfclient](https://github.com/osfclient/osfclient) is a nifty python library and command-line tool for uploading files to and downloading files from your OSF projects.
  - _e.g._, use this to have your experiment software automatically upload data when your experiment finishes, or use it to write convenient scripts that download/extract/organize your data for anyone interested in playing with it (including future you!).

## Docker containers

![reproducibility](https://img.shields.io/badge/-reproducibility-ff69b4)

Dockerfiles (and the images/containers they generate) give you a way of fully specifying the requisite development environment for compiling/running your computational experiments.
Nüst _et al._ make a great case for using Docker for reproducible science in their [10 simple rules paper](https://doi.org/10.1371/journal.pcbi.1008316).

[Docker Hub](https://hub.docker.com/) is a great place to host your containers.
Plus, Docker Hub repositories can be linked with GitHub repositories.
You can stick your Dockerfile in your GitHub repo, and Docker Hub will watch for new commits and build your Dockerfile.

**Tips**

- Grab a badge from <shields.io>
  - to link to docker hub repo [![DockerHub link](https://img.shields.io/badge/DockerHub-Hosted-blue)](https://hub.docker.com/r/amlalejini/tag-based-genetic-regulation-for-gp)
  - to indicate build status ![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/amlalejini/tag-based-genetic-regulation-for-gp)
- When you build your docker image locally (_e.g._, `docker build .`), the build process will drop intermediate images as you go (for each RUN directive). If something fails during the build, you can always hop into the last successful image to investigate 🔍.
  - if your build fails, you can use `docker image ls -a` to see all of the recently created intermediate images
  - once you pick an image to spin up, you can run it interactively `docker run -it the_image_id`
  - `docker system prune` is your friend while you debug your dockerfile locally!
- Pinning versions
  - Great tip from [Matthew](https://twitter.com/morenomatthewa): you can build it without the pins, then open the container and run `apt policy packagename` for the things you want to pin
- Lot's of great tips here: [Ten simple rules for writing Dockerfiles for reproducible data science](https://doi.org/10.1371/journal.pcbi.1008316)

**Resources**

- Nüst, D., Sochat, V., Marwick, B., Eglen, S. J., Head, T., Hirst, T., & Evans, B. D. (2020). Ten simple rules for writing Dockerfiles for reproducible data science. PLOS Computational Biology, 16(11), e1008316. <https://doi.org/10.1371/journal.pcbi.1008316>
  - Plus the associated github repository with lots of examples: <https://github.com/nuest/ten-simple-rules-dockerfiles/tree/master/examples>


## R Markdown

![analysis](https://img.shields.io/badge/-data%20analysis-ff69b4)
![visualization](https://img.shields.io/badge/-visualization-ff69b4)
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4)

R Markdown lets you interweave your R code, visualizations, and explanatory text all together in one document.
Then, use [knitr](https://yihui.org/knitr/) to 'knit' it all into a single HTML file or pdf (or both!).
Output your R Markdown as an HTML page, push it to your GitHub repository, turn on GitHub pages, and ✨!
You've got a nicely formatted web page with all of your data analyses!

[RStudio](https://rstudio.com/) (which I totally recommend to anyone starting out with R coding) makes this workflow _really_ easy.
Just pop open your `.Rmd` file, and mash the `Knit` button.

![knit]({{ site.baseurl }}/imgs/blog/2020-12-13-supplemental++/knit.png)

Check out Yihui Xie's [R Markdown: Definitive Guide](https://bookdown.org/yihui/rmarkdown/) to see what's possible with R Markdown (spoiler: a whole bunch of awesome stuff is possible).

**Tips**

- Add a table of contents (`toc:true`) to your output to make it easier to jump around your document
  - _e.g._ add `toc` options to your R markdown file's front matter,
    ```
    ---
    title: "My fun analyses with a table of contents"
    output:
      html_document:
        toc: true
        toc_float: true
        toc_depth: 4
    ---
    ```
- If you want to go wild and interweave Python and R code, you can use the [reticulate](https://rstudio.github.io/reticulate/) package!

**Resources**

- [R Markdown: The Definitive Guide](https://bookdown.org/yihui/rmarkdown/)
- [Getting started with R Markdown on RStudio](https://rmarkdown.rstudio.com/lesson-1.html)

## Bookdown

![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4)
![slick](https://img.shields.io/badge/-it%20just%20looks%20slick-ff69b4)

[Bookdown](https://bookdown.org/) is an R package that can bundle multiple R Markdown (and vanilla markdown) documents into a cohesive and slick ebook.
My first exposure to bookdown in the wild was Claus Wilke's fantastic [Fundamentals of Data Visualization](https://clauswilke.com/dataviz/), which was written entirely in R Markdown and compiled using bookdown.

I like using bookdown to tie together all of my supplemental material into a single, nifty ebook (e.g., <https://lalejini.com/Tag-based-Genetic-Regulation-for-LinearGP/supplemental/>).

I _highly_ recommend starting with Yihui Xie's [bookdown: Authoring Books and Technical Documents with R Markdown](https://bookdown.org/yihui/bookdown/), which itself is compiled using bookdown!
I also recommend playing around with Yihui Xie's [bookdown demo](https://github.com/rstudio/bookdown-demo) to get a feel for using bookdown.


**Resources**

- [bookdown: Authoring Books and Technical Documents with R Markdown](https://bookdown.org/yihui/bookdown/)
  - Comprehensive introduction/guide/documentation by the developer, Yihui Xie
  - This getting started demo is also super handy: <https://github.com/rstudio/bookdown-demo>