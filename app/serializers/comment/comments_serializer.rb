# frozen_string_literal: true

class Comment
  class CommentsSerializer < ActiveModel::Serializer
    attributes :id, :body, :created_at

#    belongs_to :user, serializer: User::ShortUserSerializer
  end
end