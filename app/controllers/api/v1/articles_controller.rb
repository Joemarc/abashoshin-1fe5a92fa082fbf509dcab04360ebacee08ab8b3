class Api::V1::ArticlesController < ActionController::Base
  before_action :set_article, only: %i[show]

  def top
    top_article = Article.where(kind: 0).last
    render json: top_article, serializer: Article::ShortSerializer
  end

  def headline
    head_articles = Article.where(kind: 1).last(3)
    render json: head_articles, each_serializer: Article::ShortSerializer
  end

  def index
    articles = Articles::IndexService.new(current_user, article_index_params).perform

    if articles.success?
      #response.headers['pages_count'] = articles.data.total_pages.to_s
      #response.headers['articles_count'] = articles.data.total_count.to_s
      render json: articles.data, each_serializer: Article::ShortSerializer
    else
      render_json_errors(articles.data)
    end
  end

  def show
    article = Articles::GetService.new(@article, current_user).perform
    return nil unless article.success?

    render json: article.data, serializer: Article::CompleteSerializer
  end

  private

  def article_index_params
    params.permit(:page, :per_page, :category, :status)
  end

  def set_article
    @article = Article.friendly.find(params[:id])
  end
end