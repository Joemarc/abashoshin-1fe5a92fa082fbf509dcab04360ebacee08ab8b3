class User::ShortUserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :created_at, :city, :birthdate,
             :avatar, :role

  def avatar
    avatar = object.avatar
    return nil unless avatar

    Picture::CompleteSerializer.new(avatar)
  end

  def professional?
    current_user&.role == 'professional'
  end

  def lastname
    if is_current_user_applicant? || professionnal_is_premium?
      object&.lastname
    else
      object&.lastname&.chars&.first
    end
  end

  private

  def current_user
    scope
  end
end
