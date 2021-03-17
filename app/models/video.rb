class Video < ApplicationRecord
  extend FriendlyId
  mount_uploader :file, VideoUploader
  mount_uploader :preview, PictureUploader

  friendly_id :title, use: :slugged
  after_commit :update_slug, on: :create

  enum status: %i[draft published]
  enum category: { schoolABA: 0, initialFormation: 1, documentation: 2 }

end