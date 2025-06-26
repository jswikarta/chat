class Room < ApplicationRecord
  has_many :chats
  after_create_commit { broadcast_room }

  private
  def broadcast_room
    ActionCable.server.broadcast("RoomChannel", {
      id: self.id,
      name: self.name
    })
  end
end
