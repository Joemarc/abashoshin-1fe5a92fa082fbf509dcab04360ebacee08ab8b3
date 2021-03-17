class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :name
      t.string :attachment
      t.integer :imageable_id
      t.string :imageable_type
      t.integer :kind

      t.timestamps
    end
  end
end
