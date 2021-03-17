class Api::V1::VideosController < ActionController::Base
  before_action :set_video, only: %i[show]

  def index
    videos = Videos::IndexService.new(current_user, video_index_params).perform

    if videos.success?
      #response.headers['pages_count'] = videos.data.total_pages.to_s
      #response.headers['videos_count'] = videos.data.total_count.to_s
      render json: videos.data, each_serializer: Video::ShortSerializer
    else
      render_json_errors(videos.data)
    end
  end

  def show
    video = Videos::GetService.new(@video, current_user).perform
    return nil unless video.success?

    render json: video.data, serializer: Video::CompleteSerializer
  end

  private

  def video_index_params
    params.permit(:page, :per_page)
  end

  def set_video
    @video = Video.friendly.find(params[:id])
  end
end
