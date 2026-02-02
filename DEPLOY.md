# Deploying Portfolio to Firebase Hosting

Your portfolio has been converted to a static website in the `build/` folder, ready for Firebase Hosting.

## Prerequisites
Node.js is installed (v24.11.1 detected).

## Deployment Steps

1.  **Install Firebase CLI** (if not already installed):
    ```powershell
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```powershell
    firebase login
    ```
    *   This will open your browser to authenticate with your Google account.

3.  **Initialize Project**:
    ```powershell
    firebase init hosting
    ```
    *   **Select Project**: Choose "Use an existing project" (if you created one on Firebase Console) or "Create a new project".
    *   **Public Directory**: Type `build` and press Enter.
    *   **Configure as single-page app?**: Type `No` (since we pre-generated pages structure).
    *   **Set up automatic builds and deploys with GitHub?**: `No` (unless you want that).
    *   **File Overwrite Warning**: If it asks to overwrite `build/index.html` or `404.html`, type `No`.

4.  **Deploy**:
    ```powershell
    firebase deploy
    ```

## Future Updates
Whenever you change the code (HTML/CSS/Python data):
1.  Run the freeze script:
    ```powershell
    python freeze.py
    ```
2.  Deploy again:
    ```powershell
    firebase deploy
    ```
