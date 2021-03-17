# Picture model : users and restaurants can have many pictures
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
  before_destroy :destroy_assets

  enum kind: { profile: 0, avatar: 1, cover: 2 }

  mount_uploader :attachment, PictureUploader

  def destroy_assets
    attachment&.remove!
    save!
  end
end
