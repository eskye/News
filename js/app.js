const API_KEY = 'd0337c4902614b91b950a7f4c4f81a6e';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'crypto-coins-news';
window.addEventListener('load', async e => {
    updateNews();
    await updateSource();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('../sw.js');
            console.log('SW Registered');
        } catch (error) {
            console.log('SW registration failed');
        }
    }
});

async function updateSource(params) {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`);
    const json = await res.json();
    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${source}&apiKey=${API_KEY}`)
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
        <a href="${article.url}">
          <h2>${article.title}</h2>
          <img src="${article.urlToImage}"/>
          <p>${article.description}</p>
        </a>
        </div>
    `;
}