

import { FileManager } from '@syncfusion/ej2-filemanager';

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage'
    }
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');


