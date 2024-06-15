const apiKey = 'e7abc109441b4c46bef33da38c7e92cd';
let cat = 'general';
let country = 'in';
let query='';
const countries = {
    ae: 'United Arab Emirates',
    ar: 'Argentina',
    at: 'Austria',
    au: 'Australia',
    be: 'Belgium',
    bg: 'Bulgaria',
    br: 'Brazil',
    ca: 'Canada',
    ch: 'Switzerland',
    cn: 'China',
    co: 'Colombia',
    cu: 'Cuba',
    cz: 'Czech Republic',
    de: 'Germany',
    eg: 'Egypt',
    fr: 'France',
    gb: 'United Kingdom',
    gr: 'Greece',
    hk: 'Hong Kong',
    hu: 'Hungary',
    id: 'Indonesia',
    ie: 'Ireland',
    il: 'Israel',
    in: 'India',
    it: 'Italy',
    jp: 'Japan',
    kr: 'South Korea',
    lt: 'Lithuania',
    lv: 'Latvia',
    ma: 'Morocco',
    mx: 'Mexico',
    my: 'Malaysia',
    ng: 'Nigeria',
    nl: 'Netherlands',
    no: 'Norway',
    nz: 'New Zealand',
    ph: 'Philippines',
    pl: 'Poland',
    pt: 'Portugal',
    ro: 'Romania',
    rs: 'Serbia',
    ru: 'Russia',
    sa: 'Saudi Arabia',
    se: 'Sweden',
    sg: 'Singapore',
    si: 'Slovenia',
    sk: 'Slovakia',
    th: 'Thailand',
    tr: 'Turkey',
    tw: 'Taiwan',
    ua: 'Ukraine',
    us: 'United States',
    ve: 'Venezuela',
    za: 'South Africa'
};

function populateCountrySelect() {
    const countrySelect = document.getElementById('country-select');
    for (const code in countries) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = countries[code];
        if (code === country) {
            option.selected = true;
        }
        countrySelect.appendChild(option);
    }
}

function fetchNews(category, query = '', country = 'in') {
    let url;
    if (query) {
        url = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apiKey}`;
    } else {
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    }

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            let innerHtml = '';
            data.articles.forEach((article) => {
                if (!article.title || !article.description || !article.urlToImage || !article.content) return;

                innerHtml += `
                    <div class="news-item">
                        <img class="news-img" src="${article.urlToImage}" alt="News Image">
                        <div class="news-content-wrapper">
                            <h1 class="news-title">${article.title}</h1>
                            <p class="news-desc">${article.description}</p>
                            <p class="news-content">${article.content}</p>
                            <p class="news-time">${new Date(article.publishedAt).toLocaleString()}</p>
                        </div>
                    </div>`;
            });
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = innerHtml;
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

fetchNews(cat, '', country);

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        cat = link.getAttribute('data-category');
        fetchNews(cat, '', country);
    });
});

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
     query = searchInput.value.trim();
    if (query) {
        fetchNews('', query, country);
    }
});

const countrySelect = document.getElementById('country-select');
countrySelect.addEventListener('change', (event) => {
    country = event.target.value;
    fetchNews(cat, '', country);
});

populateCountrySelect();
