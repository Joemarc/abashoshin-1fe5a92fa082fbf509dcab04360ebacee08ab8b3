# frozen_string_literal: true

module Articles
  # Service to list all articles according to type
  class GetService
    def initialize(article, user)
      @article = article
      @user = user
    end

    def perform

      Response::Success.new(@article)
    end

    private

    def raise_errors
      render nothing: true, status: 404 unless @article.status == 'published'
    end
  end
end
