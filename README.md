# Tab Control

## Purpose

**Tab Control** is a Chrome/Brave extension designed to help users efficiently manage their browser windows and tabs. It allows you to view all open windows, see the active tab in each window, and merge multiple windows into a single window seamlessly. This extension is particularly useful for users who handle numerous tabs across different windows and seek a streamlined way to organize their browsing sessions.

## Building and Publishing

### Building the Extension

1. **Install Dependencies**

   Install the necessary packages using npm:

   ```bash
   npm install
   ```

2. **Build the Project**

   Use Vite to build the project for production:

   ```bash
   npm run build
   ```

   This will generate the production-ready files in the `dist` directory.

### Loading the Extension into Chrome/Brave

1. **Open the Extensions Page**

   Navigate to the extensions page in Chrome or Brave by entering `chrome://extensions/` in the address bar.

2. **Enable Developer Mode**

   Toggle the **Developer mode** switch located at the top right corner of the page.

3. **Load Unpacked Extension**

   Click on the **Load unpacked** button and select the `dist` folder from your project directory.

4. **Verify the Extension**

   The **Chrome Tab Manager** extension should now appear in your list of installed extensions. Click on its icon to ensure it's functioning as expected.
