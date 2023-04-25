var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
// inject feature modules of the file manager
ej.filemanager.FileManager.Inject(ej.filemanager.DetailsView,ej.filemanager.Toolbar,ej.filemanager.NavigationPane);
// initialize File Manager component
var filemanagerInstance = new ej.filemanager.FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileAccess/FileOperations',
        uploadUrl: hostUrl +'api/FileAccess/Upload',
        downloadUrl: hostUrl +'api/FileAccess/Download',
        getImageUrl: hostUrl +'api/FileAccess/GetImage'
    },
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');

