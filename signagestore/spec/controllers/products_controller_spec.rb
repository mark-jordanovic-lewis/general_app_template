require 'rails_helper'

describe Api::ProductsController, type: :controller do
  let(:time) { DateTime.now.rfc3339 }
  let(:product_attrs) do
    [
      {name: 'one', image: 'one.png', price: 1},
      {name: 'two', image: 'two.png', price: 2},
      {name: 'three', image: 'three.png', price: 3},
      {name: 'four', image: 'four.png', price: 4},
      {
        name: 'five',
        image: 'five.png',
        price: 5,
        available: 5,
        releasedate: time,
        description: "This is an example description"
      }
    ]
  end

  before do
    product_attrs.each { |attr| Product.create!(attr) }
    Timecop.freeze
  end

  context '#index' do
    it 'supplies a paginated list of products' do
      aggregate_failures do
        response = post :index, params: { paginate: { page: 1, per_page: 2} }
        expect(json_body(response)).to eq [
          {id: 1, name: 'one', image: 'one.png', price: 1},
          {id: 2, name: 'two', image: 'two.png', price: 2}
        ]
        response = post :index, params: { paginate: { page: 2, per_page: 2} }
        expect(json_body(response)).to eq [
          {id: 3, name: 'three', image: 'three.png', price: 3},
          {id: 4, name: 'four', image: 'four.png', price: 4}
        ]
        response = post :index, params: { paginate: { page: 3, per_page: 2} }
        expect(json_body(response)).to eq [
          {id: 5, name: 'five', image: 'five.png', price: 5},
        ]
        response = post :index, params: { paginate: { page: 4, per_page: 2} }
        expect(json_body(response)).to eq []
        response = post :index, params: { paginate: { page: 1, per_page: 5} }
        expect(json_body(response)).to eq [
          {id: 1, name: 'one', image: 'one.png', price: 1},
          {id: 2, name: 'two', image: 'two.png', price: 2},
          {id: 3, name: 'three', image: 'three.png', price: 3},
          {id: 4, name: 'four', image: 'four.png', price: 4},
          {id: 5, name: 'five', image: 'five.png', price: 5}
        ]
      end
    end
  end

  context '#show' do
    it 'supplies the specific product' do
      aggregate_failures do
        response = post :show, params: { product_id: 5 }
        expect(json_body(response)).to eq(
          {
            id: 5,
            name: 'five',
            image: 'five.png',
            price: 5,
            available: 5,
            releasedate: DateTime.parse(time).rfc3339.gsub('+00:00', '.000Z'), # should fix this but fiddly for now
            description: "This is an example description"})
      end
    end
  end
end
