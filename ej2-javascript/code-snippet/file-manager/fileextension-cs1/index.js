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
    // Hides the file extension in File Manager
    showFileExtension: false,
    // File Manager's beforeFileLoad event
    fileLoad: onBeforeFileLoad,
    // File Manager's beforeFileOpen event
    fileOpen: onBeforeFileOpen
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');

// File Manager's file beforeFileLoad function
function onBeforeFileLoad(args){
    console.log(args.fileDetails.name + " is loading");
}

// File Manager's file beforeFileOpen function
function onBeforeFileOpen(args){
    console.log(args.fileDetails.name + " is opened");
}

