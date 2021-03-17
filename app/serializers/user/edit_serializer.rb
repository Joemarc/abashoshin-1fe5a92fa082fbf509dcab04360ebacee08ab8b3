class User
  class EditSerializer < ActiveModel::Serializer
    attributes :id, :firstname, :lastname, :description,
               :birthdate, :city, :avatar, :role

    def avatar
      avatar = object.avatar
      return nil unless avatar

      Picture::CompleteSerializer.new(avatar)
    end
  end
end