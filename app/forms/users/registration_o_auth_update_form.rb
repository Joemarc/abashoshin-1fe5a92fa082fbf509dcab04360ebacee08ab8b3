# frozen_string_literal: true

module Users
  class RegistrationOAuthUpdateForm
    include ActiveModel::Model
    include ActiveModel::Validations

    attr_accessor :role, :email

    validates :email, presence: true
  end
end
