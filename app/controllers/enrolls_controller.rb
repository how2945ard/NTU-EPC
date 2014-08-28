class EnrollsController < ApplicationController
  # GET /enrolls
  # GET /enrolls.json
  def index
    @enrolls = Enroll.all
    render json: JSON.parse(@enrolls.to_json)
  end

  # GET /enrolls/1
  # GET /enrolls/1.json
  def show
    @enroll = Enroll.find(params[:id])
    render json: JSON.parse(@enroll.to_json)
  end

  # GET /enrolls/new
  # GET /enrolls/new.json
  def new
  end

  # GET /enrolls/1/edit
  def edit
  end

  # POST /enrolls
  # POST /enrolls.json
  def create
    @enroll = Enroll.new(params[:enroll])
    if @enroll.save
      render json: JSON.parse(@enroll.to_json)
    else
      render json: JSON.parse(@enroll.errors.to_json)
    end
  end

  # PUT /enrolls/1
  # PUT /enrolls/1.json
  def update
    @enroll = Enroll.find(params[:id])
    if @enroll.update_attributes(params[:enroll])
      render json: JSON.parse(@enroll.to_json)
    else
      render json: JSON.parse(@enroll.errors.to_json)
    end
  end

  # DELETE /enrolls/1
  # DELETE /enrolls/1.json
  def destroy
    @enroll = Enroll.find(params[:id])
    @enroll.destroy
    render json: JSON.parse({msg:"success"}.to_json)
  end
end
