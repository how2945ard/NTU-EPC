class ArticlesController < ApplicationController
  http_basic_authenticate_with :name => "admin", :password => "admin", except: [:api_index]
  # GET /articles
  # GET /articles.json
  def index
    @articles = Article.all
    @article = Article.new
    @title = 'NTU EPC - Bulletin'
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end
  def api_index
    @articles = Article.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end

  def show
    @article = Article.find(params[:id])
  end
  # GET /articles/1
  # GET /articles/1.json
  # GET /articles/new
  # GET /articles/new.json

  # GET /articles/1/edit
  def edit
    @title = 'NTU EPC - Bulletin'
    @article = Article.find(params[:id])
    # respond_to do |format|
    #   format.html
    #   format.json { render json: @articles }
    # end
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(params[:article])
    respond_to do |format|
      if @article.save
        format.html { redirect_to articles_url, notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created, location: @article }
      else
        format.html { render action: "new" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /articles/1
  # PUT /articles/1.json
  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to articles_url, notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to articles_url }
      format.json { head :no_content }
    end
  end
end
