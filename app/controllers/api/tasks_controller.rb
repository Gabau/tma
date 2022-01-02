class Api::TasksController < ApplicationController
  def index
    tasks = Task.all.order(created_at: :desc)
    render json: tasks.to_json(:include => :tags)
  end

  def create
    task = Task.create!(task_params)
    if task
      # create the tags
      if params[:tags] == nil
        render json: { message: 'Successfully created task without tags', task: task, tags: []}
        return
      end
      params[:tags]&.length&.times do |t|
        if Tag.exists?(params[:tags][t][:name])
          # Add tag if it exists
          tag = Tag.find_by(params[:tags][t][:name])
          task.tags << tag
        else
          # Else create the tag
          task.tags.create!(params[:tags][t])
        end  
      end
      render json: { message:  'Successfully created task with tags', task: task, tags: task.tags}
    else
      render json: task.errors
    end
  end

  def edit
    task&.update(task_params)
    # Edit should also update the tags if any


    render json: { message: 'Task updated' }
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

  def tag_query
    if task
      render json: { tags: task.tags }
    else
      render json: task.errors
    end
  end

  private

  def task_params
    params.permit(:name, :description)
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
