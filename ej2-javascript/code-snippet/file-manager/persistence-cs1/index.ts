

import { FileManager, Toolbar, NavigationPane, DetailsView, SuccessEventArgs, FailureEventArgs } from '@syncfusion/ej2-filemanager';

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
    enablePersistence: true,
    // File Manager's success event
    success: onAjaxSuccess,
    // File Manager's failure event
    failure: onAjaxFailure
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');

// File Manager's file success function
function onAjaxSuccess(args: SuccessEventArgs){
    console.log("Ajax request successful");
}

// File Manager's file failure function
function onAjaxFailure(args: FailureEventArgs){
    console.log("Ajax request has failed");
}


