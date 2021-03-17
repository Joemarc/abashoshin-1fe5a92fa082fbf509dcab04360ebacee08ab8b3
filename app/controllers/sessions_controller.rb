class SessionsController < DeviseTokenAuth::SessionsController
  def create
    User.unscoped.where(email: params[:email], provider: 'email').update_all(deactivated_at: nil)
    super
  end
end