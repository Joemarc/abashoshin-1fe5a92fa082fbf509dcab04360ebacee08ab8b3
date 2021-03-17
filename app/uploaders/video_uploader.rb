class VideoUploader < CarrierWave::Uploader::Base
  require 'streamio-ffmpeg'
  include CarrierWave::Video

  process encode_video: [:mp4 ]

  version :rescaled do
    process :encode
  end



  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

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

  def encode
    movie = ::FFMPEG::Movie.new(current_path)
    tmp_path = File.join( File.dirname(current_path),   "tmpfile.mp4" )
    options = ""
    movie.transcode(tmp_path, options)
    File.rename tmp_path, current_path
  end
end