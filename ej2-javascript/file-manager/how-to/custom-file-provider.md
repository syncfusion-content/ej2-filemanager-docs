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

# Create the custom file-provider using NodeJS

Here we manipulate the Azure Blob Storage to supply the necessary data for the File Manager. We achieve this by utilizing NodeJS to fetch the required data from the Azure blob storage.

NodeJS acts as the bridge between the File Manager component and Azure Blob Storage, allowing seamless communication and data retrieval. Through this integration, the File Manager can access and interact with the data stored in Azure Blob Storage, enabling smooth file management operations.


## Prerequisites

* Valid Azure blob storage account. ( accountName, accountKey, endpointSuffix)
* Node version 14 above.

## Topics

- Introduction to Azure Blob Storage
- Create NodeJS project.
- Imports the required packages and create constants
- Get Container client.
- File Actions
  - Read Action.
  - Get Image.
  - Download.
  - Upload.
  - Create a new folder.
  - Rename.
  - Delete.
  - Details.
  - Search.
  - Copy and move.

### Introduction to Azure Blob Storage

Azure Blob Storage is a cloud-based object storage service provided by Microsoft Azure. It is designed to store and manage unstructured data, also known as "blobs" in the cloud. Blobs can be any type of data, such as images, videos, documents, backups, logs, and more.

#### Key concepts of Azure Blob Storage

**Containers:** In Azure Blob Storage, data is organized into containers. Containers are logical units that can hold one or more blobs. Think of them as directories or folders that help organize the data.

**Blobs:** Blobs are the actual data objects stored in Azure Blob Storage.

By understanding the fundamental concepts and use cases of Azure Blob Storage, you will be well-prepared to proceed with setting up and interacting with it using NodeJS in the custom File Provider.


### Create NodeJS project

Following the steps to create the NodeJS project.

#### Create a new directory for your project

```ts

mkdir file-provider             
cd file-provider

```

#### Initialize the NodeJS project

Run the following command to initialize a new NodeJS project. This will create a package.json file, which will keep track of your project's dependencies and metadata:

```ts

 npm init

 ```

The command will prompt you to enter various information about your project, such as its name, version, description, entry point (usually index.js), author, etc. You can either fill in the details or press "Enter" to accept the default values.

#### Create the main file

Create an entry point file for your application. This is where your NodeJS code will start running. By convention, it is often named index.js:

```ts

type nul > index.js

```

#### Install dependencies

- Install the following packages.
  - express
  - @azure/storage-blob
  - archiver
  - body-parser
  - cors
  - esm
  - multer

For instance, install express.js.

```ts

npm install express

```

#### Write your initial NodeJS code

Open your text editor or integrated development environment (IDE) and start writing your NodeJS code in the index.js file. This file will serve as the entry point of your application. For example, you can create a simple Express.js server:

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

#### Run your NodeJS application

To start your NodeJS application, simply run the following command in your terminal, pointing to the entry point file:

```ts

node index.js

```

### Imports the required packages and assign constants

After installing the necessary packages, import that package into index.js and create the required constants.

```ts

import { BlobServiceClient } from "@azure/storage-blob";
import express from 'express';
import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;
import { basename, extname, dirname } from 'path';
import archiver from 'archiver';
import multer, { memoryStorage } from 'multer';
const app = express();
const port = 3000;
import cors from 'cors';
app.use(cors());
app.use(urlencoded({
  extended: true
}));
app.use(json());

const accountName = "<--Your Account Name-->"; // For Example: "ej2azureblobstorage"
const accountKey = "<--Your Account Key-->";
const EndpointSuffix = "<--Your Account Endpoint-->"; // For Example: "core.windows.net"
//For store the file in bufffer objects
const multerConfig = {
  storage: memoryStorage()
};

```

### Get container client

We need to first get the BlobServiceClient. By using the connection string, we can obtain the BlobServiceClient. So, format the connection string as shown below.

```ts

Const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=${EndpointSuffix}`;

```

We can obtain the BlobServiceClient and the **containerClient** using this connection String and the BlobServiceClient. the **containerName** is the container from your Azure blob storage account that you need to access.

```ts

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

```

### File actions

Need to provide the following action to creating a new folder, copying and moving of files or folders, deleting, uploading, and downloading the files or folders in the file system

#### Read action

- Create the **app.post** method with URL '/'.

```ts

app.post('/', async function (req, res) {
  if (typeof req.body !== 'undefined' && req.body.action === 'read') {
    let totalFiles = await getFiles(req, res);
    let cwdFiles = {};
    cwdFiles.name = req.body.data.length != 0 && req.body.data[0] != null ? req.body.data[0].name : directoryName;
    cwdFiles.type = "File Folder";
    cwdFiles.filterPath = req.body.data.length != 0 && req.body.data[0] !=  null ? req.body.data[0].filterPath : "";
    cwdFiles.size = 0;
    cwdFiles.hasChild = true;
    let response = {};
    response = { cwd: cwdFiles, files: totalFiles };
    response = JSON.stringify(response);
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  }
});
  
```

- Under this condition **(req.body.action === 'read')** called the **getFiles** method to get the array of folders and Files.
- The **getFiles** method will return an array containing information about all the files and folders within the specified directory
- Specify the directory name that needs to be accessed.

```ts

const directoryName = 'Files';

```

- Set the prefix as **directoryName + req.body.path**. for example, "Files+/documents/".
- The **listBlobsByHierarchy** method can be used to retrieve prefix (folders) and blob (files).
- Create the object and include the properties of a file, such as its name, type, date of modification, and size, which are simple to retrieve.
- For folders, we can only access the name property; the **hasChildren** and dateModified attributes must be accessed using separate methods.
- Utilizing the directory name and **listBlobsFlat** function in the **getDateModified** method to collect all blobs dateModified information and get the most recent date by comparison.

```ts

async function getDateModified(directoryPath) {
  let lastUpdated = null;
  for await (const item of containerClient.listBlobsFlat({ prefix: directoryPath })) {
    const checkFileModified = item.properties.lastModified;
    if (lastUpdated === null || lastUpdated < checkFileModified) {
      lastUpdated = checkFileModified;
    }
  }
    return lastUpdated;
}

``` 

- Utilize the directory name and **listBlobsByHierarchy** in the **hasChildren** method to obtain the haschildren value. Return the true if prefix is available.

```ts

async function hasChildren(directoryPath) {
  for await (const item of containerClient.listBlobsByHierarchy('/', { prefix: directoryPath })) {
    if (item.kind === 'prefix') {
      return true;
    }
  }
  return false;
}

```

- Here is the code,

```ts

async function getFiles(req) {
  // Get the array of directories and files.
  let entry = {};
  const directoriesAndFiles = [];
  for await (const item of containerClient.listBlobsByHierarchy('/', { prefix: directoryName + req.body.path })) {
    if (item.kind === 'prefix') {
      entry = {};
      entry.name = basename(item.name);
      entry.type = "Directory";
      entry.isFile = false;
      entry.size = 0;
      entry.hasChild = await hasChildren(item.name);
      entry.filterPath = req.body.path;
      entry.dateModified = await getDateModified(item.name);
      directoriesAndFiles.push(entry);
    }
    else {
      entry = {};
      entry.name = basename(item.name);
      entry.type = extname(item.name);
      entry.isFile = true;
      entry.size = item.properties.contentLength;
      entry.dateModified = item.properties.lastModified;
      entry.hasChild = false;
      entry.filterPath = req.body.path;
      directoriesAndFiles.push(entry);
    }
  }
  return directoriesAndFiles;
}

```

- Once the **getFiles** function has returned the files and folders, the response must be set. Two parameters are needed for a response.
  - Cwd
  - Files

- Refer this document for required response fields: <https://ej2.syncfusion.com/documentation/file-manager/file-operations#read>

- Created the **cwdFiles** object, assign the name if the request data has the name else assign the default **directoryName**.

#### Get image

- Create the **app.get** method with URL **'/GetImage'**.

```ts

app.get('/GetImage', async function (req, res) {
  try {
    const blobClient = containerClient.getBlobClient(directoryName + req.query.path);
    // Download the image as a readable stream
    const downloadResponse = await blobClient.download();
    downloadResponse.readableStreamBody.pipe(res
    res.writeHead(200, { 'Content-type': 'image/jpg' });
  }
  catch (error) {
    res.status(404).send(req.query.path + " not found in given location.");
  }   
});

```

- The req.query.path contains the exact path of the images. For example: "/Jack.png". So, add the directoryName with req.query.path to get the blob client.

- download the blob (image) from Azure Blob Storage using the blobClient and stores the result in the downloadResponse variable.

- Pipe the readableStreamBody from the downloadResponse to the res (response) object. It means the image data will be streamed from the Azure Blob Storage directly to the client's browser when the image URL is accessed.

- Handle the exception if the image is not available in the given path.

#### Download

- Create the **app.post** method with URL **'/Download'**.
- The **req.body. downloadInput** must be parsed to get the **downloadObj**.
- Need to handle the two cases.
  - File download
  - Directory Download
  
##### File(single) download

- Get the exact file path of file by adding like this **directoryName + downloadObj.path + downloadObj.names[0].** For example: 'Files'+'/'+'jack.jpg'.

- Download the blob from Azure Blob Storage using the blobClient and store the result in the downloadResponse variable.

- Pipe the readableStreamBody from the downloadResponse to the res (response) object.

- Set the response header like this

```ts

res.setHeader('Content-Disposition', `attachment; filename=${downloadObj.names[0]}`);
res.setHeader('Content-Type', downloadResponse.contentType);
res.setHeader('Content-Length', downloadResponse.contentLength);

```

##### Directory (multiple and single) download

- Create the archive file to download the multiple Files, Folders and single folders.

```ts
const archive = archiver('zip', {
  gzip: true,
  zlib: { level: 9 }
});

```

- Iterate the **downloadObj.names** to get all folders or file name.
- Using the **isFile** boolean value, determine whether the data is a folder or file.
- Execute the single file download operation if **isFile** is true.
- In the end, Create the **entryName** which the file going to be append in archive.
- Then append the **downloadResponse.readableStreamBody** to the archeive.

```ts

const entryName = basename(directoryName + downloadObj.path + name); 
archive.append(downloadResponse.readableStreamBody, { name: entryName });

```

- For download the directory (single/ multiple), create the **getArchieveFolder** method.
- Call this method by passing the **directoryPath**.
- In that method check the item is blob or prefix.
- If the item is blob, then download and append it to archive. Replace the **directoryName + downloadObj.path** in **item.name** with empty string for **entryName**, because entry name starts with current directory.
- If the item is not the blob, then call the **getArchieveFolder** method with **item.name.**
- After all the folders and files appended to the archive call the **archive.finalize();** to complete the archive operations
- Then pipe the archive to the response.
- Here is the complete code of download operation.

```ts

app.post('/Download', async function (req, res) {
  let downloadObj = JSON.parse(req.body.downloadInput);
  if (downloadObj.names.length === 1 && downloadObj.data[0].isFile) {
    // Get a reference to the file blob
    const blockBlobClient = containerClient.getBlockBlobClient(directoryName +      downloadObj.path + downloadObj.names[0]);
    // Download the file to a local destination
    const downloadResponse = await blockBlobClient.download(0);
    res.setHeader('Content-Disposition', `attachment;  filename=${downloadObj.names[0]}`);
    res.setHeader('Content-Type', downloadResponse.contentType);
    res.setHeader('Content-Length', downloadResponse.contentLength);
    // Stream the file directly to the response
    downloadResponse.readableStreamBody.pipe(res);
  }
  else {
    console.log(downloadObj.names.length);
    const zipFileName = downloadObj.names.length > 1 ? 'Files.zip' : `${downloadObj.names[0]}.zip`;
    res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);
    res.setHeader('Content-Type', 'application/zip');
    const archive = archiver('zip', {
      gzip: true,
      zlib: { level: 9 }
    });
    archive.pipe(res);
    for (const name of downloadObj.names) {
      if (downloadObj.data.find((item) => item.name === name && !item.isFile)) {
        const directoryPath = directoryName + downloadObj.path + name + endSlash;
        await getArchieveFolder(directoryPath)
        async function getArchieveFolder(directoryPath) {
          for await (const item of containerClient.listBlobsByHierarchy('/', { prefix:  directoryPath })) {
            if (item.kind === 'blob') {
              const blockBlobClient = containerClient.getBlockBlobClient(item.name);
              const downloadResponse = await blockBlobClient.download(0);const entryName = item.name.replace((directoryName + downloadObj.path), "");archive.append(downloadResponse.readableStreamBody, { name: entryName });
            }
            else {
              await getArchieveFolder(item.name)
            }
          }
        }
      } 
      else {
        const blockBlobClient = containerClient.getBlockBlobClient(directoryName + downloadObj.path + name);
        const downloadResponse = await blockBlobClient.download(0);
        const entryName = basename(directoryName + downloadObj.path + name);                  archive.append(downloadResponse.readableStreamBody, { name: entryName });
      }
    }
    archive.finalize();
  }               
});

```

#### Upload

- Create the **app.post** method with URL ‘**/Upload**.
- Multer is a popular middleware used to handle file uploads in Express-based web applications.
- The **memoryStorage()** function creates a storage engine that stores uploaded files in memory as Buffer objects. When you use this configuration with Multer, the uploaded files are not saved to the file system; instead, they are temporarily stored in memory.
- Create the Multer config to store the upload files in buffer.

```ts

const multerConfig = {
  storage: memoryStorage()
};

```

- By using this we can get the uploadFiles **multer(multerConfig).any("uploadFiles")** 
- We need to handle the 3 cases here.
  - Save
  - Keep Both
  - Replace

#### Save

- Under this case create the **getBlockBlobClient** with the **req.body.filename**.
- If the blob does not exist, then upload the data to that blob.
- If the blob already exists, then create an error message containing "File Already Exists" and send the response.

```ts

if (req.body.action === 'save') {
  const blobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + req.body.filename);
  if (!await blobClient.exists()) {
    await blobClient.uploadData(req.files[0].buffer);
    res.send('Success');
  }
  else {
    var errorMsg = new Error();
    errorMsg.message = "File Already Exists.";
    errorMsg.code = "400";
    errorMsg.fileExists = req.body.filename;
    var response = { error: errorMsg, files: [] };
    response = JSON.stringify(response);
    res.statusCode = 400;
    res.statusMessage = "File Already Exists.";
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  }
}

```

##### Keep both

- If the action is keep both, then create the new file name. Using this new file name create the **getBlockBlobClient.** Again, check if the blob  exists or not.
- If the blob does not exist, then upload the data to the blob.
- If the blob exists, then change the name again.

##### Replace

- If the action is 'replace', then upload the data to that blob.
- Here is the complete code of the upload action.

```ts

app.post('/Upload', multer(multerConfig).any("uploadFiles"), async function (req, res) {
  if (req.body != null && req.body.path != null) {
    if (req.body.action === 'save') {
      const blobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + req.body.filename);
      if (!await blobClient.exists()) {
        await blobClient.uploadData(req.files[0].buffer);
        res.send('Success');
      }
      else {
        var errorMsg = new Error();
        errorMsg.message = "File Already Exists.";
        errorMsg.code = "400";
        errorMsg.fileExists = req.body.filename;
        var response = { error: errorMsg, files: [] };
        response = JSON.stringify(response);
        res.statusCode = 400;
        res.statusMessage = "File Already Exists.";
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      }
    } else if (req.body.action === 'keepboth') {
      var fileNameWithoutExtension = req.body.filename.substring(0, req.body.filename.lastIndexOf('.'));
      var fileExtension = extname(req.body.filename);
      var newFileName = '';
      var counter = 1;
      while (true) {
        newFileName = fileNameWithoutExtension + "(" + counter + ")" + fileExtension;
        const newBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + newFileName);
        if (!await newBlobClient.exists()) {
          await newBlobClient.uploadData(req.files[0].buffer);
          res.send('Success');
          break;
        }
        counter++;
      }
    } else if (req.body.action === 'replace') {
      const blobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + req.body.filename);
      if (await blobClient.exists()) {
        await blobClient.uploadData(req.files[0].buffer);
        res.send('Success');
      }
    }
  }
});
                  
```

#### Create a new folder

- Under the post method with this url '/' add the following code to call the **createFolder** method.

```ts
if (typeof req.body !== 'undefined' && req.body.action === 'create') {
  await createFolder(req, res);
}

```

- Create the variable **isExist** to store the folder is exist or not.
- In the createFolder method initially need to check the existence of the folder, so set the prefix as **prefix: directoryName + req.body.path + req.body.name + endSlash** for example **('Files'+'/'+'new'+'/')**.
- Check existence if folder using containerClient’s **listBlobsFlat** method. If the folder exists, then for loop executes and assign the isExist as true.
- IsExist is true then send the error message containing “Folder already exists”.
- If it does not exist, then create the folder.
- Create the folder by creating the file in that folder’s path.
- Create the file path like below, for example **('Files'+'/'+'new'+'/'+'about.tx')**.

```ts
const fileName = directoryName + req.body.path + req.body.name + "/about.txt";

```

- Get the file instance by passing the file name to the **getBlockBlobClient** method.
- Then create the file content and upload that content to new file now folder is created then set the required properties for the response and send the response. Refer [this](https://ej2.syncfusion.com/documentation/file-manager/file-operations#file-request-and-response-contents) for required properties.
- Here is the complete code of the create new Folder action.

```ts

async function createFolder(req, res) {
  var response;
  var isExist = false;
  for await (const { } of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path + req.body.name + endSlash })) {
    isExist = true;
    break;
  }
  if (isExist) {
    var errorMsg = new Error();
    errorMsg.message = "File Already Exists.";
    errorMsg.code = "400";
    errorMsg.fileExists = req.body.name;
    res.statusMessage = "File Already Exists.";
    response = { cwd: null, files: null, details: null, error: errorMsg };
  } else {
    // Create a new folder with about.txt file
    const fileName = directoryName + req.body.path + req.body.name + "/about.txt";
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const fileContent = "This is the content of the about.txt file.";
    // Upload the about.txt to new folder.
    await blockBlobClient.uploadData(Buffer.from(fileContent), {
      blobHTTPHeaders: { blobContentType: "text/plain" },
    });
    const properties = await blockBlobClient.getProperties();
    const data = [{
      dateCreated: properties.createdOn
      dateModified: properties.lastModified,
      filterPath: null,
      hasChild: false,
      isFile: false,
      name: req.body.name,
      size: 0,
      type: "Directory"
    }];
    response = { cwd: null, files: data, details: null, error: null };
  }
  response = JSON.stringify(response);
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
}
          

```

#### Rename

- Under the post method with this url '/' add the following code to call the **rename** method.

```ts

if (typeof req.body !== 'undefined' && req.body.action === 'rename') {
  await rename(req, res);
}

```

- Need to handle two cases in this method.
  - File Rename.
  - Folder Rename

##### File rename

- We need to get the source and target file instance.
- Then check if the target file instance already exists or not.
- If it does not exist, then copy the source client URL to the target client after that deletes the source client.

```ts

// Copy the source file to the target file
await targetBlobClient.beginCopyFromURL(sourceBlobClient.url);
// Delete the source file
await sourceBlobClient.delete();

```

- If the file exists, then send the error message as response.

##### Folder rename

- For Folder rename, check the existence of folder using the **listBlobsFlat** method.
- If the folder exists send the error message.
- To rename the folder you need to move all files from that folder to a new folder.
- So, get all files under that folder using **listBlobsFlat** method.
- Copy the data from source file instance to target file instance and delete the source instance.
- Here is the complete code of rename action.

```ts

async function rename(req, res) {
  let response = {};
  var errorMsg;
  if (req.body.data[0].isFile) {
    const sourceBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + req.body.name);
    const targetBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + req.body.newName);
    if (!await targetBlobClient.exists()) {
      // Copy the source file to the target file
      await targetBlobClient.beginCopyFromURL(sourceBlobClient.url);
      // Delete the source file
      await sourceBlobClient.delete();
      const properties = await targetBlobClient.getProperties();
      const files = [
        {
          name: targetBlobClient.name,
          size: properties.contentLength,
          dateModified: properties.lastModified,
          dateCreated: properties.createdOn,
          hasChild: false,
          isFile: true,
          type: basename(targetBlobClient.name),
          filterPath: req.body.path
        }
      ];
      response = { cwd: null, files: files, error: null, details: null };
      response = JSON.stringify(response);
    }
    else {
      errorMsg = new Error();
      errorMsg.message = "File Already Exists.";
      errorMsg.code = "400";
      errorMsg.fileExists = req.body.newName;
      response = { cwd: null, files: null, error: errorMsg, details: null };
      response = JSON.stringify(response);
      res.statusMessage = "File Already Exists.";
    }
  }
  else {
    var isExist = false;
    // Check the existance of directory
    for await (const { } of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path + req.body.newName + endSlash })) {
      isExist = true;
      break;
    }
    if (isExist) {
      errorMsg = new Error();
      errorMsg.message = "File Already Exists.";
      errorMsg.code = "400";
      errorMsg.fileExists = req.body.newName;
      response = { cwd: null, files: null, error: errorMsg, details: null };
      response = JSON.stringify(response);
      res.statusMessage = "File Already Exists.";
    }
    else {
      for await (const blob of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path + req.body.name + endSlash })) {
        const targetPath = blob.name.replace((directoryName + req.body.path +   req.body.name), (directoryName + req.body.path + req.body.newName));
        const sourceBlobClient = containerClient.getBlockBlobClient(blob.name);
        const targetBlobClient = containerClient.getBlockBlobClient(targetPath);
        await targetBlobClient.beginCopyFromURL(sourceBlobClient.url);
        await sourceBlobClient.delete();
      }
      const files = [
        {
          name: req.body.newName,
          size: 0,
          dateModified: null,
          dateCreated: null,
          hasChild: false,
          isFile: false,
          type: "Directory",
          filterPath: req.body.path
        }
      ];
      response = { cwd: null, files: files, error: null, details: null };
      response = JSON.stringify(response);
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
}

```

#### Delete

- Under the post method with this url '/' add the following code to call the **deleteFoldersAndFiles** method.

```ts

if (typeof req.body !== 'undefined' && req.body.action === 'delete') {
  await deleteFoldersAndFiles(req, res);
}

```

- Need to handle two cases in this method.
  - File delete.
  - Folder delete.
- Use the for loop over **req.body.data** to delete the multiple and single files or folders.
- We can separate File and folder delete action by using **req.body.data[i].isFile** this Boolean value

##### File delete

- For delete the file directly get the file instance and delete the file. Before deleting the file get the required fields.

##### Folder delete

- To delete the folder, we need to get all files inside that folder and delete all those files.
- Handle the null exception if file or folder is not available.
- Here is the complete code of delete action.

```ts

async function deleteFoldersAndFiles(req, res) {
  try {
    let totalFiles = [];
    for (let i = 0; i < req.body.data.length; i++) {
      if (req.body.data[i].isFile) {
        const blobClient = containerClient.getBlobClient(directoryName + req.body.path + req.body.names[i]);
        const properties = await blobClient.getProperties()
        const fileData = {
          dateCreated: properties.createdOn,
          dateModified: properties.lastModified,
          filterPath: req.body.data[i].filterPath,
          hasChild: false,
          isFile: true,
          name: basename(blobClient.name),
          size: properties.contentLength,
          type: extname(blobClient.name)
        }
        totalFiles.push(fileData);
        await blobClient.delete();
      }
      else {
        for await (const blob of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path + req.body.names[i] + endSlash })) {
          const fileData = {
            dateCreated: blob.properties.createdOn,
            dateModified: blob.propertieslastModified,
            filterPath: req.body.data[i].filterPath,
            hasChild: await hasChildren(blob.name),
            isFile: true,
            name: basename(blob.name),
            size: blob.properties.contentLength,
            type: extname(blob.name)
          }
          totalFiles.push(fileData);
          const blobClient = containerClient.getBlobClient(blob.name);
          await blobClient.delete();
        }
      }
    }
    let response = { cwd: null, details: null, error: null, files: totalFiles };
    response = JSON.stringify(response);
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  }
  catch (error) {
    var errorMsg = new Error();
    errorMsg.message = "file not found in given location.";
    errorMsg.code = "404";
    res.statusMessage = "File not found in given location.";
    response = { cwd: null, files: null, details: null, error: errorMsg };
    res.setHeader('Content-Type', 'application/json');
    res.json(response)
  }
}

```

#### Details

- Under the post method with this url ‘/’ add the following code to call the **getDetails** method.

```ts
if (typeof req.body !== 'undefined' && req.body.action === 'details') { 
  await getDetails(req, res);
}

```

- Need to handle two cases.
  - Overall details.
  - File or folder details (single/Multiple)
- We can separate the Overall details and File or folder details by this condition **"req.body.names.length == 0 && req.body.data != 0)"** 

##### Overall details

- Create the size and **lastUpdated** variables to store the overall blobs size and last date modified.
- We can get all the blobs from the given path using **listBlobsFlat**  method.
- Add each blob’s size to the size variable to get the overall size.
- Set **lastModified** value to the **lastUpdated** variable by comparing the previous one.
- Create the object and set the required properties and send the response.

```ts
if (req.body.names.length == 0 && req.body.data != 0) { 
  let lastUpdated = null; 
  //Get the folder name from the data 
  req.body.names = req.body.data.map(item => item.name); 
  let size = 0; 
  for await (const blob of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path })) { 
    size += blob.properties.contentLength; 
    if (lastUpdated === null || lastUpdated < blob.properties.lastModified) { 
      lastUpdated = blob.properties.lastModified; 
    } 
  }
  const fileDetails = {
    name: req.body.names[0], 
    location: directoryName + req.body.path, 
    isFile: false, 
    size: await byteConversion(size), 
    created: null, 
    modified: lastUpdated, 
    multipleFiles: false
  }
  let response = {}; 
  response = { cwd: null, files: null, error: null, details: fileDetails }; 
  response = JSON.stringify(response); 
  res.setHeader('Content-Type', 'application/json'); 
  res.json(response)
}

```

##### File and folder details

- To get the file and folder details, iterate the **req.body.names** to get the details of files and folders.
- If the data is file, then get the file instance and get the properties using the **getProperties** method. And set the required properties.
- If the data is Folder, then get the blobs details under that folder using **listBlobsFlat** method. Get the required properties and send final response.
- Handled the null exception if the file or folder is not available.

```ts

else { 
  let fileDetails = {}; 
  let size = 0; 
  let names = []; 
  let location; 
  let isFile = false; 
  let created; 
  let modified; 
  for (const item of req.body.names) { 
    if (req.body.data[0].isFile) { 
      const blobClient = containerClient.getBlobClient(directoryName + req.body.path + item); 
      const properties = await blobClient.getProperties(); 
      names.push(basename(blobClient.name)); 
      // Replace the blobClient.name to get the common loaction for more thatn one files 
      if (req.body.names.length > 1) { 
        location = blobClient.name.replace("/" + item, ""); 
      } else { 
        location = blobClient.name; 
        created = properties.createdOn; 
        modified = properties.lastModified; 
        isFile = true; 
      } 
      size += properties.contentLength; 
    } else {
    let lastUpdated = null; 
    for await (const blob of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path + item + endSlash })) {    
      size += (blob.properties.contentLength); 
      if (lastUpdated === null || lastUpdated < blob.properties.lastModified) { 
        lastUpdated = blob.properties.lastModified; 
      } 
    } 
    names.push(item); 
    if (req.body.names.length > 1) { 
      location = (directoryName + req.body.path + item).replace("/" + item, ""); 
      } else { 
        location = directoryName + req.body.path + item; modified = lastUpdated; isFile = false; 
      } 
    } 
  } 
  fileDetails = { 
    name: names.join(", "), 
    location: location, 
    isFile: isFile, 
    size: await byteConversion(size), 
    created: created, 
    modified: modified, 
    multipleFiles: req.body.names.length > 1 
  }; 
  let response = { cwd: null, files: null, error: null, details: fileDetails }; 
  response = JSON.stringify(response); 
  res.setHeader('Content-Type', 'application/json'); 
  res.json(response) 
}

```

#### Search

- Under the post method with this url '/' add the following code to call the **getDetails** method.

```ts

if (typeof req.body !== 'undefined' && req.body.action === 'search') { 
  await searchFiles(req, res) 
}

```

- In the **searchFiles** method replace the '*' in the **req.body.searchString** and assign the result to new variable.
- Create the **searchInFolder** method inside the **searchFiles** method.
- In the **searchInFolder** method using the **listBlobsByHierarchy** method to add the folder and files details if that name match with search string and send the response.

```ts

async function searchFiles(req, res) { 
  var currentPath = req.body.path; 
  console.log(req.body.searchString); 
  var searchString = req.body.searchString.replace(/\*/g, ""); const directories = []; 
  await searchInFolder(directoryName + currentPath, directories); 
  // Helper function to search in folders 
  async function searchInFolder(prefix, directory) { 
    for await (const item of containerClient.listBlobsByHierarchy("/", { prefix })) { 
      if (item.kind === 'prefix') { 
        if (basename(item.name).toLowerCase().includes(searchString.toLowerCase())) { 
          entry = {}; 
          entry.name = basename(item.name); 
          entry.type = "Directory"; 
          entry.isFile = false; 
          entry.size = 0; 
          entry.hasChild = true; 
          entry.filterPath = (dirname(item.name)).replace(directoryName, ""); 
          entry.dateModified = await getDateModified(item.name); directory.push(entry); 
        } 
        await searchInFolder(item.name, directory); 
      } else { 
        if (basename(item.name).toLowerCase().includes(searchString.toLowerCase())) { 
          const filterPath = dirname(item.name).substring(directoryName.length) + endSlash; 
          console.log(filterPath); 
          entry = {}; 
          entry.name = basename(item.name); 
          entry.type = extname(item.name); 
          entry.isFile = true; 
          entry.size = item.properties.contentLength;
          entry.dateModified = item.properties.lastModified; entry.hasChild = false; 
          entry.filterPath = filterPath; 
          directory.push(entry); 
        } 
      } 
    } 
  } 
  let response = {}; 
  response = { cwd: null, files: directories, error: null, details: null }; 
  response = JSON.stringify(response); 
  res.setHeader('Content-Type', 'application/json'); 
  res.json(response); 
}

```

#### Copy and move

- Under the post method with this URL '/' add the following code to call the **copyAndMoveFile**  method.

```ts

if (typeof req.body !== 'undefined' && (req.body.action === 'copy' || req.body.action === 'move')) { 
  await copyAndMoveFiles(req, res) 
}

```

- In this **copyAndMoveFiles,**  need to handle two cases.
  - Directory copy and move.
  - File copy and move.
- Create the **isRename** variable to store the is request is rename or not.

##### Directory copy and move

- If the **isRename** is false then check the existence of the folders, and if folder is existing, then send the error message.
- If **isRename** is true, then don’t check the existence of the folder.
- To move or copy the folders you need to get all the blobs from that folder and create the new path for each blob and copy the data from the old path to the new path.
- If the **isRename** is true then change the name and again check for existence. 
- If the action is move then delete the old blob.

```ts

if (item.type == "Directory") { 
  var isExist = false; 
  // Here prevented the checking of existance, if the request is rename. 
  if (!isRename) {
  // Check the existance of the target directory, using the blob is available or not in that path. // Here the prefix is "Files/Document/". that end '/' added for get the exact directory. // For example If this '/' is not added it wil take the "Files/Document" and "Files/Documents". 
  for await (const { } of containerClient.listBlobsFlat({ prefix: directoryName + req.body.targetPath + item.name + endSlash })) { 
    isExist = true; 
    break; 
  } 
  if (isExist) { 
    errorMsg = new Error(); 
    errorMsg.message = "File Already Exists."; 
    errorMsg.code = "400"; 
    renameFiles.push(item.name); 
    errorMsg.fileExists = renameFiles; 
    res.statusMessage = "File Already Exists."; 
  } 
} 
if (!isExist) { 
  var newDirectoryName = item.name; 
  for await (const blob of containerClient.listBlobsFlat({ prefix: directoryName + req.body.path + item.name + endSlash })) { 
    // Here replace the source path with empty string. if source path is "Files/Pictures/tom.png" the targetPath is "tom.png". // Here "directoryName = Files" and "req.body.path = /Pictures/". 
    const targetBlob = blob.name.replace((directoryName + req.body.path), ""); 
    const sourceBlobClient = containerClient.getBlockBlobClient(blob.name); 
    var destinationBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.targetPath + targetBlob); 
    if (isRename) { 
      // Change the target path if get rename request. 
      var rootTatgetPath = targetBlob.substring(0, targetBlob.indexOf("/")); 
      var targetSubPath = targetBlob.substring(targetBlob.indexOf("/")); 
      var newTargetPath; 
      var counter = 1; 
      while (true) {
        newTargetPath = rootTatgetPath + "(" + counter + ")" + targetSubPath; destinationBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.targetPath + newTargetPath); 
        if (!await destinationBlobClient.exists()) {
            newDirectoryName = item.name + "(" + counter + ")"; await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url); 
            break; 
          } 
          counter++; 
        } 
      } else { 
        await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url); 
      } 
      // Delete the Source blob if the sction is "move". 
      if (req.body.action == "move") { 
        await sourceBlobClient.delete(); 
      } 
    } 
    const data = { 
      name: newDirectoryName, 
      size: 0, 
      hasChild: false, 
      isFile: false, 
      type: item.type, 
      filterPath: req.body.targetPath 
    }; 
    files.push(data) 
  } 
}

```

##### File copy and move

- If the **isRename** is false then check the existence of the files, and if folder exists, then send the error message.
- If **isRename** is true, then don’t check the existence of the files.
- To move or copy the files copy the data from the source blob client to target client. If the action is move, then delete the source blob client.
- If the **isRename** is true, then change the name and again check for existence. 
- And send the final response with array of moved items.

```ts

else { 
  var isExist = false; 
  const sourceBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.path + item.name); 
  var destinationBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.targetPath + item.name); 
  if (!isRename) { 
    if (await destinationBlobClient.exists()) { 
      isExist = true 
      errorMsg = new Error(); 
      errorMsg.message = "File Already Exists."; 
      errorMsg.code = "400"; 
      renameFiles.push(item.name); 
      errorMsg.fileExists = renameFiles; 
      res.statusMessage = "File Already Exists."; 
    } 
  } 
  if (!isExist) { 
    if (isRename) { 
      var fileNameWithoutExtension = item.name.substring(0, item.name.lastIndexOf('.')); 
      var fileExtension = extname(item.name); 
      var newFileName; 
      var counter = 1; 
      while (true) { 
        newFileName = fileNameWithoutExtension + "(" + counter + ")" + fileExtension; 
        destinationBlobClient = containerClient.getBlockBlobClient(directoryName + req.body.targetPath + newFileName); 
        if (!await destinationBlobClient.exists()) { 
          await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url); 
          break; 
        } 
        counter++; 
      }
    } else { 
      await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url); 
    } 
    if (req.body.action == "move") { 
      await sourceBlobClient.delete(); 
    } 
    const properties = await destinationBlobClient.getProperties(); 
    const data = { name: basename(destinationBlobClient.name), size: properties.contentLength, 
    previousName: null, 
    dateModified: properties.lastModified, 
    dateCreated: properties.createdOn, 
    hasChild: false, 
    isFile: true, 
    type: extname(destinationBlobClient.name), 
    filterPath: req.body.targetPath 
  }; 
  files.push(data) 
}

```
