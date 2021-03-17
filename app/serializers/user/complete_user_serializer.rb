class User::CompleteUserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :description, :role,
             :birthdate, :city, :is_current_user, :created_at, :pictures

  attribute :email, if: :is_current_user
  attribute :gender, if: :is_current_user
  attribute :phone_number, if: :is_current_user

  has_many :pictures, serializer: Picture::CompleteSerializer

  def is_current_user
    object.id == current_user.id
  end

  def professional?
    object.role == 'professional'
  end

  def aidant?
    object.role == 'aidant'
  end

  def profile_picture_medium
    object.profile_picture :medium
  end

  def profile_picture_mini
    object.profile_picture :mini
  end

  def profile_picture_thumb
    object.profile_picture :thumb
  end

  def avatar
    {
      'thumb': profile_picture_thumb,
      'mini': profile_picture_mini,
      'medium': profile_picture_medium
    }
  end
end
