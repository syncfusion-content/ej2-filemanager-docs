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
    allowMultiSelection:true, // allowMultiSelection is true by default.
    // File Manager's file select event
    fileSelect: onFileSelect
});

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');

// File Manager's file select event function
function onFileSelect(args){
    console.log(args.fileDetails.name + " has been " + args.action + "ed");
}

