# API routes extend from this controller
class ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def production?
    Rails.env.production?
  end
end
