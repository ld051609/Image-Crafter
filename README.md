### Detailed User Interaction Steps

#### Step 1: Accessing the Application

- **Action**: User navigates to the web application's URL.
- **System Response**: The React frontend loads and displays the homepage with a text input form.

#### Step 2: Inputting Text

- **Action**: User types a description into the text input field.
- **System Response**: The input field captures the user's text.

#### Step 3: Submitting the Text

- **Action**: User clicks the "Generate Image" button.
- **System Response**:
  - A loading spinner or message appears.
  - The frontend sends a POST request to the backend with the text input.

#### Step 4: Processing the Request

- **System Action**:
  - The backend validates the input and forwards the request to the AI service.
  - The AI service processes the text and generates an image.

#### Step 5: Generating the Image

- **System Response**:
  - The backend receives the generated image from the AI service.
  - The backend stores the text input and image URL in MongoDB.
  - The backend sends the image URL back to the frontend.

#### Step 6: Displaying the Generated Image

- **System Response**:
  - The frontend receives the image URL.
  - The loading spinner or message disappears.
  - The generated image is displayed to the user.
  - If an error occurs, an error message is shown.

#### Step 7: Reviewing Past Requests (Optional)

- **Action**: User navigates to a "Gallery" or "History" page.
- **System Response**:
  - The frontend sends a GET request to the backend to fetch past images.
  - The backend queries MongoDB for past image requests.
  - The frontend displays a gallery of previously generated images.
