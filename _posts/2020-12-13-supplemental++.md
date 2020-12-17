---
layout: post
title: "Supplemental material++"
subtitle: "a collection of tools and services to spice up (and improve) your supplemental material"
date: 2020-12-13
last-updated: 2020-12-16
author: Alexander Lalejini
---

Apparently, I'm just really into supplemental material; this is the _second_ blog post on ❤️supplemental material❤️ that I've scraped together, and blog posts aren't typically my thing!

**This post is meant to serve as a living bestiary for nifty tools and resources that I use (in practice or aspirationally) to compose supplemental material for academic papers (or really whatever I might want supplemental material for).**

Most often, I see supplemental material provided as a pdf file with links to code and/or data hosted somewhere on the internet (or worse, pasted directly into the file 😱). Pdfs just don't cut it for me. The pdf is not an expressive enough medium 🎨 to hold all of the miscellaneous artifacts that should go along with a publication.

Who is this post for?

- Mostly future me. I'm not naive enough to think that anyone other than me will ever click through to this blog post.
- I guess anyone looking for inspiration for building beautiful supplemental material.

_Disclaimer:_ this bestiary isn't meant to be exhaustive! Because my intended audience is primarily future me, I'm only adding tools/services that _I_ regularly use. There's lots of awesome stuff out there that you might not find here. For example, You'll notice that I don't include jupyter notebooks at the moment; those are great, I just don't use them very often because I do most of my analyses in R + R Markdown.

☎️ I'm always curious about other folks' workflows and favorite tools for putting together manuscripts/supplemental material! Reach out, send me suggestions!

## Git + GitHub
![backbone](https://img.shields.io/badge/-backbone-ff69b4)
![versioning](https://img.shields.io/badge/-versioning-ff69b4)
![code](https://img.shields.io/badge/-code%20storage-ff69b4)
![data](https://img.shields.io/badge/-data%20storage%20(only%20a%20little)-ff69b4)

[Git](https://git-scm.com/) + [GitHub](https://github.com/) repositories are the backbone of my entire workflow for every project.
Git is your friendly neighborhood version control system.
Track (and show) the history of your project, tag versions to easily access older versions of your project, make collaborating with other folks on your source code so much easier.
Want to know when (and maybe why) exactly you added that line of code? Git blame is your friend!
GitHub gives your git repository a _really_ nice home; there are other services out there that give git repositories a home in the cloud, but nothing has pulled me away from GitHub.
I won't list all the advantages/disadvantages of these tools here; google (or duckduckgo) around and you'll find relevant blog posts/tech articles galore.

In some ways, a comprehensive and well managed GitHub repository is the ultimate supplemental material for any publication on its own; folks can access your project's history, file issues (e.g., to ask you questions), reproduce your work, or fork and extend your project.
I try to put _almost_ everything (not large amounts of data and usually not my LaTex source files) associated with a paper inside of a designated GitHub repository.
Anything that I don't include (like large data files), I am sure to link to in the repository's README.
All of this allows me use my paper's GitHub repository as a one-stop-shop for all of that paper's supplemental material.
Even better, services like [Zenodo](https://zenodo.org/) allow you to easily cite your repository by assigning it a permanent DOI (check out [this guide](https://lalejini.com/2020/04/02/gh-supplemental-material-guide.html) for setting that up).

Tips
- 🛑, I don't recommend storing large data files on GitHub. There are [better services](#open-science-framework-osf) for storing data that you can link to from your repo!
- README files aren't just for your root directory! Add README.md files to important directories in your repository. If someone clicks into a directory with a README file on GitHub, the contents of the readme are automatically rendered below the directory listing. This is a great way to give folks a quick and convenient guide to the directory's contents.

Here's some useful resources for using git/github:

- [Software carpentry lesson on git](http://swcarpentry.github.io/git-novice/)
- [Enrichment seminar given by Dr. Emily Dolson on git/GitHub](https://mmore500.com/waves/enrichment/week1.html)
- <https://mmore500.com/waves/blog/extra-git.html>

## Zenodo
![doi](https://img.shields.io/badge/-citable%20doi-ff69b4)

[Zenodo](https://zenodo.org/) is a nifty service that you can use to attach a DOI to a GitHub repository (and to other things).
Zenodo makes is super easy to cite GitHub repositories in a paper ([see this guide](https://lalejini.com/2020/04/02/gh-supplemental-material-guide.html)).

Tips

- For bibtex users, Zenodo will spit out the citation for your repo in bibtex format!
  - BUT, you should always sanity check the reference in your compiled document. Depending on your bibliography format, it may leave important things off like the actual DOI or the url. I can often get around this by adding a `note` field to the bibtex entry (e.g., `note={DOI: xxxx}`).
  - Also, if you're using the DOI'd repository as your supplemental material, consider updating the `title` field to make that obvious (the default `title` is just the name of the repository on GitHub).


## Repository badges
![fun](https://img.shields.io/badge/-fun-ff69b4)
![informative](https://img.shields.io/badge/-information%20at%20a%20glance-ff69b4)

Sticking badges on a repository (or any document, really) is just good fun. And useful, too!
You often find badges at the top of README files on GitHub repositories. For example,

[![readme-badges-example]( {{ site.baseurl }}/imgs/blog/2020-12-13-supplemental++/readme-badges.png)](https://github.com/amlalejini/Tag-based-Genetic-Regulation-for-LinearGP)

Badges can give you an at-a-glance overview of the state of a repository.
Often folks will report whether or not their code is passing tests, testing coverage, _et cetera_.
Even more directly relevant to supplemental material, you can grab a badge from Zenodo that will report your repository's DOI and link to the associated Zenodo page.
Create custom badges to direct folks to where your data are hosted or where they can download your paper.

#### Places to generate badges

- <https://shields.io/>
  - I most commonly use this one. Lots of fantastic options to choose from, and you can generate [![custom-badge-badge](https://img.shields.io/badge/custom-badges%21%21-blueviolet)](https://shields.io/#your-badge)
- Lot's of services that you can hook your repository into (e.g., code coverage, continuous integration, etc) will provide a badge that indicates the status of your repository on their service.

## GitHub Pages
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4)

What's way cooler than pdf-bound supplemental material? Web-enabled supplemental material!

GitHub pages is a minimal effort (and free!) way to generate and host a static website directly from a GitHub repository.
Generating a website for a repository is actually as easy as toggling a switch in your repository's settings.
If you do nothing but flip on the GH pages switch and write a decent readme, you'll have solid landing page for paper ([here's one I did when I was first figuring out github pages](https://lalejini.com/GECCO-2018-Evolving-Event-driven-Programs-with-SignalGP/)).

By default, GH pages compiles your site using [Jekyll](https://jekyllrb.com/), which is really flexible, fairly easy to use, and has a huge community using it.
You don't _have_ to use jekyll; you can use whatever you'd like (e.g., [bookdown!](#bookdown)).

GH pages _really_ shines for supplemental material in combination with other tools, like R markdown (e.g., R analyses => pretty HTML files) or nbconvert for jupyter notebooks (e.g., python notebook analyses => pretty HTML files). For example, instead of pointing readers to your raw source code, point them to a nicely formatted HTML file generated from your analysis code that weaves readable explanations together with code and output (e.g., stats, visualizations, etc.).

Resources

- [blog post on making supplemental material web-accessible](https://lalejini.com/2020/04/02/gh-supplemental-material-guide.html#bonus-make-your-supplemental-material-web-accessible)

Tips

- Separate the main branch from the pages branch (`gh-pages` by default).
  - You can use another service (e.g., github action) to push/deploy your site to the gh-pages anytime your push to the main branch if the changes pass automated testing. This way, your supplemental material will stay in lock-step with _working_ versions of your project 😉
- GitHub pages is also great for personal websites (e.g., [this website](https://github.com/amlalejini/amlalejini.github.io), lab websites, conference workshop websites, _et cetera!

## Open Science Framework (OSF)
![code](https://img.shields.io/badge/-code%20storage-ff69b4)
![data](https://img.shields.io/badge/-data%20storage-ff69b4)
![doi](https://img.shields.io/badge/-citable%20doi-ff69b4)

## Docker containers
![reproducibility](https://img.shields.io/badge/-reproducibility-ff69b4
)

## R Markdown
![analysis](https://img.shields.io/badge/-data%20analysis-ff69b4)
![visualization](https://img.shields.io/badge/-visualization-ff69b4)
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4)

[readable data analysis]

## Bookdown
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4)
![slick](https://img.shields.io/badge/-it%20just%20looks%20slick-ff69b4)

[bundling everything together]
[inspired by claus' dataviz book]



