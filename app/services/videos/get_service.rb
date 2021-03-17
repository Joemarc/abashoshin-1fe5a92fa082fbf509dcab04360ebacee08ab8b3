# frozen_string_literal: true

module Videos
  # Service to get video
  class GetService
    def initialize(article, user)
      @video = article
      @user = user
    end

    def perform

      Response::Success.new(@video)
    end

    private

    def raise_errors
      render nothing: true, status: 404 unless @video.status == 'published'
    end
  end
end
