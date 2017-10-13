module.exports = {
    hooks: {
        'page:before': function(page) {
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
                    return acc.concat(getPartialSummary(article, level + 1));
                }, []);
            }
        }
    },
};
