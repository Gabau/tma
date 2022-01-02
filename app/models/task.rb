class Task < ApplicationRecord
  validates :name, presence: true
  has_many :tag_task_associations
  has_many :tags, through: :tag_task_associations
end
