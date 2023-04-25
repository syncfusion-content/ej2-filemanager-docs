

import { FileManager, Toolbar, NavigationPane } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');


