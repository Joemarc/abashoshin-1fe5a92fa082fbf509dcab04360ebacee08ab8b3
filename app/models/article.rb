class Article < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  enum status: %i[draft published]
  enum kind: { headline: 0, hot_topic: 1 }
  enum category: { schoolABA: 0, initialFormation: 1, documentation: 2 }

#  acts_as_votable

  after_commit :update_slug, on: :create

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :pictures, as: :imageable, dependent: :destroy
#has_many :visits, as: :visitable

# has_many :article_categories, dependent: :destroy
#accepts_nested_attributes_for :article_categories, allow_destroy: true
#has_many :categories, through: :article_categories


#has_many :timelines, as: :timelinable, dependent: :destroy

  scope :empty_articles, -> { where('updated_at = created_at') }

  def cover_picture
    pictures.where(kind: 2).first
  end

  def should_generate_new_friendly_id?
    slug.nil? || title_changed?
  end

  def normalize_friendly_id(text)
    text.gsub! %r{/\//}, '-'
    super
  end


  def update_slug
    return if ((slug.include? id.to_s) && !slug.nil?) || slug_changed? ||
      ((slug == slug_was) && !slug.nil?)

    self.slug = nil
    save
  end
end

