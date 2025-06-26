class ChatsController < ApplicationController
  before_action :set_room

  # GET /chats
  def index
    @chats = @room.chats

    render json: @chats
  end

  # POST /chats
  def create
    @chat = @room.chats.new(chat_params)

    if @chat.save
      render json: @chat, status: :created
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room
      @room = Room.find(params[:room_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Room not found" }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def chat_params
      params.require(:chat).permit(:name, :body)
    end
end
