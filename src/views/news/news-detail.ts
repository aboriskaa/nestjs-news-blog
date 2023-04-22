import { News } from 'src/news/news.service';
import { Comment } from 'src/news/comments/comments.service';

export function renderNewsDetail(news: News, comments: Comment[]): string {
  return `
  <div class="container d-flex justify-content-center">

  <div class="card" style="width: 18rem;">
  <img src="${news.cover}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${news.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
    <p class="card-text">${news.description}</p>
  </div>
</div>
${comments ? renderNewsComments(comments) : ''}
</div>
  `;
}

function renderNewsComments(comments: Comment[]): string {
  let html = '';

  for (const comment of comments) {
    html += `

    <div class="row>
    <div class="col-lg-2"></div>
    <div class="col-lg-8">
    <div>${comment.author}</div>
    <div>${comment.message}</div>
    </div>
    
  </div>
  <
        `;
  }
  return html;
}
