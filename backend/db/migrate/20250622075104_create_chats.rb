class CreateChats < ActiveRecord::Migration[8.0]
  def change
    create_table :chats do |t|
      t.string :name
      t.text :body
      t.references :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
