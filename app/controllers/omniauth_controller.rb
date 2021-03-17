# frozen_string_literal: true

# Override methods from OmniauthCallbacksController from DeviseTokenAuth in
# order to choose which params will be assigned to user during oauth

class OmniauthController < DeviseTokenAuth::OmniauthCallbacksController

  def assign_provider_attrs(user, auth_hash)
    user.firstname ||= auth_hash['info']['first_name']
    user.lastname ||= auth_hash['info']['last_name']
    user.provider ||= auth_hash['provider']
    if user.email.blank? && auth_hash['info']['email'].present?
      user.email = auth_hash['info']['email']
    end
    user.city ||= auth_hash['info']['location'] if auth_hash['info']['location']
    if user.new_record?
      user.gender = case auth_hash['info']['gender']
                    when 'male' then
                      0
                    when 'female' then
                      1
                    else
                      2
                    end
    end

    if user.pictures.count < 1 && !user.id.nil?
      image = auth_hash['info']['image'].gsub('http://', 'https://')
      image_parameters = {
        remote_attachment_url: image,
        kind: :avatar,
        imageable_type: 'User',
        imageable_id: user.id
      }
      parameters = ActionController::Parameters.new(image_parameters)
      Picture.create!(parameters.permit(:remote_attachment_url, :is_profile_picture,
                                        :imageable_type, :imageable_id))
    end

    if birthday = auth_hash['info']['birthday']
      if birthday.count('/') == 2
        user.birthdate = Date.strptime(birthday, '%m/%d/%Y')
      elsif birthday.count('/') == 1
        user.birth_date_to_change = Date.strptime("#{birthday}/1990", '%m/%d/%Y')
      else
        user.birth_date_to_change = Date.strptime("#{birthday}/1990", '%m/%d/%Y')
      end
    end
  end

  def get_resource_from_auth_hash
    # find or create user by provider and provider uid
    @resource = resource_class.unscoped.where(
      uid: auth_hash['uid'],
      provider: auth_hash['provider']
    ).first_or_initialize

    if @resource.new_record? && auth_hash['provider'] == 'facebook'
      already_registered = resource_class.where(email: auth_hash['info']['email'], provider: 'email').first
      if already_registered
        @resource = already_registered
      end
    else
      @resource.update_attributes(deactivated_at: nil)
    end

    if @resource.new_record?
      @oauth_registration = true
      set_random_password
    end

    # sync user info with provider, update/generate auth token
    assign_provider_attrs(@resource, auth_hash)

    extra_params = whitelisted_params
    @resource.assign_attributes(extra_params) if extra_params

    @resource
  end
end