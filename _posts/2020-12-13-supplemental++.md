---
layout: post
title: "Supplemental material++"
subtitle: "a collection of tools and services to spice up (and improve) your supplemental material"
date: 2020-12-13
last-updated: 2020-12-15
---

Apparently, I am excited about good supplemental material.
Explanation of what this is and who it is for.
Overview of how I do supplemental material. Don't like pdf as a medium - just not as expressive and flexible as I'd like. Can't hold code, organize material in a non-linear way.

Things that i use, not an exhaustive list of things.
You'll notice no jupyter notebooks at the moment; those are great, I just don't use them very often because I'm more often using R + R markdown.

Reach out, send me suggestions!

## Git + GitHub
![backbone](https://img.shields.io/badge/-backbone-ff69b4
)
![versioning](https://img.shields.io/badge/-versioning-ff69b4
)
![code](https://img.shields.io/badge/-code%20storage-ff69b4
)
![data](https://img.shields.io/badge/-data%20storage%20(only%20a%20little)-ff69b4
)

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

🛑, I don't recommend storing large data files on GitHub. There are [better services](#open-science-framework-osf) for storing data that you can link to from your repo!

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
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4
)

## Open Science Framework (OSF)
![code](https://img.shields.io/badge/-code%20storage-ff69b4
)
![data](https://img.shields.io/badge/-data%20storage-ff69b4
)
![doi](https://img.shields.io/badge/-citable%20doi-ff69b4
)

## Docker containers
![reproducibility](https://img.shields.io/badge/-reproducibility-ff69b4
)

## R Markdown
![analysis](https://img.shields.io/badge/-data%20analysis-ff69b4
)
![visualization](https://img.shields.io/badge/-visualization-ff69b4
)
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4
)

[readable data analysis]

## Bookdown
![accessibility](https://img.shields.io/badge/-web%20accessibility-ff69b4
)
![slick](https://img.shields.io/badge/-it%20just%20looks%20slick-ff69b4
)

[bundling everything together]



