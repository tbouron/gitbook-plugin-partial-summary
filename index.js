module.exports = {
    hooks: {
        'page:before': page => {
            return this.getBook().getSummary().getByPath(page.path).then(article => {
                page.content += getPartialSummary(article);
                return page;
            }).catch(() => {
                return page;
            });

            function getPartialSummary(currentArticle) {
                if (currentArticle.articles.length === 0) {
                    return '';
                }

                let summary = '<ul>';
                summary += currentArticle.articles.reduce((acc, article) => {
                    let subSummary = getPartialSummary(article);
                    acc.push(`<li><a href="${article.getUrl() || article.getPath()}">${article.title}</a>${subSummary}</li>`)
                }, []).join("\n");
                summary += '</ul>';

                return summary;
            }
        }
    },
};
