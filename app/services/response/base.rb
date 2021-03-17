# frozen_string_literal: true

module Response
  class Base
    attr_reader :data

    def initialize(data = {})
      @data = data
    end

    def success?
      self.class.name == 'Response::Success'
    end
  end
end