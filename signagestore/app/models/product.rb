class Product < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true

  def purchase
    available > 0 && update(available: available - 1)
  end
end
