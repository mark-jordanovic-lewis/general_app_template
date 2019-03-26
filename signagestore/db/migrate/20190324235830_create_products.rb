class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.string :image
      t.text :description
      t.integer :price
      t.integer :available
      t.timestamp :releasedate

      t.timestamps
    end
  end
end
