

import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    height: "330px"
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');

// Click event for enable button
document.getElementById("enable").onclick = function(args) {
    // Enable new folder toolbar item
    filemanagerInstance.enableToolbarItems(["newfolder"]);
}

// Click event for enable button
document.getElementById("disable").onclick = function(args) {
    // Disable new folder toolbar item
    filemanagerInstance.disableToolbarItems(["newfolder"]);
}



