class Video::ShortSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :status, :published_at, :preview, :slug, :category

end
