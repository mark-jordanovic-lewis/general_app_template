# frozen_string_literal: true

class User < ActiveRecord::Base
  # more devise modules - :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  USERDETAILS
end
