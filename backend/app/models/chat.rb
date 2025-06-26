class Chat < ApplicationRecord
  belongs_to :room
  after_create_commit { broadcast_chat }

  private
  def broadcast_chat
    ActionCable.server.broadcast("ChatChannel_#{room_id}", {
      id: self.id,
      name: self.name,
      body: self.body,
      room_id: self.room_id,
      created_at: self.created_at
    })
  end
end
