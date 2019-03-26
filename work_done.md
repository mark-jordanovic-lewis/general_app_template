## Description of steps to build signagestore
### Task
Look at `Now Signage Programming Challenge.pdf`.
- Build basic store
  - Three User types: [ admin, customer, business ]
  - User to search and buy products
  - Business to upload products
- Stock level tracking - Tracking the quantity of ​ Product​ (s) available?
  - Shopping basket functionality - customers can add a ​ Product​ to a ​ Basket?
  - Mailers - if a new ​ Product​ is added, does the ​ Store​ send an ​ Email​ ?
- We're not expecting a gorgeous UI, don't spend much time on CSS.
- Products should include:
  - Descriptions
  - Pictures (going in assets but should go to s3)
  - Prices


### Planning
##### Models
- User
  - all the devise goodness
  - type: enum [ admin, customer, owner ]
- Product
  - name: varchar(50)
  - image: url string
  - description: text
  - price: integer (in pence, divide by 10 to get in pounds)
  - available: integer (number in stock)
  - releasedate: timestamp (expected time of arrival in shop)
- Transaction
  - state: enum [ in_cart, paid, en_route, complete ] # poss remove en_route
  - user
  - store
  - products
- Store
  - name
  - products
  - owner

##### Relations
- A Store:
  - has_one :owner, class_name: User
  - has_many :transactions
  - has_many :products

- User
  - A customer:
      - has_many :transactions
    - A business:
      - has_one :store
      - has_many :transactions

- Transaction:
  - belongs_to :user
  - belongs_to :store
  - has_many :products, through: :cart_item

- CartItem
  - belongs_to :product
  - belongs_to :transaction

- Product
  - belongs_to :store
  - has_many :purchases, class_name: 'CartItem'

##### angular
- landing page with signin menu
  - search (available to users)
  - store carousel
- customer pages
  - profile management
  - purchases
- business page
  - profile management
  - shop management
  - purchases

##### rails
- pure API
- add active admin for admin users?

##### nginx
- reverse proxy to both angular and rails apps
- logging all the ingress


### Building The APP
#### Products
- Frontend
  - Product Models
    - IndexViewProduct - tik
    - ShowViewProduct  - tik
  - Landing page
    - Shows all Products
  - Product page
    - Product details
    - Buy product
  - Login to buy state
- Backend
  - Product model
  - Seed for products
  - Product controller
    - index  (serves IndexViewProduct json)
    - show   (serves ShowViewProduct json)
