class Forest::ArticlesController < ForestLiana::ApplicationController
  def publish_article
    article_id = params.dig('data', 'attributes', 'ids').first
    Article.update(article_id, status: 'published', published_at: DateTime.now)

    render json: { success: 'The article has been published' }
  end

  def republish_article
    article_id = params.dig('data', 'attributes', 'ids').first
    Article.update(article_id, status: 'published', published_at: DateTime.now)

    render json: { success: 'The article has been re-published' }
  end
end
