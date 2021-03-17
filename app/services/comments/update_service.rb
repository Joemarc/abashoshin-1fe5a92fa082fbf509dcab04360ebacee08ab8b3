# frozen_string_literal: true

module Comments
  # Service to update a comment on a article
  class UpdateService

    def initialize(comment, comment_params, user)
      @comment = comment
      @comment_params = comment_params
      @user = user
    end

    def perform

      return Response::Failure.new(@comment) unless @comment.valid?

      if @comment.update_attributes(@comment_params)
        Response::Success.new(@comment)
      else
        Response::Failure.new(@comment)
      end
    end
  end
end