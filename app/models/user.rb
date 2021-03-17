# frozen_string_literal: true
class User < ApplicationRecord
  #acts_as_voter

  enum role: %i[professional aidant moderator]
  enum gender: { male: 0, female: 1, other: 2 }
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :omniauthable, :lockable
  include DeviseTokenAuth::Concerns::User

  has_many :pictures, as: :imageable, dependent: :destroy
  has_many :articles, dependent: :destroy
  has_many :comments, as: :commentable

  default_scope -> { where(deactivated_at: nil) }

  def avatar
    pictures.where(kind: 1).first
  end

  def cover_picture
    pictures.where(kind: 3).first
  end

  def deactivate!
    self.deactivated_at = Time.now
  end

  def full_name
    "#{self&.firstname} #{self&.lastname}"
  end

  private

  def production?
    Rails.env.production?
  end

  def ensure_role_wont_change
    if persisted? && role_changed? && !role.nil? && !role_was.nil?
      self.role = role_was
    end
    if persisted? && sign_up_offer_id_changed? && !sign_up_offer_id.nil? && !sign_up_offer_id_was.nil?
      self.sign_up_offer_id = sign_up_offer_id_was
    end
  end

  def provider_email?
    provider == 'email'
  end

  def default_name
    'gwen-doe'
  end
end

