require 'rails_helper'

describe Api::ShopsController, type: :controller do
  let(:user){ User.create(name: 'Alex', email: 'Al@ix.com', password: '123564987', kind: 'business' ) }

  context 'shops may be updated by their owner' do
    it 'returns the new shop' do
      sign_in user
      post :update, params: { name: "new name", id: user.shop.id}
    end
  end
end
