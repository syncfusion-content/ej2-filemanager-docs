

import { FileManager, Toolbar, NavigationPane, DetailsView, FileToolbarClickEventArgs } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component and add custom item to contextmenu
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    view: 'Details',
    beforeSend: function (args) {
        args.ajaxSettings.beforeSend = function (args: any) {
        args.httpRequest.setRequestHeader('Authorization', 'Access control');
        };
    },
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');


