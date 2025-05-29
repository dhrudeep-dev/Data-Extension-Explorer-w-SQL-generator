# Data Extension Explorer with SQL Generator for Salesforce Marketing Cloud

## Description

This tool, the **Data Extension Explorer with SQL Generator**, is designed for Salesforce Marketing Cloud users to efficiently manage and utilize their Data Extensions. It allows users to:

* Quickly locate any Data Extension within their account.
* View the full folder path of each Data Extension.
* Inspect its complete attribute schema (field names, data types, primary key status, nullability, etc.).
* Generate simple SQL query templates (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) quickly based on the selected Data Extension's structure.

The goal is to significantly speed up development, reduce manual errors in query writing, and improve overall data asset management within SFMC.

## Features

* **Comprehensive DE Listing:** Displays all Data Extensions accessible within the Business Unit.
* **Folder Path Visibility:** Clearly shows the folder structure where each Data Extension resides.
* **Detailed Attribute Schema:** Provides a full breakdown of fields, data types, lengths, primary key status, and nullability for selected Data Extensions.
* **Quick SQL Generation:** Automatically generates basic SQL DML statements tailored to the selected Data Extension's schema.
* **Intuitive User Interface:** Designed for ease of use and quick information retrieval.

## Prerequisites

* Access to a Salesforce Marketing Cloud account.
* Permissions to create and publish CloudPages within a Business Unit.

## Setup Instructions

Follow these steps to set up the Data Extension Explorer in your SFMC instance:

1.  **Publish CloudPages:**
    * Publish the `data-extension-explorer-backend.js` file as a CloudPage (Code Resource type recommended).
    * Publish the `data-extension-explorer.html` file as another CloudPage (HTML type).

2.  **Copy Backend CloudPage URL:**
    * Once the `data-extension-explorer-backend.js` CloudPage is published, copy its full **Published URL**.

3.  **Configure Frontend with Backend URL:**
    * Open the `data-extension-explorer.html` file (either the local file before you create the CloudPage from it, or by editing the HTML content of the CloudPage directly).
    * Search for the placeholder text: **`YOUR_CLOUDPAGE_URL`**.
    * **Important:** You will find three instances of this placeholder in the file. Replace **all three** instances with the actual Published URL of your `data-extension-explorer-backend.js` CloudPage that you copied in Step 2.

4.  **Save and (Re)Publish Frontend:**
    * Save the changes to your `data-extension-explorer.html` content.
    * Ensure this updated version is the one published as a CloudPage in SFMC.

## Usage

1.  Once the setup is complete, navigate to the **Published URL** of your `data-extension-explorer.html` CloudPage in your web browser.
    *(The original instructions mentioned "Now preview data-extension-explorer.html file". Using the published URL is the standard way to access a fully functional CloudPage.)*

This will launch the Data Extension Explorer tool, allowing you to browse, inspect, and generate SQL for your Data Extensions.
