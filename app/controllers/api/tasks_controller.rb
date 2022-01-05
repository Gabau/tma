class Api::TasksController < ApplicationController
  def index
    tasks = Task.all.order(created_at: :desc)
    render json: tasks.to_json(:include => :tags)
  end

  # Create takes in the following JSON body
  # { 
  #   name: ${name},
  #   description: ${description},
  #   tags: ${array_of_tags} (just the names)
  # } 
  # Renders a json containing the message and the created task
  # 

  def create
    task = Task.create!(task_params)
    if task
      # create the tags
      tag_params = params.permit(:tags => [:name])
      if tag_params[:tags] == nil
        render json: { message: 'Successfully created task without tags', task: task.to_json(:include => :tags)}
        return
      end
      tag_params[:tags]&.length&.times do |t|
        if Tag.exists?(tag_params[:tags][t][:name])
          # Add tag if it exists
          tag = Tag.find_by(tag_params[:tags][t][:name])
          task.tags << tag
        else
          # Else create the tag
          task.tags.create!(tag_params[:tags][t])
        end  
      end
      render json: { message:  'Successfully created task with tags', task: task, tags: task.tags}
    else
      render json: task.errors
    end
  end


  # Edit takes in the following params.
  # { 
  #   ${TASK_ATTRIBUTES},
  #   deleted_tags: ${ARRAY_OF_DELETED_TAGS} 
  #   added_tags: ${ARRAY_OF_CREATED_TAGS} 
  # }
  # And renders the message, and the task after edit.
  #

  def edit
    task&.update(task_params)
    # Edit should also update the tags if any
    # Add tags
    tag_params = params.permit(:id, :added_tags => [:name, :description], :deleted_tags => [:id, :name, :description])  
    tag_params[:added_tags]&.length&.times do |t|
      if Tag.exists?(name: tag_params[:added_tags][t][:name])
        # Add tag if it exists
        tag = Tag.find_by(name: tag_params[:added_tags][t][:name])
        task.tags << tag
      else
        # Else create the tag
        tag = Tag.create!(tag_params[:added_tags][t])
        task.tags << tag
      end
    end

    # Delete tags
    tag_params[:deleted_tags]&.length&.times do |t|
      tag = Tag.find_by(id: tag_params[:deleted_tags][t][:id])
      task&.tags.delete(tag)
    end

    render json: task.to_json(:include => :tags)
  end

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def destroy
    task&.destroy
    render json: { message: 'Task deleted' }
  end



  private

  def task_params
    params.permit(:name, :description)
  end


  def task
    @task ||= Task.find(params[:id])
  end

  # params[hash] is the array of tags to add.
  def add_tag(t, hash)
    if Tag.exists?(params[hash][t][:name])
      # Add tag if it exists
      tag = Tag.find_by(params[hash][t][:name])
      task.tags << tag
    else
      # Else create the tag
      task.tags.create!(params[hash][t])
    end
  end
end
