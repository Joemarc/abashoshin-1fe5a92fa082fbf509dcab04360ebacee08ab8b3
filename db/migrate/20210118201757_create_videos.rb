class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title
      t.string :file
      t.string :preview
      t.text :content
      t.integer :category
      t.datetime :published_at
      t.integer :status

      t.timestamps
    end
  end
end
