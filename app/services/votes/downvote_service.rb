# frozen_string_literal: true
module Votes
  # Service to downvote a [Restaurant, Post]
  class DownvoteService
    def initialize(request_params, user)
      @resource = request_params[1]
      @id = request_params[2]
      @user = user
      @votable = find_votable
    end

    def perform
      downvote
      Response::Failure.new(@votable) unless @votable.save
      Response::Success.new(@votable)
    end

    private

    def find_votable
      @resource.singularize.classify.constantize.find(@id)
    end

    def downvote
      @votable.downvote_by @user
      @votable.unliked_by @user unless @votable.vote_registered?
    end
  end
end