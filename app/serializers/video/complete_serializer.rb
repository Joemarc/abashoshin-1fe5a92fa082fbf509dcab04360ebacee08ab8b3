class Video::CompleteSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :status, :published_at, :slug, :preview, :category

  def preview
    return nil unless object.preview

    Picture::CompleteSerializer.new(object.preview)
  end
end