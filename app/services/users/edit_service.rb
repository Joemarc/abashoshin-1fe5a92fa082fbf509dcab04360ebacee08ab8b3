# frozen_string_literal: true

module Users
  # Service to update a user
  class EditService
    def initialize(user_id, current_user)
      @user = User.friendly.find(user_id)
      @current_user = current_user
    end

    def perform
      raise AccessDenied unless @user.id == @current_user.id

      Response::Success.new(@user)
    end
  end
end