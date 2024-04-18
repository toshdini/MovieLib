from sqlite3 import Cursor
import requests
from django.db import connection

# API details
API_KEY = '8b76ff1a2bbd88072cc966292315c565'
BASE_URL = 'https://api.themoviedb.org/3'

def search_movies_api(search_term):
    try:
        url = f"{BASE_URL}/search/movie?api_key={API_KEY}&query={search_term}"
        response = requests.get(url)
        if response.status_code == 200:
            results = response.json().get('results', [])
            for movie in results:
                movie_id = movie['id']
                image_url = f"{BASE_URL}/movie/{movie_id}/images?api_key={API_KEY}"
                image_response = requests.get(image_url)
                if image_response.status_code == 200:
                    images = image_response.json()
                    posters = [img['file_path'] for img in images.get('posters', [])]
                    movie['poster'] = posters[0] if posters else None
            return results
        else:
            print("Error: Unable to fetch movies from the API.")
            return []
    except Exception as e:
        print(f"Error searching movies in API: {e}")
        return []

def get_movie_by_id(movie_id):
    try:
        url = f"{BASE_URL}/movie/{movie_id}?api_key={API_KEY}"
        response = requests.get(url)
        if response.status_code == 200:
            movie = response.json()
            image_url = f"{BASE_URL}/movie/{movie_id}/images?api_key={API_KEY}"
            image_response = requests.get(image_url)
            if image_response.status_code == 200:
                images = image_response.json()
                posters = [img['file_path'] for img in images.get('posters', [])]
                movie['poster'] = posters[0] if posters else None
            return movie
        else:
            print(f"Error: Unable to fetch movie with id {movie_id} from the API.")
            return None
    except Exception as e:
        print(f"Error fetching movie from API: {e}")
        return None

# USER MANAGEMENT
def add_user(username):
    try:
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO Users (username) VALUES (?)", (username,))
            print(f"User '{username}' added.")
            return True
    except Exception as e:
        print(f"Error adding user to database: {e}")
        return False

def delete_user(username):
    try:
        # Check if the user exists
        Cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
        existing_user = Cursor.fetchone()

        if not existing_user:
            print(f"User '{username}' does not exist.")
            return False

        # Delete user from the database
        Cursor.execute("DELETE FROM Users WHERE username = ?", (username,))
        connection.commit()
        
        # Delete associated watchlist entries for the user
        Cursor.execute("DELETE FROM Watchlist WHERE user_id = ?", (existing_user[0],))
        connection.commit()

        print(f"User '{username}' deleted.")
        return True
    except Exception as e:
        print(f"Error deleting user: {e}")
        return False

def all_users():
    try:
        Cursor.execute("SELECT * FROM Users")
        return Cursor.fetchall()
    except Exception as e:
        print(f"Error fetching users from database: {e}")
        return []

# WATCHLIST MANAGEMENT
def add_movie_to_watchlist(username, movie_id):
    try:
        # Ensure movie_id is converted to integer
        movie_id = int(movie_id)
        
        with connection.cursor() as cursor:
            # Check if the movie is already in the watchlist for the user
            cursor.execute("SELECT * FROM Watchlist WHERE user_id = (SELECT id FROM Users WHERE username = ?) AND movie_id = ?", (username, movie_id))
            existing_entry = cursor.fetchone()

            if existing_entry:
                print(f"Movie with ID '{movie_id}' already exists in the watchlist.")
                return False

            # Retrieve movie details using movie ID from the API
            movie_details = get_movie_by_id(movie_id)
            if not movie_details:
                print(f"Movie with ID '{movie_id}' not found.")
                return False

            movie_title = movie_details.get('title', '')
            release_date = movie_details.get('release_date', '')
            adult = movie_details.get('adult', False)
            vote_average = movie_details.get('vote_average', 0.0)
            overview = movie_details.get('overview', '')

            # Print out values before executing the SQL query
            print(f"Adding movie to watchlist:\n"
                  f"Username: {username}\n"
                  f"Movie ID: {movie_id}\n"
                  f"Movie Title: {movie_title}\n"
                  f"Release Date: {release_date}\n"
                  f"Adult: {adult}\n"
                  f"Vote Average: {vote_average}\n"
                  f"Overview: {overview}")

            # Add movie details to the watchlist
            cursor.execute("INSERT INTO Watchlist (user_id, movie_id, movie_title, release_date, adult, vote_average, overview) VALUES ((SELECT id FROM Users WHERE username = ?), ?, ?, ?, ?, ?, ?)",
                (username, movie_id, movie_title, release_date, adult, vote_average, overview))

            connection.commit()
            print(f"Movie '{movie_title}' added to the watchlist.")
            return True
    except Exception as e:
        print(f"Error adding movie to watchlist: {e}")
        return False


def user_exists(username):
    try:
        Cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
        existing_user = Cursor.fetchone()
        return existing_user is not None
    except Exception as e:
        print(f"Error checking if user exists: {e}")
        return False

def remove_movie_from_watchlist(username, movie_name):
    try:
        Cursor.execute("SELECT id FROM Users WHERE username = ?", (username,))
        user_id = Cursor.fetchone()

        if user_id is None:
            print(f"User '{username}' does not exist.")
            return False

        # Remove movie from watchlist
        Cursor.execute("DELETE FROM Watchlist WHERE user_id = ? AND movie_name = ?", (user_id[0], movie_name))
        connection.commit()
        print(f"Movie '{movie_name}' removed from the watchlist.")
        return True
    except Exception as e:
        print(f"Error removing movie from watchlist: {e}")
        return False

def movie_exists_in_watchlist(username, movie_name):
    try:
        # Check if the user exists
        Cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
        existing_user = Cursor.fetchone()

        if not existing_user:
            print(f"User '{username}' does not exist.")
            return False

        # Check if the movie exists in the user's watchlist
        Cursor.execute("SELECT * FROM Watchlist WHERE user_id = ? AND movie_name = ?", (existing_user[0], movie_name))
        existing_movie = Cursor.fetchone()
        return existing_movie is not None
    except Exception as e:
        print(f"Error checking if movie exists in watchlist: {e}")
        return False

def get_watchlist(username):
    try:
        Cursor.execute("SELECT movie_name FROM Watchlist WHERE user_id = (SELECT id FROM Users WHERE username = ?)", (username,))
        watchlist = Cursor.fetchall()
        return watchlist
    except Exception as e:
        print(f"Error fetching watchlist: {e}")
        return None
    
def remove_watchlist_entries_for_user(username):
    try:
        # Get the user's ID
        Cursor.execute("SELECT id FROM Users WHERE username = ?", (username,))
        user_id = Cursor.fetchone()

        if user_id is not None:
            # Remove watchlist entries for the user
            Cursor.execute("DELETE FROM Watchlist WHERE user_id = ?", (user_id[0],))
            connection.commit()
            print(f"Watchlist entries removed for user '{username}'.")
        else:
            print(f"User '{username}' does not exist.")
    except Exception as e:
        print(f"Error removing watchlist entries for user '{username}': {e}")