class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def strip_html_tags(column)
    ActionController::Base.helpers.strip_tags(column)
  end
end
