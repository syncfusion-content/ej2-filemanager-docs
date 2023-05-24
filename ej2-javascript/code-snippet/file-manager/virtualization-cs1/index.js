var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
// inject feature modules of the file manager
ej.filemanager.FileManager.Inject(ej.filemanager.DetailsView,ej.filemanager.Toolbar,ej.filemanager.NavigationPane,ej.filemanager.enableVirtualization);
// initialize File Manager component
var filemanagerInstance = new ej.filemanager.FileManager({
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
    },
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');

