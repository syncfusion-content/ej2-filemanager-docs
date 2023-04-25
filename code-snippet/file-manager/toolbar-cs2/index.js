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
    //Custom item added along with default item
    toolbarSettings:{items: ['NewFolder', 'Custom', 'Upload', 'Delete', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details']},
    toolbarClick:toolbarClick,
    toolbarCreate: toolbarCreate
});

// event for custom toolbar item
function toolbarClick(args) {
    if (args.item.text === 'Custom') {
        alert('You have clicked custom toolbar item')
    }
}
// Icon added to custom toolbar item
function toolbarCreate(args) {
        for(var i=0;i<args.items.length;i++) {
            if(args.items[i].id === this.element.id +'_tb_custom') {
                args.items[i].prefixIcon= 'e-icons e-fe-tick';
            }
        }
}

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');

