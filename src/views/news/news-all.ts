import { News } from 'src/news/news.service';

export function renderNewsAll(news: News[]): string {
  let newsListHtml = '';
  for (const newsItem of news) {
    newsListHtml += renderNewsBlock(newsItem);
  }
  return `
  <div class="container">
  <h1>News list</h1>
  <div class="row">
  ${newsListHtml}
  </div>
  </div>
  `;
}

export function renderNewsBlock(news: News): string {
  return `
  <div class="col-lg-4">
  <div class="card" style="width: 18rem;">
  <img src="${news.cover}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${news.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
    <p class="card-text">${news.description}</p>
  </div>
</div>
</div>
      `;
}
