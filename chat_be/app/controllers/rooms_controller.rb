class RoomsController < ApplicationController
  # GET /rooms
  def index
    @rooms = Room.all

    render json: @rooms
  end

  # POST /rooms
  def create
    @room = Room.new(room_params)

    if @room.save
      render json: @room, status: :created
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def room_params
      params.require(:room).permit(:name)
    end
end
