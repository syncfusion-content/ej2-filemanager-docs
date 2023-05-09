

import { FileManager, Toolbar, NavigationPane, DetailsView, FileToolbarClickEventArgs } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component and add custom item to contextmenu
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
            url: hostUrl + 'api/FileManagerAccess/FileOperations',
            getImageUrl: hostUrl + 'api/FileManagerAccess/GetImage',
            uploadUrl: hostUrl + 'api/FileManagerAccess/Upload',
            downloadUrl: hostUrl + 'api/FileManagerAccess/Download'
    },
    view: 'Details'
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');


