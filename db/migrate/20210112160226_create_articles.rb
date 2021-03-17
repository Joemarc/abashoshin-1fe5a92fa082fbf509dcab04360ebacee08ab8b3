class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.integer :status, default: 0
      t.datetime :published_at
      t.integer :kind
      t.integer :category

      t.timestamps
    end
  end
end
