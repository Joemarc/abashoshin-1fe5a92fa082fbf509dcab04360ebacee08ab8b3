# frozen_string_literal: true
class Article::ShortSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :status,
             :published_at, :cover_picture,
             :comments_count, :slug, :kind, :category

  def comments_count
    object.comments&.count
  end

  def content
    object.strip_html_tags(object.content)&.first(150)
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
