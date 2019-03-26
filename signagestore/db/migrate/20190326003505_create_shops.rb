class CreateShops < ActiveRecord::Migration[5.2]
  def change
    create_table :shops do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.string :slug

      t.timestamps
    end
  end
end
