import requests
from bs4 import BeautifulSoup
import pandas as pd

# List of Kenyan news websites (you can add more)
urls = [
    'https://www.standardmedia.co.ke/',
    'https://www.nation.co.ke/',
    'https://www.the-star.co.ke/'
]

# List to hold article data
articles = []

# Function to scrape articles from a given URL
def scrape_articles(url):
    # Send a GET request to the news website
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Scrape titles and links (This will vary depending on the website structure)
    # Example selectors (these will need to be adjusted based on actual HTML structure of the site)
    titles = soup.find_all('h2')  # Look for 'h2' tags for article titles
    
    # Loop through each title and extract information
    for title in titles:
        article_title = title.get_text(strip=True)
        article_link = title.find('a')['href'] if title.find('a') else None
        
        # Check if there's a link to the article and then scrape the article content
        if article_link:
            article_url = article_link if article_link.startswith('http') else url + article_link
            article_response = requests.get(article_url)
            article_soup = BeautifulSoup(article_response.content, 'html.parser')
            
            # Example: Assuming the article content is in a div with class 'article-content'
            article_text = article_soup.find('div', class_='article-content')
            if article_text:
                article_text = article_text.get_text(strip=True)
            else:
                article_text = "No article content available."
            
            # Save the article details to the list
            articles.append([article_title, article_text, 'General'])  # You can add appropriate labels here

# Scrape from each URL
for url in urls:
    scrape_articles(url)

# Convert the data to a DataFrame
df = pd.DataFrame(articles, columns=['Title', 'Text', 'Label'])

# Save the DataFrame to a CSV file
df.to_csv('kenyan_news.csv', index=False)

print("Scraping completed and data saved to 'kenyan_news.csv'")
