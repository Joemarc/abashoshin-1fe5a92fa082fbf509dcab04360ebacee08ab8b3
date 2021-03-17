class Article::CompleteSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :title, :content, :status,
             :published_at, :comments_count, :category,
             :latest, :slug, :kind, :cover_picture

#  attribute :has_voted

  has_many :pictures, serializer: Picture::CompleteSerializer


  def comments_count
    object.comments&.count
  end

  def latest
    latest = Article.published.where.not(id: object.id).order(published_at: :desc).sample(3)
    latest&.map { |l| Article::ShortSerializer.new(l).as_json }
  end

  def cover_picture
    return nil unless object.cover_picture

    Picture::CompleteSerializer.new(object.cover_picture)
  end

  def category
    if object.category == "schoolABA"
      "ABA à l'école"
    elsif  object.category == "initialFormation"
      'Formation initiale'
    elsif object.category == "documentation"
      'Ressources'
    else
      'Catégorie'
    end
  end
end