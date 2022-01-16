class CreateTagTaskAssociations < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_task_associations, index: false do |t|
      t.belongs_to :task
      t.belongs_to :tag

      t.timestamps
    end
  end
end
