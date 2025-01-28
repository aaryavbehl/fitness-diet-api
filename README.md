# Customizable Fitness and Diet Plan API

It is a simple API that also serves as a frontend; using the frontend, users can check their fitness plan by simply typing their user ID and tracking their progress. The API can also store new updates, making it very convenient.

---

## Setup

- 1. **Install Python and add to PATH(if applicable)**

  - Python can be installed from https://www.python.org/downloads/.

- 2. **Clone the repository**

  - `https://github.com/aaryavbehl/fitness-diet-api`
  - `cd fitness-diet-api`

---

## Installation & Usage

- 1. **Install all the neccessary modules**

  - `pip install -r requirements.txt`

- 2. **Running the python file locally**

  - `python app.py`

- 3. **Accessing The Frontend**

  - The frontend can be accessed by simply going to http://127.0.0.1:5000/.

- 4. **Interacting with the Frontend**

  - The frontend is very simple to interact with, just type your userId and you will find your fitness plan and progress in a very well formatted way.

---

## The Database

- The database is `users_data.json` which is conveniently placed in the root of the project.

### A snippet of how the file looks like

```
{
    "userId": {
        "goal": "the_goal",
        "exercises": [
            {"name": "Exercise Name", "type": "Type of Workout", "sets": Number of sets, "reps": Number of reps},
        ]
    },
    "progress": [
        {"date": "Date", "workout": "Exercise Name", "sets": Number of sets, "reps": Number of reps}
    ]
}
```

---

## API Endpoints

1. **GET `/get_user_plan`**

   - **Description:** Retrieve the fitness plan for a user based on the provided `/user_id`.

   - **URl Parameters:** `/user_id`: The ID of the user.

### Examples

#### Example Request

- An example request will look like.
  - `GET /get_user_plan?user_id=user1`

#### Example Response

- An example response will look like.

```
{
   "goal": "weight_loss",
   "exercises": [
       {"name": "Exercise Name", "type": "Type of workout", "sets": Number of Sets, "reps": 10},
   ]
}
```

2.  **GET `/get_user_progress`**

- **Description:** Retrieve the progress of workouts for a user based on the provided `user_id`.

- **URL Parameters:** `user_id`: The ID of the user.

### Examples

#### Example Request

- An example request will look like:
  - `GET /get_user_progress?user_id=user1`

#### Example Response

- An example response will look like:
  ```
  [
      {"data": "Data", "workout": "Type of workout", "sets": Number of sets, "reps": Number of reps}
  ]
  ```

3. **GET `/get_exercises`**

- **Description**: Retrieve a list of available exercises.

### Examples

#### Example Request

- An example request will look like:
  - `GET /get_exercises`

#### Example Response

- An example response will look like

  ```
  [
      {"name": "Exercise Name", "type": "Type of workout", "duration": "Time of duration", "sets": Number of sets, "reps": Number of reps}
  ]
  ```

4. **POST `/submit_progress`**

- **Description**: Submit the user's progress for a workout
- **Request Body**:
  `user_id`: The ID of the user.
  `progress`: The workout progress including sets, reps or duration.

### Examples

#### Example Request

- An example request will look like

  ```
  {
      "user_id": "user1",
      "progress": {"workout": "Exercise Name", "sets": Number of sets, "reps": Number of reps}
  }
  ```

#### Example Response

- An example response will look like

`{"message": "Progress submitted successfully"}`
