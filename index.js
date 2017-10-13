module.exports = {
    hooks: {
        'page:before': function(page) {
            let depth = -1;

            let opts = this.options.pluginsConfig['partial-summary'];
            if (opts && opts.hasOwnProperty('depth') && Number.isInteger(opts.depth)) {
                depth = opts.depth;
            }

            let pageDepth = page['partial-summary-depth'];
            if (pageDepth && Number.isInteger(pageDepth)) {
                depth = pageDepth;
            }

            if (depth === 0) {
                return page;
            }

            let currentArticle = this.summary.getArticleByPath(page.path);

            if (!currentArticle) {
                return page;
            }

            page.content += "\n\n" + getPartialSummary(currentArticle).join("\n");
            return page;

            function getPartialSummary(currentArticle, level = 0) {
                let offset = '  ';
                return currentArticle.articles.reduce((acc, article) => {
                    acc.push(`${offset.repeat(level)}* [${article.title}](${article.url || '/' + article.path})`);
                    return level + 1 < depth ? acc.concat(getPartialSummary(article, level + 1)) : acc;
                }, []);
            }
        }
    },
};
