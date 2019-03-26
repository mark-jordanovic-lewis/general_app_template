class Shop < ApplicationRecord
  belongs_to :user
  has_many :products
  alias :owner :user
end
