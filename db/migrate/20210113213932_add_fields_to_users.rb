class AddFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :city, :string
    add_column :users, :zip_code, :string
    add_column :users, :address, :string
    add_column :users, :gender, :integer
    add_column :users, :description, :text
    add_column :users, :role, :integer
  end
end
