# frozen_string_literal: true

module Users
  # Service to index job offers
  class InfoForEditService
    def initialize(user)
      @user = user
    end

    def perform
      Response::Success.new(user_edit_info)
    end

    private

    def user_edit_info
      { attributes: user_attributes }
    end

    def user_attributes
      employments = Employment.all.sort_by { |e| I18n.transliterate e.french_name }
      skills = Skill.all.sort_by { |s| I18n.transliterate s.french_name }
      languages = Language.all.sort_by { |l| I18n.transliterate l.french_name }
      availabilities = User.availabilities.map do |a, value|
        {
          french_name: I18n.t("activerecord.attributes.user.availability.#{a}", locale: :fr),
          id: value
        }
      end

      {
        employments: employments.as_json(only: %i[id french_name]),
        skills: skills.as_json(only: %i[id french_name]),
        languages: languages.as_json(only: %i[id french_name]),
        availabilities: availabilities
      }
    end
  end
end
