class CreateEnrolls < ActiveRecord::Migration
  def change
    create_table :enrolls do |t|

      t.timestamps
    end
  end
end
