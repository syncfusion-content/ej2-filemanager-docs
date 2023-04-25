var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
// inject feature modules of the file manager
ej.filemanager.FileManager.Inject(ej.filemanager.DetailsView,ej.filemanager.Toolbar,ej.filemanager.NavigationPane);
// initialize File Manager component
var filemanagerInstance = new ej.filemanager.FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    enablePersistence: true,
    // File Manager's onSuccess event
    success: onAjaxSuccess,
    // File Manager's onError event
    failure: onAjaxFailure
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');

// File Manager's file onSuccess function
function onAjaxSuccess(args){
    console.log("Ajax request successful");
}

// File Manager's file onError function
function onAjaxFailure(args){
    console.log("Ajax request has failed");
}

