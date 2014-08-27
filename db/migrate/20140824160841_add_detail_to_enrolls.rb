class AddDetailToEnrolls < ActiveRecord::Migration
	def change
		add_column :enrolls, :name, :string
		add_column :enrolls, :school, :string
		add_column :enrolls, :major, :string
		add_column :enrolls, :year, :integer
		add_column :enrolls, :cellphone, :string
		add_column :enrolls, :email, :string
		add_column :enrolls, :image, :string
		add_column :enrolls, :videoUrl, :string
		add_column :enrolls, :videoInfo, :string
		add_column :enrolls, :topic, :string
		add_column :enrolls, :view, :integer
	end
end
