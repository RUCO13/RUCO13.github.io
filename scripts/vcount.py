import requests

def get_visit_count():
  """Gets the number of visits to the website."""

  # Get the Google Analytics tracking ID.
  tracking_id = 'G-NE33R61XSF'

  # Create a request to the Google Analytics API.
  request = requests.get('https://analytics.google.com/data/v1/ga?ids=' + tracking_id + '&metrics=ga:visits')

  # If the request is successful, get the number of visits from the response.
  if request.status_code == 200:
    response = request.json()
    visit_count = response['rows'][0]['metrics'][0]['value']

  # Otherwise, set the number of visits to 0.
  else:
    visit_count = 0

  # Return the number of visits.
  return visit_count

if __name__ == '__main__':
  # Get the number of visits.
  visit_count = get_visit_count()

  # Print the number of visits.
  print('Number of visits:', visit_count)
