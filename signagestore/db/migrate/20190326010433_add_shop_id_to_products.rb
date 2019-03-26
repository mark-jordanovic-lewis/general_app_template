class AddShopIdToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :shop_id, :integer
    add_foreign_key :products, :shops, column: :shop_id
  end
end
