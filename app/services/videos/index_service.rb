# frozen_string_literal: true

module Videos
  # Service to list all videos
  class IndexService
    def initialize(current_user, video_params)
      @current_user = current_user
      @page_number = video_params[:page]
      @per_page = video_params[:per_page]
    end

    def perform
      Response::Success.new(videos)
    end

    private

    def videos
      Video.published.order(published_at: :desc)
    end
  end
end
