class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.text :tags, array: true, default: []
      t.timestamps
    end
  end
end
