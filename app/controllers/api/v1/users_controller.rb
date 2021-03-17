class Api::V1::UsersController < ActionController::Base
  before_action :authenticate_user!

  def show
    user = User.find(params[:id])

    render json: user, serializer: User::ShowSerializer
  end

  def update
    if params[:id].to_i == current_user.id
      current_user.update_attributes(user_params)
      render json: current_user, serializer: User::CompleteUserSerializer
    else
      render nothing: true, status: :forbidden
    end
  end

  def update_me
    user = Users::UpdateService.new(current_user, user_params).perform

    if user.success?
      render json: user.data, serializer: User::EditSerializer
    else
      render_json_errors(user.data)
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head 204
  end

  def me
    render json: current_user, serializer: User::CompleteUserSerializer
  end

  def edit
    edit = Users::EditService.new(params[:id], current_user).perform
    return unless edit.success?

    render json: edit.data, serializer: User::EditSerializer

  end


  def registration_oauth_update
    oauth_update = Users::RegistrationOAuthUpdateService.new(current_user, oauth_user_params).perform

    if oauth_update.success?
      render_ok
    else
      render_json_errors(oauth_update.data)
    end
  end

  def info_for_edit
    info = Users::InfoForEditService.new(current_user).perform

    if info.success?
      render json: info.data
    else
      render_json_errors(info.data)
    end
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :city, :description,
                                 :birth_date, :gender, :phone_number,
                                 { employment_ids: [] }, { skill_ids: [] },
                                 { language_ids: [] }, :availability, :siret,
                                 pay_attributes: %i[amount kind periodicity])
  end

  def oauth_user_params
    params.require(:user).permit(:email, :role)
  end
end
