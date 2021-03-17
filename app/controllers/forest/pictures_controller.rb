class Forest::PicturesController < ForestLiana::ApplicationController
  def delete_picture
    picture_id = params.dig("data", "attributes", "ids").first
    picture = Picture.find(picture_id)
    picture.delete
  end
end
