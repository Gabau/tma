class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :description, default: ""

      t.timestamps
    end
    # Enforce unique name
    add_index :tags, :name, unique: true
  end

  
end
