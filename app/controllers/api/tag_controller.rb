class Api::TagController < ApplicationController
  def index
    tags = Tag.all.order(created_at: :desc)
    render json: tags
  end

  def create
    tag = Tag.create!(tag_params)    
    if tag
      render json: tag
    else
      render json: { message: tag.errors }
    end
  end

  def show
    tag = Tag.find(params[:id])
    if tag
      render json: tag
    else
      render json: { message: tag.errors }
    end
  end

  def destroy
    tag&.destroy
    render json: { message: 'Tag deleted' }
  end
  

  private

  def tag_params
    params.permit(:name, :description)
  end

  def tag
    @tag ||= Tag.find(params[:id])
  end

end
