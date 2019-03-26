# frozen_string_literal: true

class User < ActiveRecord::Base
  # more devise modules - :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :email, presence: true
  validates_uniqueness_of :email
  enum kind: %i[admin customer business]

  has_one :shop

  after_create :build_shop

  private

  def build_shop
    Shop.create!(user: self) if kind == 'business'
  end
end
