

import { FileManager, Toolbar, NavigationPane, DetailsView, enableVirtualization} from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, enableVirtualization)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize file manager component and add custom item to contextmenu
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    view: 'Details',
    enableVirtualization: true,
    beforeSend: function(args) {
            args.ajaxSettings.beforeSend = function (args) {
                args.httpRequest.setRequestHeader('Authorization', 'FileBrowser');
            };
        },
    beforeImageLoad: function(args) {
            args.imageUrl = args.imageUrl + '&rootName=' + 'FileBrowser';
        },
    beforeDownload: function(args) {
            args.data.rootFolderName = 'FileBrowser';
        }
});
filemanagerInstance.appendTo('#filemanager');



