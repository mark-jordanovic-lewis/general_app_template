require 'psych'
module ResponseHelpers
  def json_body(response)
    Psych.load(response.body, symbolize_names: true)
  end
end
