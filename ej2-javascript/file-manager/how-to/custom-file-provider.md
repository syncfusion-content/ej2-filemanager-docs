---
layout: post
title:  Implement own service provider in ##Platform_Name## File manager control | Syncfusion
description: Learn here all about implementation own service provider in Syncfusion ##Platform_Name## File manager control of Syncfusion Essential JS 2 and more.
platform: ej2-javascript
control: Implement own service provider
publishingplatform: ##Platform_Name##
documentation: ug
domainurl: ##DomainURL##
---

# Create the custom file provider using NodeJS

Here we manipulate the Azure Blob Storage to supply the necessary data for the File Manager. We achieve this by utilizing NodeJS to fetch the required data from the Azure blob storage.

NodeJS acts as the bridge between the File Manager component and Azure Blob Storage, allowing seamless communication and data retrieval. Through this integration, the File Manager can access and interact with the data stored in Azure Blob Storage, enabling smooth file management operations.


## Prerequisites

* Valid Azure blob storage account. ( accountName, accountKey, endpointSuffix)
* Node version 14 above.

## Introduction to Azure Blob Storage

Azure Blob Storage is a cloud-based object storage service provided by Microsoft Azure. It is designed to store and manage unstructured data, also known as "blobs" in the cloud. Blobs can be any type of data, such as images, videos, documents, backups, logs, and more.

### Key concepts of Azure Blob Storage

**Containers:** In Azure Blob Storage, data is organized into containers. Containers are logical units that can hold one or more blobs. Think of them as directories or folders that help organize the data.

**Blobs:** Blobs are the actual data objects stored in Azure Blob Storage.

By understanding the fundamental concepts and use cases of Azure Blob Storage, you will be well-prepared to proceed with setting up and interacting with it using NodeJS in the custom File Provider.


## Create NodeJS project

Following the steps to create the NodeJS project.

Create a new directory for your project and run the following command to initialize a new NodeJS project. This will create a package.json file.

```ts

 npm init

 ```

Install the following packages.
  - express
  - @azure/storage-blob
  - archiver
  - body-parser
  - cors
  - esm
  - multer

Open your text editor or integrated development environment (IDE) and create the index.js file start writing your NodeJS code. This file will serve as the entry point of your application.

```ts

const express = require('express'); 
const app = express(); 
const port = 3000;

app.get('/', (req, res) => { 
  res.send('Hello, NodeJS!'); 
});

app.listen(port, () => { 
  console.log(`Server running on http://localhost:${port}`);
  });

```

To start your NodeJS application, simply run the following command in your terminal, pointing to the entry point file:

```ts

node index.js

```

## Initialize container client

We need to first get the BlobServiceClient. By using the connection string, we can obtain the BlobServiceClient. So, format the connection string as shown below.

```ts

Const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=${EndpointSuffix}`;

```

We can obtain the BlobServiceClient and the **containerClient** using this connection String and the BlobServiceClient. the **containerName** is the container from your Azure blob storage account that you need to access.

```ts

import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

```

## File actions

Need to provide the following action to creating a new folder, copying and moving of files or folders, deleting, uploading, and downloading the files or folders in the file system

### Read action

- Specify the directory name that needs to be accessed.

```ts

const directoryName = 'Files';

```

- Create the **app.post** method with URL **'/fileManager'**.
- To identify the action by use this condition **req.body.action === 'read'**

The following table represents the request parameters of **read** operations.

|Parameter|Type|Default|Explanation|
|----|----|----|----|
|action|String|read|Name of the file operation.|
|path|String|-|Relative path from which the data has to be read.|
|showHiddenItems|Boolean|-|Defines show or hide the hidden items.|
|data|FileManagerDirectoryContent|-|Details about the current path (directory).|


*Example:*

```ts
{
    action: "read",
    path: "/",
    showHiddenItems: false,
    data: []
}
```

The following table represents the response parameters of **read** operations.

|Parameter|Type|Default|Explanation|
|----|----|----|----|
|cwd|FileManagerDirectoryContent|-|Path (Current Working Directory) details.|
|files|FileManagerDirectoryContent[]|-|Details of files and folders present in given path or directory.|
|error|ErrorDetails|-|Error Details|

The following table represents the contents of **data, cwd, and files** in the file manager request and response.

|Parameter|Type|Default|Explanation|Is required|
|----|----|----|----|----|
|name|String|-|File name|Yes|
|dateCreated|String|-|Date in which file was created (UTC Date string).|Yes|
|dateModified|String|-|Date in which file was last modified (UTC Date string).|Yes|
|filterPath|String|-|Relative path to the file or folder.|Yes|
|hasChild|Boolean|-|Defines this folder has any child folder or not.|Yes|
|isFile|Boolean|-|Say whether the item is file or folder.|Yes|
|size|Number|-|File size|Yes|
|type|String|-|File extension|Yes|
|permission |AccessRules|-|File extension|Optional|

The following table represents the AccessRule properties available for file and folder:

| **Properties** | **Applicable for file** | **Applicable for folder** | **Description** |
| --- | --- | --- | --- |
| Copy | Yes | Yes | Allows access to copy a file or folder. |
| Read | Yes | Yes | Allows access to read a file or folder. |
| Write | Yes | Yes | Allows permission to write a file or folder. |
| WriteContents | No | Yes | Allows permission to write the content of folder. |
| Download | Yes | Yes | Allows permission to download a file or folder. |
| Upload | No | Yes | Allows permission to upload to the folder. |
| Path | Yes | Yes | Specifies the path to apply the rules, which are defined. |
| Role | Yes | Yes | Specifies the role to which the rule is applied. |
| IsFile | Yes | Yes | Specifies whether the rule is specified for folder or file. |

*Example for response:*

```ts
{
    cwd:
    {
        name:"Download",
        size:0,
        dateModified:"2019-02-28T03:48:19.8319708+00:00",
        dateCreated:"2019-02-27T17:36:15.812193+00:00",
        hasChild:false,
        isFile:false,
        type:"",
        filterPath:"//Download//"
    },
    files:[
        {
            name:"Sample Work Sheet.xlsx",
            size:6172,
            dateModified:"2019-02-27T17:23:50.9651206+00:00",
            dateCreated:"2019-02-27T17:36:15.8151955+00:00",
            hasChild:false,
            isFile:true,
            type:".xlsx",
            filterPath:"//Download//"
        }
    ],
    error:null
}
```

### Get image

Create the **app.get** method with URL **'/fileManager/GetImage'**.

The following table represents the request parameters of **GetImage** operations.

|Parameter|Type|Default|Explanation|
|----|----|----|----|
|path|String|-|Relative path to the image file|

The req.query.path contains the exact path of the images. For example: "/Jack.png".

Download the blob (image) from Azure Blob Storage using the blobClient and stores the result in the downloadResponse variable.

Pipe the readableStreamBody from the blob to the res response. It means the image data will be streamed from the Azure Blob Storage directly to the client's browser when the image URL is accessed.

Handle the exception if the image is not available in the given path.

### Download

Create the **app.post** method with URL **'/fileManager/Download'**.

The following table represents the request parameters of *download* operations.

|Parameter|Type|Default|Explanation|
|----|----|----|----|
|action|String|download|Name of the file operation|
|path|String|-|Relative path to location where the files to download are present.|
|names|String[]|-|Name list of the items to be downloaded.|
|data|FileManagerDirectoryContent|-|Details of the download item.|

*Example:*

```ts

{
  action: 'download',
  path: '/Downloads/Testing/',
  names: [ 'About.txt' ],
  data: [
    {
      name: 'About.txt',
      type: '.txt',
      isFile: true,
      size: 29,
      dateModified: '2023-09-14T06:03:52.000Z',
      hasChild: false,
      filterPath: '/Downloads/Testing/',      
      _fm_created: null,
      _fm_modified: 'September 14, 2023 11:33',
      _fm_iconClass: 'e-fe-txt',
      _fm_icon: 'e-fe-txt',
      _fm_htmlAttr: [Object]
    }
  ]
}

```
The **req.body. downloadInput** must be parsed to get the **downloadObj**.
Download the blob from Azure Blob Storage using the blobClient.

Download the blob from Azure Blob Storage using the blobClient and Pipe the readableStreamBody to the response object.

Create the archive file to download the multiple Files, Folders and single folders, then pipe the archive to the response.

### Upload

Create the **app.post** method with URL ‘**/Upload**.

The following table represents the request parameters of *Upload* operations.

|Parameter|Type|Default|Explanation|
|----|----|----|----|
|action|String|Save|Name of the file operation.|
|path|String|-|Relative path to the location where the file has to be uploaded.|
|uploadFiles|`IList<IFormFile>`|-|File that are uploaded.|

*Example:*
```ts

{
  path: '/Pictures/',
  action: 'save',
  data: [
    {
      name: 'Pictures',
      type: 'File Folder',
      isFile: true,
      size: 0,
      dateModified: '2023-09-14T06:03:52.000Z',
      hasChild: true,
      filterPath: '/',      
      _fm_id: 'fe_tree_1',
    }
  ],
  filename: 'bird (2).jpg'
}

```

- Multer is a popular middleware used to handle file uploads in Express-based web applications.
- Create the Multer config to store the upload files in buffer.

```ts

const multerConfig = {
  storage: memoryStorage()
};

```

We can handle the 3 cases here.
  - Save
  - Keep Both (action name will be **keepboth**)
  - Replace (action name will be **replace**)


create the **getBlockBlobClient** with the **req.body.filename**.
If the blob does not exist, then upload the data to that blob.
If the blob already exists, then create an error message containing "File Already Exists" and send the response.
