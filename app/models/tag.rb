class Tag < ApplicationRecord
  validates :name, presence: true
  has_many :tag_task_associations
  has_many :tasks, through: :tag_task_associations
end
