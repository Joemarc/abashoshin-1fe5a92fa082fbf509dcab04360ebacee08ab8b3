# frozen_string_literal: true
module Visits
  # Service to create a article
  class CreateService
    def initialize(record, user)
      @visitable = record
      @user = user
    end

    def perform
      create_visit
      Response::Failure.new(@visitable) unless @visitable.save
      Response::Success.new(@visitable)
    end

    private

    def create_visit 
      existing_visit = Visit.where(visitor: @user, visitable: @visitable).last
      if !(existing_visit && existing_visit.created_at > 1.hour.ago)
        @visitable.visits.create(visitor: @user)
      end
    end
  end
end