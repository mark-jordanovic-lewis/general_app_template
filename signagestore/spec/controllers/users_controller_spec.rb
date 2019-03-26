require 'rails_helper'

describe Api::UsersController, type: :controller do
  before do
    User.create(name: 'Tania', email: 'tanny@yaya.com', password: "123456789")
  end
  context '#create' do
    context 'Correct parameters' do
      it 'allows creation of new user' do
        post :create, params: {
          user: {
            name: 'Barbara',
            email: 'bobby@rara.com',
            password: '1234567489',
            password_confirmation: '1234567489'
          }
        }
        expect(response.code).to eq '201'
      end

      it 'does not allow creation of already existing user' do
        post :create, params: {
          user: {
            name: 'Barbara',
            email: 'tanny@yaya.com',
            password: '1234567489',
            password_confirmation: '1234567489'
          }
        }
        expect(response.code).to eq '422'
      end
    end
    context 'a business user' do
      it 'creates a user and a shop' do
        expect { post :create, params: {
          user: {
            name: 'Barbara',
            email: 'bobby@rara.com',
            password: '1234567489',
            password_confirmation: '1234567489',
            kind: 'business'}
          }
        }.to change { Shop.count }.by 1
        expect(response.code).to eq '201'
      end
    end
  end
end
