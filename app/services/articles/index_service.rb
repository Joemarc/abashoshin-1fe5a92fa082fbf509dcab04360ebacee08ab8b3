# frozen_string_literal: true

module Articles
  # Service to list all articles according to type
  class IndexService
    def initialize(current_user, article_params)
      @current_user = current_user
      @page_number = article_params[:page]
      @per_page = article_params[:per_page]
      @filter_category = article_params[:category]
    end

    def perform
      Response::Success.new(filtered_articles)
    end

    private

    def articles
      Article.where(kind: nil).published.order(published_at: :desc)
    end

    def filter_by_categories
      Article.published.order(published_at: :desc).where(category: @filter_category).distinct
    end

    def filtered_articles
      if @filter_category
        filter_by_categories
      else
        articles
      end
    end
  end
end
