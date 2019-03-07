class ActorsController < ApplicationController
  before_action :set_movie, only: [:index, :create]
  before_action :set_actor, only: [:show, :update, :destroy]

  def index
    render json: @movie.actors
  end

  def show
    render json: @actor
  end

  def create
    @actor = @movie.actors.new(actor_params)

    if @actor.save
      render json: @actor
    else
      render_error(@actor)
    end
  end

  def update
    if @actor.update(actor_params)
      render json: @actor
    else
      render_error(@actor)
    end
  end

  def destroy
    @actor.destroy
    render json: { message: 'removed' }, status: :ok
  end

  private
    def set_movie
      @movie = Movie.find(params[:movie_id])
    end

    def set_actor
      @actor = Actor.find(params[:id])
    end

    def actor_params
      params.require(:actor).permit(:name)
    end
end
