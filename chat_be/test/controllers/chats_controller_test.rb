require "test_helper"

class ChatsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @chat = chats(:one)
  end

  test "should get index" do
    get room_chats_url(@chat.room_id), as: :json
    assert_response :success
  end

  test "should create chat" do
    assert_difference("Chat.count") do
      post room_chats_url(@chat.room_id), params: { chat: { body: @chat.body, name: @chat.name, room_id: @chat.room_id } }, as: :json
    end

    assert_response :created
  end
end
