# frozen_string_literal: true

module Articles
  # Service to list all articles according to type
  class GetTopStoriesService
    def perform
      Response::Success.new(stories)
    end

    private

    def stories
      headline = Article.where(kind: 0).last
      hot_topics = Article.where(kind: 1).last(4)

      {
        headline: Article::ShortSerializer.new(headline).as_json,
        hot_topics: hot_topics&.map { |t| Article::ShortSerializer.new(t).as_json }
      }
    end
  end
end
