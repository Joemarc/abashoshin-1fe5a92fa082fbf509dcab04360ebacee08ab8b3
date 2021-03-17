class PictureUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick # <- Notice this
  # include CarrierWaveDirect::Uploader

  # validate :validate_pictures_count
  # include CarrierWave::MimeTypes
  # # process :set_content_type

  version :mini do
    process resize_to_fit: [60, nil], if: :portrait?
    process resize_to_fit: [nil, 60], if: :landscape?
  end

  version :thumb do
    process resize_to_fit: [120, nil], if: :portrait?
    process resize_to_fit: [nil, 120], if: :landscape?
  end

  version :medium do
    process resize_to_fit: [180, nil], if: :portrait?
    process resize_to_fit: [nil, 180], if: :landscape?
  end

  version :normal do
    process resize_to_fit: [300, nil], if: :portrait?
    process resize_to_fit: [nil, 1000], if: :landscape?
  end

  version :large do
    process resize_to_fit: [400, 1400], if: :landscape?
  end

  def landscape?(picture)
    image = MiniMagick::Image.open(picture.path)
    image[:width] > image[:height]
  end

  def portrait?(picture)
    image = MiniMagick::Image.open(picture.path)
    image[:width] < image[:height]
  end

  def fix_exif_rotation # this is my attempted solution
    manipulate! do |img|
      img.tap(&:auto_orient)
    end
  end


  process :fix_exif_rotation

  # Choose what kind of storage to use for this uploader:
  # storage :file
  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_whitelist
    %w[jpg jpeg gif png pdf]
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   ".jpg" if original_filename
  # end

  def filename
    if original_filename
      "#{secure_token}.#{file.extension}" if original_filename.present?
    elsif model && model.read_attribute(:picture).present? #or whatever you call your column
      model.read_attribute(:picture)
    end
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) || model.instance_variable_set(var, SecureRandom.uuid)
  end
end
