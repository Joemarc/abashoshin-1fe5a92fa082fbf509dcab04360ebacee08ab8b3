class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  skip_before_action :verify_authenticity_token, raise: false
  before_action :configure_permitted_parameters, if: :devise_controller?

  def production?
    Rails.env.production?
  end

  def shoshin_url
    Rails.configuration.x.shoshin_url
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up,
                                      keys: %i[role terms_of_service
                                             sign_up_offer_id firstname
                                             lastname])
  end

  def page_number
    @page ||= params[:page] || 1
  end

  # Handle all standard errors

  def render_ok
    render nothing: true, status: 200
  end

  def render_forbidden
    render nothing: true, status: 403
  end

  def render_bad_request
    render nothing: true, status: 400
  end

  def render_no_more_credits
    render json: { errors: 'No more credits' }, status: 403
  end

  def render_json_errors(object)
    render json: { errors: object.errors.messages,
                   error_codes: error_details(object) }, status: 422
  end

  def error_details(object)
    errors = []
    # Underscore for converting namespaces properly for the front
    # e.g: "Users::CreateForm" -> 'users.create_form'
    klass = object.class.to_s.underscore.tr('/', '.')
    object.errors.details.each do |field, values|
      values.each do |value|
        errors << { error: "#{klass}.#{field}.#{value[:error]}",
                    parameters: {} }
      end
    end
    errors
  end

  def render_not_found
    render nothing: true, status: 404
  end
end
