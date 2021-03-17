class Picture::CompleteSerializer < ActiveModel::Serializer
  attributes :id, :original, :mini, :thumb, :medium, :normal, :large, :kind, :imageable_type

  def original
    object.attachment.url
  end

  def mini
    object.attachment.url :mini
  end

  def thumb
    object.attachment.url :thumb
  end

  def medium
    object.attachment.url :medium
  end

  def normal
    object.attachment.url :normal
  end

  def large
    object.attachment.url :large
  end
end