# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tag_one = Tag.create!(name: "One")
tag_two = Tag.create!(name: "Two")

9.times do |i|
  
  task = Task.create(
    name: "Task #{i + 1}",
    description: "Something"
  )
  task.tags << tag_one
  task.tags << tag_two
end


