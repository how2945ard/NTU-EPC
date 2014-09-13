class AddImage < ActiveRecord::Migration
  def change
    add_column :articles, :image, :string
  end
end
