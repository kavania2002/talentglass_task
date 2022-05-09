import sys
from bs4 import BeautifulSoup
import requests
import re
import json

prefix_url = 'https://www.imdb.com'

def fetch_data_each_movie(url):
    response = requests.get(url)
    html_data = BeautifulSoup(response.text, 'lxml')    

    summary = html_data.find('span', class_='sc-16ede01-2 gXUyNh').get_text()
    genres_data = html_data.find_all('li', class_='ipc-inline-list__item ipc-chip__text')
    genres = []
    for i in genres_data:
        if (str(i.get_text())[0].isupper()):
            genres.append(i.get_text())
        else:
            break

    duration_parent = html_data.find('ul', class_='ipc-inline-list ipc-inline-list--show-dividers sc-8c396aa2-0 kqWovI baseAlt')
    lis = duration_parent.find_all('li')
    duration = lis[2].get_text()
    
    return (summary, duration, genres)

def fetch_data(chart_url , items_count):
    response = requests.get(chart_url)
    soupData = BeautifulSoup(response.text, 'lxml')

    # All required attributes for each movie
    titles = soupData.find_all('td', class_='titleColumn')
    ratings = soupData.find_all('td', class_='ratingColumn imdbRating')

    result = []
    for i in range(items_count):
        year = titles[i].span.get_text()[1:5]

        link = titles[i].a['href']
        detailed_data = fetch_data_each_movie(prefix_url + link)
        
        item = {
            'title' : titles[i].a.get_text(),
            'movie_release_year' : year,
            'imdb_rating' : ratings[i].strong.get_text(),
            'summary' : detailed_data[0],
            'duration':detailed_data[1],
            'genre':','.join(detailed_data[2])
        }
        result.append(json.dumps(item))

    print(result)

if __name__ == '__main__':
    fetch_data(sys.argv[1], int(sys.argv[2]))