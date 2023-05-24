

import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize file manager component
let filemanagerInstance: FileManager = new FileManager({
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

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');

// File Manager's file select event function
function onFileSelect(args: any){
    console.log(args.fileDetails.name + " has been " + args.action + "ed");
}



