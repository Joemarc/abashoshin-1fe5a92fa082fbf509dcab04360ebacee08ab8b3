# frozen_string_literal: true

module Comments
  # Service list job applications of a single offer
  class IndexService

    def initialize(request_params, user, page_number)
      @resource = request_params[1]
      @id = request_params[2]
      @user = user
      @page_number = page_number
    end

    def perform
      Response::Success.new(comments)
    end

    private

    def comments
      find_record.comments
    end

    def find_record
      @resource.singularize.classify.constantize.find(@id)
    end
  end
end