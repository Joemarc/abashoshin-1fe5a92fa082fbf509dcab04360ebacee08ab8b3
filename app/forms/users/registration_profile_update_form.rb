# frozen_string_literal: true

module Users
  class RegistrationProfileUpdateForm
    include ActiveModel::Model
    include ActiveModel::Validations

    attr_accessor :city, :phone_number, :gender, :birth_date, :siret

    validates :city, :phone_number, :gender, :birth_date, presence: true
  end
end
