[
  {name: 'Buy Me', price: 500, image: 'A shiny gif', available: 10, description: "This product will change your life in a unusual and unanticipated way, apply with caution."},
  {name: 'Buy Her', price: 500, image: 'A shiny JPEG', available: 10, description: "This product will change your life in a unusual and unanticipated way, apply with caution."},
  {name: 'Buy You', price: 500, image: 'A shiny jpg', available: 10, description: "This product will change your life in a unusual and unanticipated way, apply with caution."},
  {name: 'Buy It', price: 500, image: 'A shiny bmp', available: 10, description: "This product will change your life in a unusual and unanticipated way, apply with caution."},
  {name: 'Buy Him', price: 500, image: 'A shiny png', available: 10, description: "This product will change your life in a unusual and unanticipated way, apply with caution."},
  {name: 'Buy That', price: 500, image: 'A shiny pdf', available: 10, description: "This product will change your life in a unusual and unanticipated way, apply with caution."}
].each { |attr| Product.create!(attr) }
