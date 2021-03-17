class PasswordsController < DeviseTokenAuth::PasswordsController
  def update
    if @resource
      @resource.allow_password_change = true
    end
    super
  end
end