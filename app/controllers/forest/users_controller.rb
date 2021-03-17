class Forest::UsersController < ForestLiana::ApplicationController
  def lock
    user_id = params.dig('data', 'filters', 'ids').first
    User.update(user_id, locked_at: Date.today)

    render json: { success: 'User locked from app' }
  end
end