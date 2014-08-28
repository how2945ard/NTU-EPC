class UserController < ApplicationController
	def index
    @users = User.all
    render json: JSON.parse(@users.to_json)
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
    render json: JSON.parse(@user.to_json)
  end

  # GET /users/new
  # GET /users/new.json
  def new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(params[:user])
    if @user.save
      render json: JSON.parse(@user.to_json)
    else
      render json: JSON.parse(@user.errors.to_json)
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      render json: JSON.parse(@user.to_json)
    else
      render json: JSON.parse(@user.errors.to_json)
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: JSON.parse({msg:"success"})
  end
end
