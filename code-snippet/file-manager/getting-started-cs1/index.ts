

import { FileManager } from '@syncfusion/ej2-filemanager';

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize FileManager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations'
    }
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');


