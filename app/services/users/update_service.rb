# frozen_string_literal: true
module Users
  # Service to update a user
  class UpdateService
    def initialize(user, user_params)
      @user = user
      @user_params = user_params
    end

    def perform
      validation = Users::UpdateForm.new(@user_params)
      return Response::Failure.new(validation) unless validation.valid?

      if @user.update_attributes(@user_params)
        Response::Success.new(@user)
      else
        Response::Failure.new(@user)
      end
    end

    private

    def production?
      Rails.env.production?
    end
  end
end