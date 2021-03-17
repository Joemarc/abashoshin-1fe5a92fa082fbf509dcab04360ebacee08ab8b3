# frozen_string_literal: true

module Comments
  # Service to create a article
  class CreateService
    def initialize(request_params, comment_create_params, user)
      @resource = request_params[1]
      @id = request_params[2]
      @comment_create_params = comment_create_params
      @user = user
      @comment = create_comment
    end

    def perform
      return Response::Failure.new(@comment) unless @comment.valid?

      Response::Failure.new(@comment) unless @comment.save
#      create_timeline
      Response::Success.new(@comment)
    end

    private

    def create_comment
      Comment.new(
        body: @comment_create_params[:body],
        commentable_type: @resource.singularize.capitalize,
        commentable_id: @id,
        user_id: @user.id
      )
    end

    def create_timeline
      if @comment.commentable_type == 'article' || @comment.commentable_type == 'event'
        model = @comment.commentable_type.classify.constantize
        record = model.find(@comment.commentable_id)
        return unless record.published?
      end
      Timelines::CreateService.new(@comment, 'Comment', @user.id, nil).perform
    end
  end
end