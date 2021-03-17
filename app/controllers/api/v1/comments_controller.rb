class Api::V1::CommentsController < ActionController::Base
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_comment, only: %i[update destroy]

  def index
    request_params = request.path.split('/')
    comments = Comments::IndexService.new(request_params, current_user, page_number).perform
    return unless comments.success?

    #response.headers['pages_count'] = comments.data.total_pages.to_s
    render json: comments.data, each_serializer: Comment::CommentsSerializer
  end

  def create
    request_params = request.path.split('/')
    comment = Comments::CreateService.new(request_params, comment_params, current_user).perform

    if comment.success?
      render json: comment.data, serializer: Comment::CommentsSerializer
    else
      render_json_errors(comment.data)
    end
  end

  def update
    comment = Comments::UpdateService.new(@comment, comment_params, current_user).perform

    if comment.success?
      render json: comment.data
    else
      render_json_errors(comment.data)
    end
  end

  def destroy
    @comment.destroy if current_user.id != @comment.user_id

    render json: 'ok'
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end