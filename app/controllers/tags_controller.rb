class TagsController < ApplicationController
  # GET /tags
  # GET /tags.json
  def index
    @tags = Tag.all
    render json: JSON.parse(@tags.to_json)
  end

  # GET /tags/1
  # GET /tags/1.json
  def show
    @tag = Tag.find(params[:id])
    render json: JSON.parse(@tag.to_json)
  end

  # GET /tags/new
  # GET /tags/new.json
  def new
  end

  # GET /tags/1/edit
  def edit
  end

  # POST /tags
  # POST /tags.json
  def create
    @tag = Tag.new(params[:tag])

    if @tag.save
      render json: JSON.parse(@tag.to_json)
    else
      render json: JSON.parse(@tag.errors.to_json)
    end
  end

  # PUT /tags/1
  # PUT /tags/1.json
  def update
    @tag = Tag.find(params[:id])

    if @tag.update_attributes(params[:tag])
      render json: JSON.parse(@tag.to_json)
    else
      render json: JSON.parse(@tag.errors.to_json)
    end
  end

  # DELETE /tags/1
  # DELETE /tags/1.json
  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    render json: JSON.parse({msg:"success"}.to_json)
  end
end
