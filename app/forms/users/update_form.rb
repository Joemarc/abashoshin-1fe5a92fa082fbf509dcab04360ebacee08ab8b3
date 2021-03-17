# frozen_string_literal: true
module Users
  class UpdateForm
    include ActiveModel::Model
    include ActiveModel::Validations

    attr_accessor :firstname, :lastname, :description, :birthdate,
                  :gender, :city, :address, :zip_code

    validates :firstname, :lastname, :birthdate, :city, presence: true
  end
end
