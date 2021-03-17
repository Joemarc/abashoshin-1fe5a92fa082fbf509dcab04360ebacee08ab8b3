# frozen_string_literal: true

class User
  class ShowSerializer < ActiveModel::Serializer
    attributes :id, :firstname, :lastname, :avatar,
               :role, :birthdate, :city, :description

    def avatar
      avatar = object.avatar
      return nil unless avatar

      Picture::CompleteSerializer.new(avatar)
    end

    private

    def my_profile?
      current_user.id == object.id
    end
  end
end