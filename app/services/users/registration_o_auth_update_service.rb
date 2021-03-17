# frozen_string_literal: true

module Users
  # Service to update a user
  class RegistrationOAuthUpdateService
    def initialize(user, user_params)
      @user = user
      @user_params = user_params
    end

    def perform
      return Response::Failure.new(@user) if role_already_exists?

      validation = Users::RegistrationOAuthUpdateForm.new(@user_params)
      return Response::Failure.new(validation) unless validation.valid?

      if @user.update_attributes(@user_params)
        send_reminders
        Response::Success.new(@user)
      else
        Response::Failure.new(@user)
      end
    end

    private

    def role_already_exists?
      if !@user.role.nil? && @user_params[:role].present?
        @user.errors.add(:base, :already_has_role)
      end
      @user.errors.include?(:base)
    end

    def send_reminders
      if @user.professional?
        Reminders::RestaurantReminderJob.set(wait: 24.hours).perform_later(@user)
        Reminders::RestaurantReminderJob.set(wait: 72.hours).perform_later(@user)
        HubspotTasks::CreateOrUpdateContactJob.set(wait: 2.seconds).perform_later(@user) if production?
      elsif @user.applicant?
        Reminders::ApplicantJobApplicationReminderJob.set(wait: 24.hours).perform_later(@user)
      end
    end

    def production?
      Rails.env.production?
    end
  end
end